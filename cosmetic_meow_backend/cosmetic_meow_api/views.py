from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .filters import ProductFilter, FeedBackFilter
from .serializers import *
from .models import *
from .permissions import AllCreateAdminAllAnother403


class UserCreateAPIView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            refresh = RefreshToken.for_user(serializer.instance)
            access_token = AccessToken.for_user(serializer.instance)
            res = {
                "refresh": str(refresh),
                "access": str(access_token)
            }
            return Response(
                {
                    'user': serializer.data,
                    'refresh': res['refresh'],
                    'access': res['access']
                }
                , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter


class ProductTagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductTag.objects.all()
    serializer_class = ProductTagSerializer
    permission_classes = [permissions.AllowAny]


class FullProductLineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductLine.objects.all()
    serializer_class = BaseProductLineSerializer
    permission_classes = [permissions.AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BaseProductLineSerializer(instance)
        active_substances_of_products_in_product_line = ProductActiveSubstance.objects.filter(
            product__product_line=instance
        ).distinct().values()

        advantages_of_products_in_product_line = ProductAdvantage.objects.filter(
            product__product_line=instance
        ).distinct().values()

        applications_of_products_in_product_line = Product.objects.filter(
            product_line=instance
        ).distinct().values('application_method')

        return Response({
            'product_line': serializer.data,
            'active_substances': active_substances_of_products_in_product_line,
            'advantages': advantages_of_products_in_product_line,
            'applications': [result['application_method'] for result in applications_of_products_in_product_line]
        })


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def retrieve(self, request, *args, **kwargs):
        # check does user have access to this order
        order = self.get_object()
        if request.user.is_authenticated:
            if request.user.is_admin or order.user == request.user:
                serializer = self.get_serializer(order)
                return Response(serializer.data)
            else:
                return Response({'error': 'You do not have permission to access this order'}, status=403)
        else:
            if order.session_key == request.session.session_key:
                serializer = self.get_serializer(order)
                return Response(serializer.data)
            else:
                return Response({'error': 'You do not have permission to access this order'}, status=403)

    def perform_create(self, serializer):
        if not self.request.session.session_key:
            self.request.session.create()
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save(session_key=self.request.session.session_key)

    def list(self, request, *args, **kwargs):
        if not request.session.session_key:
            request.session.create()
        if request.user.is_authenticated:
            if request.user.is_admin:
                queryset = Order.objects.all()
                serializer = OrderSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                queryset = Order.objects.filter(user=request.user)
                serializer = OrderSerializer(queryset, many=True)
                return Response(serializer.data)
        else:
            queryset = Order.objects.filter(session_key=request.session.session_key, session_key__isnull=False)
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data)


    @action(detail=True, methods=['post'])
    def clear_cart(self, request, pk=None):
        order = self.get_object()
        order.clear_cart()
        return Response({'message': 'Cart cleared successfully'})

    @action(detail=True, methods=['get'])
    def total_price(self, request, pk=None):
        if self.get_object().user != request.user:
            return Response({'error': 'You do not have permission to access this order'}, status=403)
        if self.get_object().session_key != request.session.session_key:
            return Response({'error': 'You do not have permission to access this order'}, status=403)

        order = self.get_object()
        total_price = order.total_price()
        return Response({'total_price': total_price})


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            if request.user.is_admin:
                queryset = OrderItem.objects.all()
                serializer = OrderItemSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                queryset = OrderItem.objects.filter(order__user=request.user)
                serializer = OrderItemSerializer(queryset, many=True)
                return Response(serializer.data)
        else:
            queryset = OrderItem.objects.filter(order__session_key=request.session.session_key)
            serializer = OrderItemSerializer(queryset, many=True)
            return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # check does user have access to this order item
        order_item = self.get_object()
        if request.user.is_authenticated:
            if request.user.is_admin or order_item.order.user == request.user:
                serializer = self.get_serializer(order_item)
                return Response(serializer.data)
            else:
                return Response({'error': 'You do not have permission to access this order item'}, status=403)
        else:
            if order_item.order.session_key == request.session.session_key:
                serializer = self.get_serializer(order_item)
                return Response(serializer.data)
            else:
                return Response({'error': 'You do not have permission to access this order item'}, status=403)



class FeedBackViewSet(viewsets.ModelViewSet):
    queryset = FeedBack.objects.all()
    serializer_class = FeedBackSerializer
    permission_classes = [AllCreateAdminAllAnother403]
    filter_backends = [DjangoFilterBackend]
    filterset_class = FeedBackFilter


class PhoneSendCode(APIView):
    permission_classes = [permissions.AllowAny]
    code = '1234'

    def post(self, request):
        phone = request.data.get('phone_number')
        if phone:
            phone = str(phone)
            if CustomUser.objects.filter(phone_number=phone).exists():
                return Response(
                    {'error': 'Пользователь с таким номером телефона уже существует'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                print(phone, self.code)
                return Response(
                    {'message': 'Код отправлен на номер {}'.format(phone)},
                    status=status.HTTP_200_OK
                )
        else:
            return Response(
                {'error': 'Телефон не указан'},
                status=status.HTTP_400_BAD_REQUEST
            )


class PhoneVerifyCode(APIView):
    permission_classes = [permissions.AllowAny]
    code = '1234'

    def post(self, request):
        phone = request.data.get('phone_number')
        code = request.data.get('code')
        if phone and code:
            if code == self.code:
                return Response(
                    {'message': 'Номер телефона подтвержден'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Неверный код подтверждения'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {'error': 'Телефон или код не указаны'},
                status=status.HTTP_400_BAD_REQUEST
            )

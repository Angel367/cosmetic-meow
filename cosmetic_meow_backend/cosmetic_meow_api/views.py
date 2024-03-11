from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, generics, status
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


class UserUpdateAPIView(generics.UpdateAPIView):
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

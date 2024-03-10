from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .filters import ProductFilter
from .serializers import *


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

        return Response({
            'product_line': serializer.data,
            'active_substances': active_substances_of_products_in_product_line,
            'advantages': advantages_of_products_in_product_line
        })

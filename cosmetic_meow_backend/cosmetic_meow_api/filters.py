from django_filters import rest_framework as filters
from .models import Product


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price__price_value', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price__price_value', lookup_expr='lte')
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')
    tags = filters.CharFilter(field_name='product_tags__id', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['min_price', 'max_price', 'name', 'tags']

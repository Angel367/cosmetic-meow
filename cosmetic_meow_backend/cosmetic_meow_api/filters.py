from django_filters import rest_framework as filters
from .models import Product, ProductTag


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(
        field_name='price__price_value',
        lookup_expr='gte'
    )
    max_price = filters.NumberFilter(
        field_name='price__price_value',
        lookup_expr='lte'
    )
    name = filters.CharFilter(
        field_name='name',
        lookup_expr='icontains'
    )
    all_tags = filters.ModelMultipleChoiceFilter(
        queryset=ProductTag.objects.all(),
        field_name='product_tags',
        conjoined=True
    )
    any_tags = filters.ModelMultipleChoiceFilter(
        queryset=ProductTag.objects.all(),
        field_name='product_tags',
        conjoined=False
    )

    class Meta:
        model = Product
        fields = ['min_price', 'max_price', 'name', 'all_tags', 'any_tags']

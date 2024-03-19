from django_filters import rest_framework as filters
from .models import Product, ProductTag, FeedBack


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
    product_line = filters.NumberFilter(
        field_name='product_line__id',  # Assuming product_line is a ForeignKey
        lookup_expr='exact'
    )
    is_ready_for_sale = filters.BooleanFilter(
        field_name='is_ready_for_sale',
        lookup_expr='exact'
    )

    class Meta:
        model = Product
        fields = ['min_price', 'max_price', 'name', 'all_tags', 'any_tags', 'product_line', 'is_ready_for_sale']


class FeedBackFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name='name',
        lookup_expr='exact'
    )
    email = filters.CharFilter(
        field_name='email',
        lookup_expr='exact'
    )
    type = filters.ChoiceFilter(
        field_name='type',
        choices=FeedBack.TYPE_CHOICES
    )
    is_active = filters.BooleanFilter(
        field_name='is_active',
        lookup_expr='exact'
    )

    class Meta:
        model = FeedBack
        fields = ['name', 'email', 'is_active', 'type']

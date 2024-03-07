from rest_framework import serializers

from .models import *


class BasePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasePrice
        fields = ['price_value']


class DiscountPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountPrice
        fields = ['price_value', 'begin_date', 'end_date']


class ProductClinicalTestingResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductClinicalTestingResult
        fields = ['description']


class ProductAdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAdvantage
        fields = ['name', 'description']


class ProductActiveSubstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductActiveSubstance
        fields = ['name', 'description']


class BaseProductLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductLine
        fields = ['name', 'description']


class ProductSerializer(serializers.ModelSerializer):
    price = BasePriceSerializer()
    discount_price = DiscountPriceSerializer()
    clinical_testing_result = ProductClinicalTestingResultSerializer()
    advantages = ProductAdvantageSerializer(many=True)
    active_substances = ProductActiveSubstanceSerializer(many=True)
    product_line = BaseProductLineSerializer()

    class Meta:
        model = Product
        fields = '__all__'

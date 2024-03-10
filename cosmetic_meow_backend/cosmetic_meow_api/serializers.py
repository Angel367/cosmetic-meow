from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone_number', 'password', 'first_name', 'last_name', 'middle_name']
        extra_kwargs = {'password': {'write_only': True}}


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


class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = ['name', 'description']


class ProductSerializer(serializers.ModelSerializer):
    price = BasePriceSerializer()
    discount_price = DiscountPriceSerializer()
    clinical_testing_result = ProductClinicalTestingResultSerializer()
    advantages = ProductAdvantageSerializer(many=True)
    active_substances = ProductActiveSubstanceSerializer(many=True)
    product_line = BaseProductLineSerializer()
    product_tags = ProductTagSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = ['id', 'name', 'email', 'message', 'type', 'created_at']



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
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        fields = ['phone_number', 'password', 'first_name', 'last_name', 'middle_name', 'email', 'date_of_birth']
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
        fields = ['id', 'name', 'description']


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


class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

    def create(self, validated_data):
        # Получаем заказ для этого элемента
        cart = None
        request = self.context.get('request')

        if request.user.is_authenticated:
            cart = Order.objects.get_or_create(user=request.user, status='cart')[0]
        else:
            cart = Order.objects.get_or_create(session_key=request.session.session_key, status='cart')[0]

        # Проверка наличия продукта с таким id в корзине

        if OrderItem.objects.filter(product=validated_data['product'], order=cart).exists():
            raise serializers.ValidationError('Product is already in cart, adelina use PUT')

        # Добавляем связанный заказ к данным перед сохранением
        validated_data['order'] = cart
        return super().create(validated_data)


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class PickUpPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickUpPoint
        fields = '__all__'


class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = ['id', 'name', 'email', 'message', 'type', 'created_at']



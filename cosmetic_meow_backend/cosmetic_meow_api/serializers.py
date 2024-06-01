from rest_framework import serializers
from rest_framework.generics import get_object_or_404

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
    # def update(self, instance, validated_data):
    #     password = validated_data.pop('password', None)
    #     if password:
    #         instance.set_password(password)
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance

    class Meta:
        model = CustomUser
        fields = ['phone_number',  'first_name', 'last_name', 'middle_name', 'email', 'date_of_birth']
        # extra_kwargs = {'password': {'write_only': True}}


class BasePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasePrice
        fields = ['price_value']


class DiscountPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountPrice
        fields = ['price_value', 'begin_date', 'end_date']


class ProductClinicalTestingResultImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")
    class Meta:
        model = ProductClinicalTestingResultImage
        fields = '__all__'


class ProductClinicalTestingResultSerializer(serializers.ModelSerializer):
    images = ProductClinicalTestingResultImageSerializer(many=True)

    class Meta:
        model = ProductClinicalTestingResult
        fields = '__all__'


class ProductAdvantageImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")

    class Meta:
        model = ProductAdvantageImage
        fields = '__all__'


class ProductAdvantageSerializer(serializers.ModelSerializer):
    images = ProductAdvantageImageSerializer(many=True)

    class Meta:
        model = ProductAdvantage
        fields = '__all__'


class ProductActiveSubstanceImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")

    class Meta:
        model = ProductActiveSubstanceImage
        fields = '__all__'


class ProductActiveSubstanceSerializer(serializers.ModelSerializer):
    images = ProductActiveSubstanceImageSerializer(many=True)
    class Meta:
        model = ProductActiveSubstance
        fields = '__all__'


class ProductLineImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")

    class Meta:
        model = ProductLineImage
        fields = '__all__'


class BaseProductLineSerializer(serializers.ModelSerializer):
    images = ProductLineImageSerializer(many=True)

    class Meta:
        model = ProductLine
        fields = '__all__'


class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = ['id', 'name', 'description']


class ProductMarketPlaceLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMarketPlaceLink
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    price = BasePriceSerializer()
    discount_price = DiscountPriceSerializer()
    clinical_testing_result = ProductClinicalTestingResultSerializer()
    advantages = ProductAdvantageSerializer(many=True)
    active_substances = ProductActiveSubstanceSerializer(many=True)
    product_line = BaseProductLineSerializer()
    product_tags = ProductTagSerializer(many=True)
    market_place_links = ProductMarketPlaceLinkSerializer(many=True)
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductPartnerImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.CharField(source="image.url")

    class Meta:
        model = ProductPartnerImage
        fields = '__all__'


class ProductPartnerSerializer(serializers.ModelSerializer):
    images = ProductPartnerImageSerializer(many=True)
    product_lines = BaseProductLineSerializer(many=True)

    class Meta:
        model = ProductPartner
        fields = '__all__'


class ProductCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCode
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')

        if request.user.is_authenticated:
            if request.session.session_key:
                Order.objects.filter(session_key=request.session.session_key).update(user=request.user)
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

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        order = instance
        if order.status == 'in_progress':
            for order_item in order.order_items.all():
                product = order_item.product
                if Course.objects.filter(product_id=product).exists():
                    CoursePurchase.objects.create(
                        user=order.user,
                        course=Course.objects.filter(product_id=product)[0]
                    )
        return instance

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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class UserCourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourseProgress
        fields = '__all__'

class UserLessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLessonProgress
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class AnswerChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerChoice
        fields = '__all__'

class UserQuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuizResult
        fields = '__all__'

class CoursePurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePurchase
        fields = '__all__'



from django.db import models
from foundation.models import CustomUser


# TODO для работы с покупаткелем и работником скалада


class OrderStatusChoices(models.TextChoices):
    CART = "CA", "Корзина"
    PAYMENT_REQUIRED = "PR", "Ожидает оплаты"  # N минут согласно виду интернет-эквайринга
    PAYMENT_SUCCESSFULLY = "PS", "Успешно оплачен"
    CONFIRMED = "CF", "Подтвержден"
    FINISHED = "FS", "Выполнен"
    CANCELLED = "CL", "Отменён"


class Order(models.Model):
    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_DEFAULT,
        default=None  # CustomUser.objects.get(id=1)
    )
    order_status = models.CharField(
        max_length=2,
        choices=OrderStatusChoices.choices,
        default=OrderStatusChoices.CART,
    )

    class Meta:
        verbose_name = "заказ"
        verbose_name_plural = "заказы"
        ordering = ["-id"]


class Category(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, verbose_name="категория")

    class Meta:
        verbose_name = "категория"
        verbose_name_plural = "категории"
        ordering = ["name"]


class Product(models.Model):
    name = models.CharField(max_length=100)
    short_description = models.TextField(max_length=500)
    long_description = models.TextField(max_length=5000)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Без НДС
    discountPrice = models.DecimalField(blank=False, max_digits=10, decimal_places=2, default=price)
    is_active = models.BooleanField(default=True)
    is_course = models.BooleanField(blank=True, default=False)
    # is active for sale
    categories = models.ManyToManyField(Category, blank=True)
    amount = models.IntegerField(default=1)

    def get_images(self):
        return ProductImage.objects.filter(product=self)

    def save(self, *args, **kwargs):
        if self.pk and self.price != Product.objects.get(pk=self.pk).price:
            PriceChange.objects.create(
                product=self,
                new_price=self.price
            )
        if not self.pk:
            self.discountPrice = self.price
            super(Product, self).save(*args, **kwargs)
            PriceChange.objects.create(
                product=self,
                new_price=self.price
            )
        if self.pk is not None and self.discountPrice == Product.objects.get(pk=self.pk).price:
            super(Product, self).save(*args, **kwargs)
            self.discountPrice = self.price
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "продукт"
        verbose_name_plural = "продукты"
        ordering = ["name"]


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='shop/product_images/', blank=True, null=True)

    # TODO дефолтная картинка

    def __str__(self):
        return self.product.name + " Image"

    class Meta:
        verbose_name = "изображение продукта"
        verbose_name_plural = "изображения продуктов"
        ordering = ["product__name"]


class PriceChange(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date_time_change = models.DateTimeField(auto_now_add=True)
    new_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "изменение цены"
        verbose_name_plural = "изменения цен"
        ordering = ["-date_time_change"]


class OrderedProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.discountPrice
        super(OrderedProduct, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "заказанный продукт"
        verbose_name_plural = "заказанные продукты"
        ordering = ["order"]


class Feedback(models.Model):
    text = models.TextField()
    sender = models.EmailField()
    is_active = models.BooleanField(default=False)

    class Meta:
        verbose_name = "отзыв"
        verbose_name_plural = "отзывы"
        ordering = ["-id"]


class Shipment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    track_number = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        verbose_name = "доставка"
        verbose_name_plural = "доставки"
        ordering = ["-id"]
    # TODO: Дописать

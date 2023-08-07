from django.db import models

from foundation.models import CustomUser


# Create your models here.


class Order(models.Model):
    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_DEFAULT,
        default=None  # CustomUser.objects.get(id=1)
    )


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField
    price = models.DecimalField(max_digits=10, decimal_places=2)    # Без НДС
    discountPrice = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, null=True, default=None)
    # TODO protect? Или другой вариант..? По задумке у продукта есть is_active и они никогда не удаляются
    is_active = models.BooleanField(default=True)
    #is active for sale

    def get_images(self):
        return ProductImage.objects.filter(product=self)

    def save(self, *args, **kwargs):    # TODO Автозаполнение поля discountPrice.. Надо ли оно нам в таком виде?
        if not self.discountPrice:
            self.discountPrice = self.price
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='shop/product_images/')

    def __str__(self):
        return self.product.name + " Image"


class PriceChange(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date_time_change = models.DateTimeField()
    new_price = models.DecimalField(max_digits=10, decimal_places=2)


class OrderedProduct(models.Model):
    order = models.ForeignKey(Product, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=product.discountPrice)


class Feedback(models.Model):
    text = models.TextField()
    sender = models.EmailField()


class Shipment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    track_number = models.CharField(max_length=20, blank=True, null=True)
    # TODO: Дописать


class Cart(models.Model):
    pass

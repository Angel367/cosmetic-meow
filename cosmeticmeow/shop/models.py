from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_images(self):
        return ProductImage.objects.filter(product=self)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='shop/product_images/')

    def __str__(self):
        return self.product.name + " Image"

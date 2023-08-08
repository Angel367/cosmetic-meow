from django.test import TestCase

from shop.models import Product, PriceChange


class ProductTestCase(TestCase):
    def setUp(self):
        product = Product(name="Палетка", price=123.12)
        product.save()

    def test_products_discount_price_creation(self):
        self.assertEquals(float(Product.objects.get(id=1).discountPrice), 123.12)

    def test_products_price_change_equal(self):
        product = Product.objects.get(id=1)
        product.price = 321.21
        product.save()
        self.assertEquals(float(product.discountPrice), 321.21)

    def test_products_discount_price_change_not_equal(self):
        product = Product.objects.get(id=1)
        product.discountPrice = 100.00
        product.save()
        self.assertNotEquals(product.discountPrice, product.price)

    def test_products_price_change_not_equal(self):
        product = Product.objects.get(id=1)
        product.discountPrice = 50
        product.save()
        product.price = 400
        product.save()
        self.assertEquals(float(product.discountPrice), 50.00)

    def test_price_change_creation(self):
        product = Product.objects.get(id=1)
        self.assertEquals(PriceChange.objects.filter(product=product)[0].new_price, product.price)
        product.price = 500
        product.save()
        self.assertEquals(PriceChange.objects.filter(product=product)[0].new_price, product.price)
        # Почему во втором случае тоже индекс 0? Да потому что ordering = ["-date_time_change"]

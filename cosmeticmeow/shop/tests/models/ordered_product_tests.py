from django.test import TestCase
from shop.models import OrderedProduct, Order, Product
from foundation.models import CustomUser


class OrderedProductTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create()  # some user for test
        self.product = Product(name="Test Product", price=10.0, discountPrice=9.0)
        self.product.save()
        self.order = Order.objects.create(customer_id=1, order_status="CA")
        self.price = 9.0

    def test_ordered_product_creation(self):
        ordered_product = OrderedProduct.objects.create(order=self.order, product=self.product, price=self.price)
        self.assertEqual(ordered_product.order, self.order)
        self.assertEqual(ordered_product.product, self.product)
        self.assertEqual(ordered_product.price, self.price)

    def test_auto_price_assignment(self):
        ordered_product = OrderedProduct.objects.create(order=self.order, product=self.product)
        self.assertEqual(ordered_product.price, self.product.discountPrice)

    def test_verbose_names(self):
        self.assertEqual(OrderedProduct._meta.verbose_name, "заказанный продукт")
        self.assertEqual(OrderedProduct._meta.verbose_name_plural, "заказанные продукты")

    def test_ordering(self):
        ordered_product1 = OrderedProduct.objects.create(order=self.order, product=self.product, price=self.price)
        ordered_product2 = OrderedProduct.objects.create(order=self.order, product=self.product, price=self.price)
        self.assertLess(ordered_product1.pk, ordered_product2.pk)
        # ordered_product1 should be created before ordered_product2

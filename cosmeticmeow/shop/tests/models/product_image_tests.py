from django.test import TestCase
from shop.models import Product, ProductImage


class ProductImageTestCase(TestCase):
    def setUp(self):
        self.product = Product(name="Test Product", price=100.12)
        self.product.save()
        self.image_path = "path/to/test/image.jpg"
        self.another_image_path = "path/to/another/image.jpg"

    def test_product_image_creation(self):
        image = ProductImage.objects.create(product=self.product, image=self.image_path)
        self.assertEqual(image.product, self.product)
        self.assertEqual(image.image, self.image_path)

    def test_product_image_str(self):
        image = ProductImage.objects.create(product=self.product, image=self.image_path)
        expected_str = f"{self.product.name} Image"
        self.assertEqual(str(image), expected_str)

    def test_verbose_names(self):
        self.assertEqual(ProductImage._meta.verbose_name, "изображение продукта")
        self.assertEqual(ProductImage._meta.verbose_name_plural, "изображения продуктов")

    def test_ordering(self):
        image1 = ProductImage.objects.create(product=self.product, image=self.image_path)
        image2 = ProductImage.objects.create(product=self.product, image=self.another_image_path)
        self.assertLess(image1.pk, image2.pk)  # image1 should be created before image2

    def test_cascade_deletion(self):
        image = ProductImage.objects.create(product=self.product, image=self.image_path)
        self.product.delete()
        with self.assertRaises(ProductImage.DoesNotExist):
            ProductImage.objects.get(id=image.id)

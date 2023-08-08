from django.test import TestCase
from shop.models import Shipment, Order
from foundation.models import CustomUser


class ShipmentTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create()     # some user for test
        self.order = Order.objects.create(customer_id=1, order_status="CA")
        self.track_number = "1234567890"

    def test_shipment_creation(self):
        shipment = Shipment.objects.create(order=self.order, track_number=self.track_number)
        self.assertEqual(shipment.order, self.order)
        self.assertEqual(shipment.track_number, self.track_number)

    def test_verbose_names(self):
        self.assertEqual(Shipment._meta.verbose_name, "доставка")
        self.assertEqual(Shipment._meta.verbose_name_plural, "доставки")

    def test_ordering(self):
        shipment1 = Shipment.objects.create(order=self.order, track_number="track1")
        shipment2 = Shipment.objects.create(order=self.order, track_number="track2")
        self.assertGreater(shipment2.pk, shipment1.pk)  # shipment2 should be created after shipment1

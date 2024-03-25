from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import PickUpPoint
from .serializers import PickUpPointSerializer


class PickUpPointAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.pickup_point1 = PickUpPoint.objects.create(name='Point 1', address='Address 1')
        self.pickup_point2 = PickUpPoint.objects.create(name='Point 2', address='Address 2')

    def test_list_pickup_points(self):
        response = self.client.get('/api/pickup_point/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pickup_points = PickUpPoint.objects.all()
        serializer = PickUpPointSerializer(pickup_points, many=True)
        self.assertEqual(response.data['results'], serializer.data)

    def test_retrieve_pickup_point(self):
        response = self.client.get(f'/api/pickup_point/{self.pickup_point1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pickup_point = PickUpPoint.objects.get(id=self.pickup_point1.id)
        serializer = PickUpPointSerializer(pickup_point)
        self.assertEqual(response.data, serializer.data)



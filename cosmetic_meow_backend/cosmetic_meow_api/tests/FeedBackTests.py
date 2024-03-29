# from django.test import TestCase
# from rest_framework.test import APIClient
# from rest_framework import status
# from cosmetic_meow_api.models import FeedBack
# from cosmetic_meow_api.serializers import FeedBackSerializer
#
#
# class FeedBackAPITestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient
#         self.feedback1 = FeedBack.objects.create(
#             name='Name 1',
#             email='test1email@example.org',
#             message='Message 1',
#             type='other',
#             is_active=False
#         )
#         self.feedback2 = FeedBack.objects.create(
#             name='Name 2',
#             email='test2email@example.org',
#             message='Message 2',
#             type='support',
#             is_active=True
#         )
#
#     def test_list_pickup_points(self):
#         response = self.client.get('/api/pickup_point/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         pickup_points = PickUpPoint.objects.all()
#         serializer = PickUpPointSerializer(pickup_points, many=True)
#         self.assertEqual(response.data['results'], serializer.data)
#
#     def test_retrieve_pickup_point(self):
#         response = self.client.get(f'/api/pickup_point/{self.pickup_point1.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         pickup_point = PickUpPoint.objects.get(id=self.pickup_point1.id)
#         serializer = PickUpPointSerializer(pickup_point)
#         self.assertEqual(response.data, serializer.data)
#
#     def test_create_pickup_point(self):
#         initial_count = PickUpPoint.objects.count()
#         data = {'name': 'New Point', 'address': 'New Address'}
#         response = self.client.post('/api/pickup_point/', data)
#         self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
#         self.assertEqual(PickUpPoint.objects.count(), initial_count)
#
#     def test_update_pickup_point(self):
#         data = {'name': 'Updated Point', 'address': 'Updated Address'}
#         response = self.client.put(f'/api/pickup_point/{self.pickup_point1.id}/', data)
#         self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
#         self.assertNotEquals(data['name'], self.pickup_point1.name)
#
#     def test_delete_pickup_point(self):
#         initial_count = PickUpPoint.objects.count()
#         response = self.client.delete(f'/api/pickup_point/{self.pickup_point1.id}/')
#         self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
#         self.assertEqual(PickUpPoint.objects.count(), initial_count)
#
#

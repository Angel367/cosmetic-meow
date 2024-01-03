from django.test import TestCase
from shop.models import Review


class ReviewTestCase(TestCase):
    def test_review_creation(self):
        review = Review.objects.create(text="Test review", sender="test@example.com", is_active=True)
        self.assertEqual(review.text, "Test review")
        self.assertEqual(review.sender, "test@example.com")
        self.assertTrue(review.is_active)

    def test_verbose_names(self):
        self.assertEqual(Review._meta.verbose_name, "отзыв")
        self.assertEqual(Review._meta.verbose_name_plural, "отзывы")

    def test_ordering(self):
        review1 = Review.objects.create(text="Review 1", sender="sender1@example.com", is_active=True)
        review2 = Review.objects.create(text="Review 2", sender="sender2@example.com", is_active=True)
        self.assertGreater(review2.pk, review1.pk)  # review2 should be created after review1

    def test_inactive_review_not_in_queryset(self):
        review_active = Review.objects.create(text="Active review", sender="active@example.com", is_active=True)
        review_inactive = Review.objects.create(text="Inactive review", sender="inactive@example.com",
                                                  is_active=False)
        queryset = Review.objects.filter(is_active=True)
        self.assertIn(review_active, queryset)
        self.assertNotIn(review_inactive, queryset)

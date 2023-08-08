from django.test import TestCase
from shop.models import Feedback


class FeedbackTestCase(TestCase):
    def test_feedback_creation(self):
        feedback = Feedback.objects.create(text="Test feedback", sender="test@example.com", is_active=True)
        self.assertEqual(feedback.text, "Test feedback")
        self.assertEqual(feedback.sender, "test@example.com")
        self.assertTrue(feedback.is_active)

    def test_verbose_names(self):
        self.assertEqual(Feedback._meta.verbose_name, "отзыв")
        self.assertEqual(Feedback._meta.verbose_name_plural, "отзывы")

    def test_ordering(self):
        feedback1 = Feedback.objects.create(text="Feedback 1", sender="sender1@example.com", is_active=True)
        feedback2 = Feedback.objects.create(text="Feedback 2", sender="sender2@example.com", is_active=True)
        self.assertGreater(feedback2.pk, feedback1.pk)  # feedback2 should be created after feedback1

    def test_inactive_feedback_not_in_queryset(self):
        feedback_active = Feedback.objects.create(text="Active feedback", sender="active@example.com", is_active=True)
        feedback_inactive = Feedback.objects.create(text="Inactive feedback", sender="inactive@example.com",
                                                    is_active=False)
        queryset = Feedback.objects.filter(is_active=True)
        self.assertIn(feedback_active, queryset)
        self.assertNotIn(feedback_inactive, queryset)

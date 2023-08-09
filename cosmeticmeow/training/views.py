from django.contrib.auth.mixins import UserPassesTestMixin
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

from .models import Course
from .permissions import has_course_access


class CourseInfoView(UserPassesTestMixin, TemplateView):
    # https://docs.djangoproject.com/en/4.2/topics/auth/default/ про mixin
    # https://docs.djangoproject.com/en/4.2/topics/class-based-views/   # про этот ваш классы а не функции
    # https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-display/  # тоже
    # https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-editing/  # тоже

    def test_func(self):
        return has_course_access(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["course"] = get_object_or_404(Course, id=self.kwargs['course_id'])
        return context

    template_name = 'course_info.html'

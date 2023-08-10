from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import DetailView, ListView, CreateView, UpdateView, DeleteView
from .models import *
from .permissions import *


class PermCourseTeacher(View, UserPassesTestMixin, LoginRequiredMixin):
    def test_func(self):
        return has_course_access_teacher(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))


class PermCourseStudent(View, UserPassesTestMixin, LoginRequiredMixin):
    def test_func(self):
        return has_course_access_student(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))

    def handle_no_permission(self):
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        return redirect('/courses/' + self.kwargs['course_id'] + '/')


# TODO если нет премишена кинуть на стр с покупкой этого курса

# https://docs.djangoproject.com/en/4.2/topics/auth/default/ про mixin
# https://docs.djangoproject.com/en/4.2/topics/class-based-views/   # про этот ваш классы а не функции
# https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-display/  # тоже
# https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-editing/  # тоже
class CourseListView(ListView):
    model = Course
    paginate_by = 9
    template_name = 'courses.html'


class ModuleListView(ListView, PermCourseStudent):
    model = Module
    paginate_by = 9
    template_name = 'course_info.html'

    def get_queryset(self):
        return Module.objects.filter(course=
                                     Course.objects.
                                     filter(student__in=self.request.user))


class LessonListView(ListView, PermCourseStudent):
    model = Lesson
    paginate_by = 9
    template_name = 'course_info.html'

    def get_queryset(self):
        return Module.objects.filter(course=
                                     Course.objects.
                                     filter(student__in=self.request.user))


class MyCourseListView(ListView, PermCourseStudent):
    model = Course
    paginate_by = 9
    template_name = 'courses.html'

    def get_queryset(self):
        return Course.objects.filter(student__in=self.request.user)


class CourseInfoView(DetailView):
    model = Course
    template_name = 'course_info.html'
    pk_url_kwarg = 'course_id'

class MyCourseInfoView(PermCourseStudent, DetailView):
    model = Course
    template_name = 'my_course.html'
    pk_url_kwarg = 'course_id'


class ModuleInfoView(DetailView):
    model = Module
    template_name = 'course_info.html'
    pk_url_kwarg = 'module_id'


class MyModuleInfoView(PermCourseStudent, DetailView):
    model = Module
    template_name = 'my_course.html'
    pk_url_kwarg = 'module_id'


class LessonInfoView(DetailView):
    model = Lesson
    template_name = 'course_info.html'
    pk_url_kwarg = 'lesson_id'


class MyLessonInfoView(PermCourseStudent, DetailView):
    model = Lesson
    template_name = 'my_course.html'
    pk_url_kwarg = 'lesson_id'


class UpdateCourse(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Course
    fields = [
        'name',
        'short_description',
        'long_description',
        'price',
        'discountPrice',
        'categories',
        'amount'
    ]
    
    def get_success_url(self):
        return reverse('course_info', args=self.object.id)


class CreateCourse(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Course
    fields = [
        'name',
        'short_description',
        'long_description',
        'price',
        'discountPrice',
        'categories',
        'amount'
    ]

    def get_success_url(self):
        return reverse('course_info', args=(self.object.id, ))

class UpdateModule(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Module

    def get_success_url(self):
        return reverse('module_info', args=self.object.id)


class CreateModule(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Module
    # form_class = {
    #
    # }
    def get_success_url(self):
        return reverse('module_info', args=self.object.id)


class UpdateLesson(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Lesson

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.id)


class CreateLesson(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Lesson
    
    def get_success_url(self):
        return reverse('lesson_info', args=self.object.id)


class UpdateTest(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Test

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.lesson.id)


class CreateTest(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Test

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.lesson.id)


class UpdateQuestion(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Question

    def get_success_url(self):
        return reverse('lesson_info',
                       args=self.object.test.lesson.id)


class CreateQuestion(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Question

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.test.lesson.id)


class UpdateAnswer(UpdateView, PermCourseStudent):
    template_name = 'form.html'
    model = Answer

    def get_success_url(self):
        return reverse('lesson_info',
                       args=self.object.question.test.lesson.id)


class CreateAnswer(CreateView, PermCourseStudent):
    template_name = 'form.html'
    model = Answer

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.question.test.lesson.id)

class DeleteFile(DeleteView, PermCourseStudent):
    template_name = 'form.html'
    model = ContentFile

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.lesson.id)


class CreateFile(CreateView, PermCourseStudent):
    template_name = 'form.html'
    model = ContentFile

    def get_success_url(self):
        return reverse('lesson_info', args=self.object.lesson.id)

# class CourseInfoView(UserPassesTestMixin, DetailView):
#
#     def test_func(self):
#         return has_course_access(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["course"] = get_object_or_404(Course, id=self.kwargs['course_id'])
#         return context
#
#     template_name = 'course_info.html'

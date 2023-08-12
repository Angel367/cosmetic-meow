from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views import View
from django.views.generic import DetailView, ListView, CreateView, UpdateView

from .forms import *
from .models import *
from .permissions import *


class PermCourseTeacher(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_course_access_teacher(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))


class PermCourseStudent(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_course_access_student(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))

    def handle_no_permission(self):
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        return redirect('/courses/' + str(self.kwargs['course_id']) + '/')


#

# https://docs.djangoproject.com/en/4.2/topics/auth/default/ про mixin
# https://docs.djangoproject.com/en/4.2/topics/class-based-views/   # про этот ваш классы а не функции
# https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-display/  # тоже
# https://docs.djangoproject.com/en/4.2/ref/class-based-views/generic-editing/  # тоже
class CourseListView(ListView):
    model = Course
    paginate_by = 9
    template_name = 'courses.html'


class ModuleListView(PermCourseStudent, ListView):
    model = Module
    paginate_by = 9
    template_name = 'course_info.html'

    def get_queryset(self):
        return Module.objects.filter(course=self.kwargs['course_id'])

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['course'] = Course.objects.get(id=self.kwargs['course_id'])
        return cntxt


class LessonListView(ListView, PermCourseStudent):
    model = Lesson
    paginate_by = 9
    template_name = 'module_info.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['module'] = Module.objects.get(id=self.kwargs['module_id'])
        return cntxt

    def get_queryset(self):
        print(Lesson.objects.filter(module=self.kwargs['module_id']))
        return Lesson.objects.filter(module=self.kwargs['module_id'])


class MyCourseListView(LoginRequiredMixin, ListView):
    model = CourseStudent
    paginate_by = 9
    template_name = 'courses.html'

    def get_queryset(self):
        courses = CourseStudent.objects.filter(student=self.request.user)
        return courses


class CourseInfoView(DetailView):
    model = Course
    template_name = 'course_product.html'
    pk_url_kwarg = 'course_id'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        if self.request.user.is_authenticated and has_course_access_student(self.request.user, self.get_object()):
                cntxt['is_bought'] = True
        return cntxt


# class MyCourseInfoView(PermCourseStudent, DetailView):
#     model = Course
#     template_name = 'course_product.html'
#     pk_url_kwarg = 'course_id'


#
#
# class MyModuleInfoView(DetailView, PermCourseStudent):
#     model = Module
#     template_name = 'course_info.html'
#     pk_url_kwarg = 'module_id'


class MyLessonInfoView(PermCourseStudent, DetailView):
    model = Lesson
    template_name = 'lesson_info.html'
    pk_url_kwarg = 'lesson_id'

    def post(self, request, *args, **kwargs):
        if 'is_finished' in request.POST:
            s_l_mark = StudentLesson.objects.get(lesson=self.get_object(), student=request.user)
            s_m_mark = StudentModule.objects.get(module=self.get_object().module, student=request.user)
            s_c_mark = CourseStudent.objects.get(course=self.get_object().module.course, student=request.user)

            if s_l_mark.set_finished():
                id = s_l_mark.get_next_lesson_id()
                if id:
                    return redirect(reverse('lesson_info',
                                            args=(self.get_object().module.course.id,
                                                  self.get_object().module.id,
                                                  id)))
                elif s_m_mark.set_finished():
                    id = s_m_mark.get_next_module_id()
                    if id:
                        return redirect(reverse('lessons_all',
                                                args=(self.get_object().module.course.id,
                                                      id)))
                    else:
                        if s_c_mark.set_finished():
                            return redirect(reverse('modules_all',
                                                    args=(self.get_object().module.course.id,
                                                          )))
        return render(request, self.template_name, self.get_context_data())


class LessonInfoViewWithCreate(PermCourseTeacher, DetailView):
    model = Lesson
    template_name = 'form.html'
    pk_url_kwarg = 'lesson_id'

    # def get(self, request, *args, **kwargs):
    #     return render(request, self.template_name, self.get_context_data())
    #
    # # def get_context_data(self, **kwargs):
    # #     if 'test_form' not in kwargs:
    # #         kwargs['test_create_form'] = TestFormCreate
    # #     if 'test_update_form' not in kwargs:
    # #         kwargs['test_update_form'] = TestFormCreate
    # #     # if 'file_form' not in kwargs:
    # #     #     kwargs['file_create_form'] = ContentFileForm
    # #     # if 'question_form' not in kwargs:
    # #     #     kwargs['question_create_form'] = QuestionForm
    # #     return kwargs
    #
    # def post(self, request, *args, **kwargs):
    #     ctxt = {}
    #     if 'test_create' in request.POST:
    #         test_form = TestFormCreate(request.POST)
    #         if test_form.is_valid():
    #             Test(duration=test_form.cleaned_data['duration'],
    #                  lesson_id=kwargs['lesson_id']).save()
    #         else:
    #             ctxt['test_create_form'] = test_form
    #
    #     elif 'test_update' in request.POST:
    #         test_form = TestFormCreate(request.POST)
    #         if test_form.is_valid():
    #             a = get_object_or_404(Test, id=kwargs['test_id'])
    #             a.lesson_id = kwargs['lesson_id']
    #             f = TestFormCreate(request.POST, instance=a)
    #             f.save()
    #         else:
    #             ctxt['test_update_form'] = test_form

    # if 'file' in request.POST:
    #     file_form = ContentFileForm(request.POST)
    # if 'question' in request.POST:
    #     question_form = QuestionForm(request.POST)

    # return render(request, self.template_name, self.get_context_data(**ctxt))


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

    def form_valid(self, form):
        super().form_valid(form)
        new_course = Course.objects.get(id=self.object.id)
        new_course.teacher = self.request.user
        new_course.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('course_info', args=(self.object.id,))


class UpdateModule(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Module
    fields = ['name', 'description']

    def get_object(self, queryset=None):
        return get_object_or_404(Module,
                                 id=self.kwargs.get('module_id'))

    def form_valid(self, form):
        self.object.name = form.cleaned_data['name']
        self.object.description = form.cleaned_data['description']
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('module_info',
                       args=(self.object.course.id, self.object.id,))


class CreateModule(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Module
    fields = ['name', 'description']

    def form_valid(self, form):
        self.object = Module(course=get_object_or_404(Course,
                                                      id=self.kwargs.get('course_id')),
                             name=form.cleaned_data['name'],
                             description=form.cleaned_data['description'])
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('module_info',
                       args=(self.object.course.id, self.object.id,))


class UpdateLesson(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Lesson
    fields = ['name', 'description']

    def get_object(self, queryset=None):
        return get_object_or_404(Lesson,
                                 id=self.kwargs.get('lesson_id'))

    def form_valid(self, form):
        self.object.name = form.cleaned_data['name']
        self.object.description = form.cleaned_data['description']
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('lesson_info',
                       args=(self.object.module.course.id,
                             self.object.module.id,
                             self.object.id))


class CreateLesson(CreateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Lesson
    fields = ['name', 'description']

    def form_valid(self, form):
        self.object = Lesson(module=get_object_or_404(Module,
                                                      id=self.kwargs.get('module_id')),
                             name=form.cleaned_data['name'],
                             description=form.cleaned_data['description'])
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('lesson_info',
                       args=(self.object.module.course.id,
                             self.object.module.id,
                             self.object.id))
#
# class UpdateTest(UpdateView, PermCourseTeacher):
#     template_name = 'form.html'
#     model = Test
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.lesson.id)
#
#
# class CreateTest(CreateView, PermCourseTeacher):
#     template_name = 'form.html'
#     model = Test
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.lesson.id)
#
#
# class UpdateQuestion(UpdateView, PermCourseTeacher):
#     template_name = 'form.html'
#     model = Question
#
#     def get_success_url(self):
#         return reverse('lesson_info',
#                        args=self.object.test.lesson.id)
#
#
# class CreateQuestion(CreateView, PermCourseTeacher):
#     template_name = 'form.html'
#     model = Question
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.test.lesson.id)
#
#
# class UpdateAnswer(UpdateView, PermCourseStudent):
#     template_name = 'form.html'
#     model = Answer
#
#     def get_success_url(self):
#         return reverse('lesson_info',
#                        args=self.object.question.test.lesson.id)
#
#
# class CreateAnswer(CreateView, PermCourseStudent):
#     template_name = 'form.html'
#     model = Answer
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.question.test.lesson.id)
#
# class DeleteFile(DeleteView, PermCourseStudent):
#     template_name = 'form.html'
#     model = ContentFile
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.lesson.id)
#
#
# class CreateFile(CreateView, PermCourseStudent):
#     template_name = 'form.html'
#     model = ContentFile
#
#     def get_success_url(self):
#         return reverse('lesson_info', args=self.object.lesson.id)

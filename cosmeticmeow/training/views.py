from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views import View
from django.views.generic import DetailView, ListView, CreateView, UpdateView, DeleteView
from .models import *
from .permissions import *
from .forms import *


class PermCourseTeacher(View, UserPassesTestMixin):
    def test_func(self):
        return has_course_access_teacher(self.request.user, get_object_or_404(Course, id=self.kwargs['course_id']))


class PermCourseStudent(View, UserPassesTestMixin):
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
    template_name = 'courses.html'

    def get_queryset(self):
        return Module.objects.filter(course=self.kwargs['course_id'])


class LessonListView(ListView, PermCourseStudent):
    model = Lesson
    paginate_by = 9
    template_name = 'courses.html'

    def get_queryset(self):
        return Lesson.objects.filter(module=self.kwargs['course_id'])


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


class MyModuleInfoView(DetailView, PermCourseStudent):
    model = Module
    template_name = 'my_course.html'
    pk_url_kwarg = 'module_id'


class MyLessonInfoView(PermCourseStudent, DetailView):
    model = Lesson
    template_name = 'my_course.html'
    pk_url_kwarg = 'lesson_id'

    def post(self, request, *args, **kwargs):
        if 'is_finished' in request.POST:
            s_l_mark = StudentLesson.objects.get(lesson=self.object, student=request.user)
            s_l_mark.is_finished = True
            if (Module.objects.filter(id=self.object.module.id)
                    .count() > self.object.id_in_module):
                id = Lesson.objects.get(id_in_module=self.object.id_in_module+1).id
                return redirect(reverse('lesson_info',
                                        args=(self.object.module.course.id,
                                              self.object.module.id,
                                              id)) )
            elif (Course.objects.filter(id=self.object.module.course.id)
                    .count() > self.object.module.id_in_course):
                s_m_mark = StudentModule.objects.get(module=self.object.module, student=request.user)
                s_m_mark.is_finished = True
                id = Module.objects.get(id_in_course=self.object.module.id_in_course+1).id
                return redirect(reverse('module_info',
                                        args=(self.object.module.course.id,
                                              id)) )
            else:
                s_m_mark = StudentModule.objects.get(module=self.object.module, student=request.user)
                s_m_mark.is_finished = True
                s_c_mark = CourseStudent.objects.get(course=self.object.module.course, student=request.user)
                s_c_mark.is_finished = True
                return redirect(reverse('course_info',
                                        args=(self.object.module.course.id,
                                              )))
        return render(request, self.template_name, self.get_context_data())




class LessonInfoViewWithCreate(PermCourseTeacher, DetailView):
    model = Lesson
    template_name = 'form.html'
    pk_url_kwarg = 'lesson_id'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, self.get_context_data())

    def get_context_data(self, **kwargs):
        if 'test_form' not in kwargs:
            kwargs['test_create_form'] = TestFormCreate
        if 'test_update_form' not in kwargs:
            kwargs['test_update_form'] = TestFormCreate
        # if 'file_form' not in kwargs:
        #     kwargs['file_create_form'] = ContentFileForm
        # if 'question_form' not in kwargs:
        #     kwargs['question_create_form'] = QuestionForm
        return kwargs

    def post(self, request, *args, **kwargs):
        ctxt = {}
        if 'test_create' in request.POST:
            test_form = TestFormCreate(request.POST)
            if test_form.is_valid():
                Test(duration=test_form.cleaned_data['duration'],
                     lesson_id=kwargs['lesson_id']).save()
            else:
                ctxt['test_create_form'] = test_form

        elif 'test_update' in request.POST:
            test_form = TestFormCreate(request.POST)
            if test_form.is_valid():
                a = get_object_or_404(Test, id=kwargs['test_id'])
                a.lesson_id = kwargs['lesson_id']
                f = TestFormCreate(request.POST, instance=a)
                f.save()
            else:
                ctxt['test_update_form'] = test_form

        # if 'file' in request.POST:
        #     file_form = ContentFileForm(request.POST)
        # if 'question' in request.POST:
        #     question_form = QuestionForm(request.POST)

        return render(request, self.template_name, self.get_context_data(**ctxt))


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
        return reverse('course_info', args=(self.object.id,))


class UpdateModule(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Module
    fields = ['name', 'description']

    def get_object(self, queryset=None):
        return get_object_or_404(Module,
            id=self.kwargs.get('module_id'))

    def form_valid(self, form):
        self.object.name=form.cleaned_data['name']
        self.object.description=form.cleaned_data['description']
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
                       args=(self.object.course.id,self.object.id,))


class UpdateLesson(UpdateView, PermCourseTeacher):
    template_name = 'form.html'
    model = Lesson
    fields = ['name', 'description']

    def get_object(self, queryset=None):
        return get_object_or_404(Lesson,
            id=self.kwargs.get('lesson_id'))

    def form_valid(self, form):
        self.object.name=form.cleaned_data['name']
        self.object.description=form.cleaned_data['description']
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

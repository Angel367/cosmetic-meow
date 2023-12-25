from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.generic import DetailView, ListView, CreateView, UpdateView, DeleteView
from .forms import *
from .models import *
from .permissions import *


class CourseListView(ListView):
    model = Course
    paginate_by = 9
    template_name = 'courses.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        is_bought = {}
        for course in list(self.get_queryset()):
            if not self.request.user.is_authenticated:
                is_bought[course.id] = False
            else:
                is_bought[course.id] = CourseStudent.objects.filter(course=course, student=self.request.user).exists()
        for course in list(self.get_queryset()):
            if not self.request.user.is_authenticated:
                is_bought[course.id] = False
            else:
                is_bought[course.id] = CourseStudent.objects.filter(course=course, student=self.request.user).exists()
        cntxt['is_bought'] = is_bought
        return cntxt

    def get_queryset(self):
        return Course.objects.filter(is_active=True)


class ModuleListView(PermCourseStudent, ListView):
    model = Module
    paginate_by = 9
    template_name = 'course_info.html'

    def get_queryset(self):
        return Module.objects.filter(course=self.kwargs['course_id'])

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['course'] = Course.objects.get(id=self.kwargs['course_id'])

        course_student = CourseStudent.objects.get(student=self.request.user, course=self.kwargs['course_id'])
        # print(course_student.is_finished and Certificate.objects.filter(course_student=course_student).exists())
        cntxt['course_student']=course_student
        if course_student.is_finished and Certificate.objects.filter(course_student=course_student).exists():
            cntxt['certificate'] = Certificate.objects.get(course_student=course_student).get_absolute_file_upload_url()
        return cntxt


class LessonListView(ListView, PermModuleStudent):
    model = Lesson
    paginate_by = 9
    template_name = 'module_info.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['module'] = Module.objects.get(id=self.kwargs['module_id'])
        return cntxt

    def get_queryset(self):
        # print(Lesson.objects.filter(module=self.kwargs['module_id']))
        return Lesson.objects.filter(module=self.kwargs['module_id'])


class MyCourseListView(LoginRequiredMixin, ListView):
    model = CourseStudent
    paginate_by = 9
    template_name = 'courses.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        if self.request.user.is_authenticated:
            is_bought_id = {}
            for course in list(self.get_queryset()):
                is_bought_id[course.course.id] = CourseStudent.objects.filter(course=course.course.id,
                                                                              student=self.request.user).exists()
            cntxt['is_bought'] = is_bought_id
            cntxt['are_bought'] = True
        return cntxt

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


class MyLessonInfoView(PermLessonStudent, DetailView):
    model = Lesson
    template_name = 'lesson_info.html'
    pk_url_kwarg = 'lesson_id'

    def get_context_data(self, **kwargs):
        k = super().get_context_data()
        if Test.objects.filter(lesson=self.get_object(), is_active=True).exists():
            k['test'] = Test.objects.get(lesson=self.get_object(), is_active=True)
        if ContentFile.objects.filter(lesson=self.get_object()).count() > 0:
            files = list(ContentFile.objects.filter(lesson=self.get_object()))
            for file in files:
                file = file.get_absolute_file_upload_url()
            k['files'] = files
        k['student_test'] = StudentTest.objects.filter(student=self.request.user,
                                                           test=Test.objects.filter(lesson=self.get_object(), is_active=True).first()).first()
        # print(k['student_test'] )
        return k

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        if 'start_test' in request.POST:
            test = Test.objects.get(lesson=self.get_object(), is_active=True)
            t = StudentTest.objects.get_or_create(student=self.request.user, test=test)
            print(t)
            # if t[1]:
            #     return render(request, self.template_name, self.get_context_data())
            t[0].test_time_start()
            qs = Question.objects.filter(test=test).first()
            return redirect(reverse('question',
                                    args=(self.get_object().module.course.id,
                                          self.get_object().module.id,
                                          self.get_object().id,
                                          qs.test.id,
                                          qs.id
                                          )))
        if 'is_finished' in request.POST:
            s_l_mark = StudentLesson.objects.get(lesson=self.get_object(), student=request.user)
            s_m_mark = StudentModule.objects.get(module=self.get_object().module, student=request.user)
            s_c_mark = CourseStudent.objects.get(course=self.get_object().module.course, student=request.user)
            if s_l_mark.set_finished():
                id = s_l_mark.get_next_lesson()
                if id:
                    id = id.id
                    return redirect(reverse('lesson_info',
                                            args=(self.get_object().module.course.id,
                                                  self.get_object().module.id,
                                                  id)))
                elif s_m_mark.set_finished():
                    id = s_m_mark.get_next_module()
                    if id:
                        id = id.id
                        return redirect(reverse('lessons_all',
                                                args=(self.get_object().module.course.id,
                                                      id)))
                    else:
                        if s_c_mark.set_finished():
                            return redirect(reverse('modules_all',
                                                    args=(self.get_object().module.course.id,
                                                          )))
        return render(request, self.template_name, self.get_context_data())


class MyQuestionInfoView(PermTestStudent, DetailView):
    model = Question
    template_name = 'question.html'
    pk_url_kwarg = 'question_id'

    # cxt: test, count_q, count_s_a

    # def get_object(self, queryset=None):
    #     return get_object_or_404(Question, id=self.kwargs['question_id'])

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        q = self.get_object()

        form = StudentAnswerForm()
        answers = Answer.objects.filter(question=q)
        choices_q = tuple((answer.id, answer.text) for answer in answers)
        print(choices_q)
        # if answers.filter(is_right=True).count() == 1:
        choices_field = forms.ChoiceField(label=q.text, choices=choices_q,
                                          widget=forms.RadioSelect())
        # else:
        #     choices_field = forms.MultipleChoiceField(label=q.text, choices=choices_q,
        # widget=forms.CheckboxSelectMultiple())
        form.fields["student_answer"] = choices_field
        ctx = self.get_context_data()
        ctx.update({"form": form, 'question': q})
        return render(request, self.template_name, ctx)

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        ctx = self.get_context_data()
        if request.method == "POST":
            form = StudentAnswerForm(request.POST)
            if form.is_valid():
                s_a = StudentAnswer.objects.get_or_create(student=request.user,
                                                   answer_id=form.cleaned_data.get("student_answer"))

                questions = list(Question.objects.filter(test=s_a[0].answer.question.test))
                sas = list(StudentAnswer.objects.filter(student=request.user,
                                                        answer__question__test=s_a[0].answer.question.test))
                sas = [sa.answer.question for sa in sas]
                qs = [question for question in questions if question not in sas ]
                if qs.__len__() > 1:
                    return redirect(reverse('question',
                                            args=(self.get_object().test.lesson.module.course.id,
                                                  self.get_object().test.lesson.module.id,
                                                  self.get_object().test.lesson.id,
                                                  self.get_object().test.id,
                                                  qs[0].id,
                                                  )))
                elif qs.__len__() == 0:
                    StudentTest.objects.get(test=self.get_object().test,student=request.user).is_test_right()
                    return redirect(reverse('lesson_info',
                                            args=(self.get_object().test.lesson.module.course.id,
                                                  self.get_object().test.lesson.module.id,
                                                  self.get_object().test.lesson.id,
                                                  )))
                else:
                    ctx.update({"last": True})
                    return redirect(reverse('question',
                                            args=(self.get_object().test.lesson.module.course.id,
                                                  self.get_object().test.lesson.module.id,
                                                  self.get_object().test.lesson.id,
                                                  self.get_object().test.id,
                                                  qs[0].id,
                                                  )))
            else:
                ctx.update({"form": form, "test": self.get_object().test})
        return render(request, self.template_name, ctx)


class TeacherLessonInfoView(PermCourseTeacher, DetailView):
    model = Lesson
    template_name = 'teacher/lesson_info_teacher.html'
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


class UpdateCourse(PermCourseTeacher, UpdateView):
    template_name = 'teacher/course_info_teacher.html'
    model = Course
    fields = [
        'name',
        'short_description',
        'long_description',
        'price',
        'discountPrice',
        'categories',
        # 'amount'
    ]
    pk_url_kwarg = 'course_id'

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Module.objects.filter(course_id=self.kwargs['course_id'])
        cxnt['update_form'] = True
        cxnt['course'] = get_object_or_404(Course, id=self.kwargs.get('course_id'))
        return cxnt

    def get_success_url(self):
        return reverse('teacher_modules_all', args=(self.object.id, ))


class ArchiveCourse(PermMethodist, DeleteView):
    template_name = 'teacher/course_info_teacher.html'
    model = Course
    pk_url_kwarg = 'course_id'
    # fields = [
    #     'is_active',
    # ]

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Module.objects.filter(course_id=self.kwargs['course_id'])
        cxnt['archive_form'] = True
        cxnt['course'] = get_object_or_404(Course, id=self.kwargs.get('course_id'))
        return cxnt

    def form_valid(self, form):
        # super().form_valid(form)
        get_object_or_404(Course,id=self.kwargs.get('course_id'))
        course = Course.objects.get( id=self.kwargs.get('course_id'))
        course.is_active = not course.is_active
        course.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('teacher_modules_all', args=(self.object.id,))


class CreateCourse(PermMethodist, CreateView):
    template_name = 'teacher/form.html'
    model = Course
    pk_url_kwarg = 'course_id'
    fields = [
        'name',
        'short_description',
        'long_description',
        'price',
        'discountPrice',
        'categories',
        # 'amount'
    ]

    def form_valid(self, form):
        super().form_valid(form)
        new_course = Course.objects.get(id=self.object.id)
        new_course.teacher = self.request.user
        new_course.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('teacher_modules_all', args=(self.object.id,))


class UpdateModule(UpdateView, PermCourseTeacher):
    template_name = "teacher/module_info_teacher.html"
    model = Module
    fields = ['name', 'description']
    pk_url_kwarg = 'module_id'
    context_object_name = "update_form"

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Lesson.objects.filter(module__course_id=self.kwargs['course_id'],
                                                 module_id=self.kwargs['module_id'],
                                                 module__course__teacher=self.request.user, )
        cxnt['module'] = get_object_or_404(Module, id=self.kwargs.get('module_id'))
        return cxnt

    def get_object(self, queryset=None):
        return get_object_or_404(Module,
                                 id=self.kwargs.get('module_id'))

    def get_success_url(self):
        return reverse('teacher_lessons_all',
                       args=(self.object.course.id, self.object.id,))


class DeleteModule(PermCourseTeacher, DeleteView):
    template_name = 'teacher/module_info_teacher.html'
    model = Module
    fields = ['name', 'description']
    pk_url_kwarg = 'module_id'
    context_object_name = "delete_form"

    def form_valid(self, form):
        # super().form_valid(form)
        module = get_object_or_404(Module, id=self.kwargs.get('module_id'))
        module.is_active = False
        module.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Lesson.objects.filter(module__course_id=self.kwargs['course_id'],
                                                 module_id=self.kwargs['module_id'],
                                                 module__course__teacher=self.request.user, )
        cxnt['module'] = get_object_or_404(Module, id=self.kwargs.get('module_id'))
        return cxnt

    def get_success_url(self):
        return reverse('teacher_modules_all',
                       args=(self.object.course.id, ))


class CreateModule(PermCourseTeacher, CreateView):
    template_name = 'teacher/course_info_teacher.html'
    model = Module
    fields = ['name', 'description']
    pk_url_kwarg = 'module_id'

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Module.objects.filter(course_id=self.kwargs['course_id'])
        cxnt['create_form'] = True
        cxnt['course'] = get_object_or_404(Course, id=self.kwargs.get('course_id'))
        return cxnt

    def form_valid(self, form):
        self.object = Module(course=get_object_or_404(Course,
                                                      id=self.kwargs.get('course_id')),
                             name=form.cleaned_data['name'],
                             description=form.cleaned_data['description'])
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('teacher_lessons_all',
                       args=(self.object.course.id, self.object.id,))


class UpdateLesson(PermCourseTeacher, UpdateView):
    template_name = 'teacher/lesson_info_teacher.html'
    model = Lesson
    fields = ['name', 'description']
    pk_url_kwarg = 'lesson_id'
    context_object_name = 'update_form'

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['lesson'] = self.get_object()
        return cxnt

    def get_object(self, queryset=None):
        return get_object_or_404(Lesson, id=self.kwargs.get('lesson_id'))

    def get_success_url(self):
        return reverse('teacher_lesson_info',
                       args=(self.object.module.course.id,
                             self.object.module.id,
                             self.object.id))


class DeleteLesson(PermCourseTeacher, DeleteView):
    template_name = 'teacher/lesson_info_teacher.html'
    model = Lesson
    fields = ['name', 'description']
    pk_url_kwarg = 'lesson_id'
    context_object_name = 'delete_form'

    def form_valid(self, form):
        # super().form_valid(form)
        module = get_object_or_404(Lesson, id=self.kwargs.get('lesson_id'))
        module.is_active = False
        module.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['lesson'] = self.get_object()
        return cxnt

    def get_success_url(self):
        return reverse('teacher_lessons_all',
                       args=(self.object.module.course.id,
                             self.object.module.id,
                             ))


class CreateLesson(PermCourseTeacher, CreateView):
    template_name = 'teacher/module_info_teacher.html'
    model = Lesson
    fields = ['name', 'description']
    pk_url_kwarg = 'lesson_id'

    def get_context_data(self, **kwargs):
        cxnt = super().get_context_data()
        cxnt['page_obj'] = Lesson.objects.filter(module__course_id=self.kwargs['course_id'],
                                     module_id=self.kwargs['module_id'],
                                     module__course__teacher=self.request.user,)
        cxnt['create_form'] = True
        cxnt['module'] = get_object_or_404(Module, id=self.kwargs.get('module_id'))
        return cxnt

    def form_valid(self, form):
        self.object = Lesson(module=get_object_or_404(Module,
                                                      id=self.kwargs.get('module_id')),
                             name=form.cleaned_data['name'],
                             description=form.cleaned_data['description'])
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('teacher_lesson_info',
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


class TeacherCourseListView(PermMethodist, ListView):
    model = Course
    paginate_by = 9
    template_name = 'teacher/courses_teacher.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        return cntxt

    def get_queryset(self):
        if not self.request.user.isMethodist:
            return Course.objects.filter(teacher=self.request.user)
        return Course.objects.all()


class TeacherModuleListView(PermCourseTeacher, ListView):
    model = Module
    paginate_by = 9
    template_name = 'teacher/course_info_teacher.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        print(self.kwargs['course_id'])
        cntxt['course'] = Course.objects.get(id=self.kwargs['course_id'])
        return cntxt

    def get_queryset(self):
        return Module.objects.filter(course_id=self.kwargs['course_id'],
                                     course__teacher=self.request.user)


class TeacherLessonListView(PermCourseTeacher, ListView):
    model = Lesson
    paginate_by = 9
    template_name = 'teacher/module_info_teacher.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['module'] = Module.objects.get(id=self.kwargs['module_id'])
        return cntxt

    def get_queryset(self):
        return Lesson.objects.filter(module__course_id=self.kwargs['course_id'],
                                     module_id=self.kwargs['module_id'],
                                     module__course__teacher=self.request.user,)
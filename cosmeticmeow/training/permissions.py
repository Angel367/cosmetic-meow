from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect, get_object_or_404
from django.views import View

from .models import CourseStudent, StudentModule, StudentLesson, StudentTest, Course, Module, Test, Question


def has_course_access_teacher(user, course):
    return course.teacher == user or user.isMethodist   # не проверял


def has_course_access_student(user, course):    # не проверял
    return CourseStudent.objects.filter(student=user, course=course).first() is not None or has_course_access_teacher(user, course)


def has_module_access_student(user, module):
    if module.id_in_course > 1: # если модуль по счету не первый,
        # проверяем закончен ли прошлый модуль
        is_access = StudentModule.objects.filter(student=user,
                                                 module__id_in_course=module.id_in_course - 1).first().is_finised()
    else: # иначе студент зашел на 1 модуль
        is_access = True
    return has_course_access_student(user, module.course) & is_access


def has_lesson_access_student(user, lesson):
    if lesson.id_in_module > 1: # если модуль по счету не первый,
        # проверяем закончен ли прошлый модуль
        is_access = StudentLesson.objects.filter(student=user,
                                                 lesson__id_in_module=lesson.id_in_module - 1).first().is_finised()
    else: # иначе студент зашел на 1 модуль
        is_access = True
    return has_module_access_student(user, lesson.module) & is_access


def has_test_access_student(user, test, question):
    return has_lesson_access_student(user, test.lesson) \
        and get_object_or_404(Question ,id=question.id) and test.id == question.test_id


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


class PermModuleStudent(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_module_access_student(self.request.user, get_object_or_404(Module, id=self.kwargs['module_id']))

    def handle_no_permission(self):
        module = StudentModule.objects.get(student=self.request.user, module_id=self.kwargs['module_id']).get_first_not_finished()
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        if str(module.course.id) == str(self.kwargs['course_id']):
            return redirect('/courses/' + str(self.kwargs['course_id']) + '/modules/' + str(module.id))
        else:
            return redirect('/courses/' + str(self.kwargs['course_id']))


class PermLessonStudent(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_lesson_access_student(self.request.user, get_object_or_404(Lesson, id=self.kwargs['lesson_id']))

    def handle_no_permission(self):
        lesson = StudentLesson.objects.get(student=self.request.user, lesson_id=self.kwargs['lesson_id']).get_first_not_finished()
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        if str(lesson.module.course.id) == str(self.kwargs['course_id']):
            return redirect('/courses/' + str(self.kwargs['course_id']) + '/modules/' + str(lesson.module.id) + '/lessons/' + str(lesson.id))
        else:
            return redirect('/courses/' + str(self.kwargs['course_id']))


class PermTestStudent(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_test_access_student(self.request.user,
                                       get_object_or_404(Test, id=self.kwargs['test_id']),
                                       get_object_or_404(Question, id=self.kwargs['question_id']),
                                       )

    def handle_no_permission(self):
        q = Question.objects.get(id=self.kwargs['question_id'])
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        if str(q.test.lesson.module.course.id) == str(self.kwargs['course_id']):
            return redirect('/courses/' + str(self.kwargs['course_id']) + '/modules/' + \
                             str(q.test.lesson.module.id) + '/lessons/' + str(q.test.lesson.id) + \
                            '/tests/' + str(q.test.id)) + '/questions/' + str(q.id)
        else:
            return redirect('/courses/' + str(self.kwargs['course_id']))
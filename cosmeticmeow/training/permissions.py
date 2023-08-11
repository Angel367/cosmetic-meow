from .models import CourseStudent


def has_course_access_teacher(user, course):
    return course.teacher == user or user.isMethodist   # не проверял


def has_course_access_student(user, course):    # не проверял
    return CourseStudent.objects.filter(student=user, course=course).first() is not None or course.teacher == user

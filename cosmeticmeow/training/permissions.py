from .models import CourseUser


def has_course_access(user, course):
    return CourseUser.objects.filter(student=user, course=course).first() is not None
    # TODO: Не вернёт ошибку если таких несколько - не посрать ли нам?

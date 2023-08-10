from .models import CourseStudent


def has_course_access_teacher(user, course):
    return course.teacher == user


def has_course_access_student(user, course):
    return CourseStudent.objects.get(student=user, course=course) is not None or course.teacher == user
    # TODO: Не вернёт ошибку если таких несколько - не посрать ли нам?
    # TODO: я думаю что надо поставить юник тугезер и все

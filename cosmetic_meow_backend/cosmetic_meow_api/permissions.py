from rest_framework import permissions
from .models import Course, CoursePurchase, Lesson


class AllCreateAdminAllAnother403(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            # Разрешаем только создание для всех пользователей
            return True
        elif request.user.is_authenticated:
            # Проверяем аутентифицирован ли пользователь
            if request.user.is_admin:
                # Разрешаем все методы для суперпользователя
                return True
        # Если ни одно из условий не сработало, возвращаем False
        return False


class AllSafeAdminAllAnother403(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Разрешаем все методы для всех пользователей
            return True
        elif request.user.is_authenticated:
            # Проверяем аутентифицирован ли пользователь
            if request.user.is_admin:
                # Разрешаем все методы для суперпользователя
                return True
            else:
                return False
        else:
            return False




class IsCoursePurchased(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Проверяем, если объект - это курс, то нужно проверить покупку
        if isinstance(obj, Course):
            return CoursePurchase.objects.filter(user=request.user, course=obj).exists()
        # Проверяем, если объект - это урок, то нужно проверить покупку курса, к которому он относится
        elif isinstance(obj, Lesson):
            return CoursePurchase.objects.filter(user=request.user, course=obj.course).exists()
        return False

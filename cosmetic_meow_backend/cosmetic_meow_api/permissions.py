from rest_framework import permissions


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

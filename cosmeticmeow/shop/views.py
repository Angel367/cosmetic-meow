from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from .permissions import has_product_access_manager
from .models import *

# Create your views here.


class PermProductManager(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_product_access_manager(self.request.user)

    def handle_no_permission(self):
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        return redirect('/')

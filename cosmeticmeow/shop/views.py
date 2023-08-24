from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import CreateView, FormView, DetailView

from .permissions import has_product_access_manager
from .models import *
from .forms import *

# Create your views here.


class PermProductManager(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return has_product_access_manager(self.request.user)

    def handle_no_permission(self):
        if self.raise_exception:
            raise PermissionDenied(self.get_permission_denied_message())
        return redirect('/')


class ProductInfoView(DetailView):
    #  TODO: запрещать ли доступ просмотра к архивным продуктам для обычных пользователей?
    model = Product
    template_name = 'product_info.html'
    pk_url_kwarg = 'product_id'


class CreateProduct(PermProductManager, CreateView):
    template_name = 'productManager/create_product.html'
    model = Product
    pk_url_kwarg = 'product_id'
    form_class = ProductForm

    def form_valid(self, form):
        new_product = super().form_valid(form)
        images = form.cleaned_data['images']
        for image in images:
            ProductImage.objects.create(
                image=image,
                product_id=self.object.id
            )
        return new_product

    def get_success_url(self):
        return reverse('product_info_view', args=(self.object.id,))

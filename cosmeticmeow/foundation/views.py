from django import forms
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from django.utils.decorators import method_decorator
from .forms import CustomUserAuth
from django.views.generic import CreateView, DetailView
from .forms import CustomUserCreateForm
from .decorators import user_not_authenticated
from .models import Subscriber, CustomUser


# Create your views here.


class IndexView(CreateView):
    template_name = "main.html"
    model = Subscriber
    fields = ['email']
    success_url = '/'

    def get_form(self, form_class=None):
        if form_class is None:
            form_class = self.get_form_class()
        form = super(IndexView, self).get_form(form_class)
        form.fields['email'].widget = forms.TextInput(
            attrs={'placeholder': 'Ваш email...'}
        )
        return form


class DevelopmentView(CreateView):
    template_name = "main.html"
    model = Subscriber
    fields = ['email']
    success_url = '/'


# class IndexEnView(IndexView):
#     template_name = "main_en.html"
#     success_url = '/en'
#     def get_form(self, form_class=None):
#         if form_class is None:
#             form_class = self.get_form_class()
#         form = super(IndexView, self).get_form(form_class)
#         form.fields['email'].widget = forms.TextInput(
#             attrs={'placeholder': 'Your email...'}
#         )
#         return form


class CustomUserDetailsView(DetailView):
    model = CustomUser
    template_name = 'user_details.html'


class CustomLoginView(LoginView):
    form_class = CustomUserAuth
    template_name = 'authentication/login.html'
    redirect_authenticated_user = True
    success_url = reverse_lazy('/')


class CustomLogoutView(LogoutView):
    next_page = '/'  # Замените 'home' на имя вашей домашней страницы


@method_decorator(user_not_authenticated, name="dispatch")
class CustomRegistrationView(CreateView):
    form_class = CustomUserCreateForm
    template_name = 'authentication/registration.html'
    success_url = reverse_lazy('foundation:login')

    def form_valid(self, form):
        user = form.save()
        activate_email(self.request, user, form.instance.email)
        return super().form_valid(form)


def activate_email(request, user, to_email):
    messages.success(request, f'Dear <b>{user}</b>, please go to you email <b>{to_email}</b> inbox and click on \
        received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder.')

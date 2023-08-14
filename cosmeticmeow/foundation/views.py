from django import forms
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from django.utils.decorators import method_decorator
from django.views.generic import CreateView
from .forms import CustomUserCreateForm
from .decorators import user_not_authenticated
from .models import Subscriber


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
            attrs={'placeholder': 'Enter your email Address'}
        )
        return form



class CustomLoginView(LoginView):
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
        # Автоматически выполняем вход пользователя после успешной регистрации
        user = form.save()
        return super().form_valid(form)

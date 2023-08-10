from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView
from .forms import CustomUserCreateForm
from .models import CustomUser


# Create your views here.


class IndexView(TemplateView):
    template_name = "main.html"


class CustomLoginView(LoginView):
    template_name = 'authentication/login.html'
    redirect_authenticated_user = True
    success_url = reverse_lazy('/')


class CustomLogoutView(LogoutView):
    next_page = '/'  # Замените 'home' на имя вашей домашней страницы


class CustomRegistrationView(CreateView):
    form_class = CustomUserCreateForm
    template_name = 'authentication/registration.html'
    success_url = reverse_lazy('foundation:login')

    def form_valid(self, form):
        # Автоматически выполняем вход пользователя после успешной регистрации
        user = form.save()
        return super().form_valid(form)

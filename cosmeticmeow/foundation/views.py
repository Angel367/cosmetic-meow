from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView, CreateView
from .forms import CustomUserCreateForm
from .decorators import user_not_authenticated


# Create your views here.


class IndexView(TemplateView):
    template_name = "main.html"


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
        user = form.save()
        activate_email(self.request, user, form.instance.email)
        return super().form_valid(form)


def activate_email(request, user, to_email):
    messages.success(request, f'Dear <b>{user}</b>, please go to you email <b>{to_email}</b> inbox and click on \
        received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder.')

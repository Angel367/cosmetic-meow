from django import forms
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from .forms import CustomUserAuth
from django.views.generic import CreateView, DetailView, ListView, TemplateView
from .forms import CustomUserCreateForm
from .decorators import user_not_authenticated
from .models import Subscriber, CustomUser, Feedback
from training.models import Course
from shop.models import Product


# Create your views here.


class IndexView(CreateView):
    template_name = "main.html"
    model = Subscriber
    fields = ['email']
    success_url = '/'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['courses'] = Course.objects.filter(is_active=True)[:6]
        cntxt['products'] = Product.objects.filter(is_active=True)[:6]
        return cntxt

    def get_form(self, form_class=None):
        if form_class is None:
            form_class = self.get_form_class()
        form = super(IndexView, self).get_form(form_class)
        form.fields['email'].widget = forms.TextInput(
            attrs={'placeholder': 'Ваш email...'}
        )
        return form


class DevelopmentView(CreateView):
    template_name = "dev.html"
    model = Feedback
    fields = ['name', 'email', 'message',  'is_agreement_signed']
    success_url = '/'

    def get_form(self, form_class=None):
        if form_class is None:
            form_class = self.get_form_class()
        form = super(DevelopmentView, self).get_form(form_class)
        form.label_suffix = ''
        form.fields['is_agreement_signed'].required = True
        form.fields['message'].widget.attrs['rows'] = 7

        form.fields['message'].widget.attrs['cols'] = 3
        form.fields['name'].widget.attrs['placeholder'] = 'Ваше имя...'
        form.fields['email'].widget.attrs['placeholder'] = 'Ваш email...'
        form.fields['message'].widget.attrs['placeholder'] = 'Ваше сообщение...'
        # form.fields['is_agreement_signed'].widget = forms.CheckboxInput()
        form.fields['is_agreement_signed'].label = 'Я согласен с условиями обработки персональных данных'
        return form

    def form_valid(self, form):
        form.type = 'Development'
        form.save()
        return super().form_valid(form)



class CustomUserDetailsView(DetailView):
    model = CustomUser
    template_name = 'user_details.html'


class CustomLoginView(LoginView):
    form_class = CustomUserAuth
    template_name = 'authentication/login.html'
    redirect_authenticated_user = True
    success_url = reverse_lazy('/')


class LinePageView(TemplateView):
    template_name = 'line-page.html'

    def get_context_data(self, **kwargs):
        cntxt = super().get_context_data()
        cntxt['similar'] = Product.objects.filter(is_active=True).order_by("creation_date")[:4]
        cntxt['products'] = Product.objects.filter(is_active=True).order_by("name")[:4]
        return cntxt


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

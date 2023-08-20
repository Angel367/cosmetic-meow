from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm, PasswordChangeForm
from .models import Subscriber, CustomUser
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox


class SubscriberForm(ModelForm):
    class Meta:
        model = Subscriber
        fields = ['email']


class CustomUserCreateForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['last_name',
                  'first_name',
                  'middle_name',
                  'gender',
                  'email',
                  'phone_number',
                  'password1',
                  'password2'
                  ]

    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox())


class CustomUserUpdateForm(UserChangeForm):
    class Meta:
        fields = ['last_name',
                  'first_name',
                  'middle_name',
                  'gender',
                  'email',
                  'phone_number',
                  ]


class CustomUserAuth(AuthenticationForm):
    class Meta:
        fields = [
            'email',
            'password',
        ]
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox())


class CustomUserChangePassword(PasswordChangeForm):
    class Meta:
        fields = ['password_old',
                  'password1',
                  'password2',
                  ]
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox())

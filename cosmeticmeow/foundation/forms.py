from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm, PasswordChangeForm
from .models import Subscriber


class SubscriberForm(ModelForm):
    class Meta:
        model = Subscriber
        exclude = 'is_active'


class CustomUserCreateForm(UserCreationForm):
    class Meta:
        fields = ['last_name',
                  'first_name',
                  'middle_name',
                  'gender',
                  'username',  # TODO email?
                  'phone_number',
                  'password1',
                  'password2'
                  ]


class CustomUserUpdateForm(UserChangeForm):
    class Meta:
        fields = ['last_name',
                  'first_name',
                  'middle_name',
                  'gender',
                  'username',  # TODO email?
                  'phone_number',
                  ]


class CustomUserAuth(AuthenticationForm):
    class Meta:
        fields = [
            'username',  # TODO email?
            'password',
        ]


class CustomUserChangePassword(PasswordChangeForm):
    class Meta:
        fields = ['password_old',
                  'password1',
                  'password2',
                  ]

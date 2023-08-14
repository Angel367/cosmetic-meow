from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm, PasswordChangeForm
from .models import CustomUser


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


class CustomUserChangePassword(PasswordChangeForm):
    class Meta:
        fields = ['password_old',
                  'password1',
                  'password2',
                  ]

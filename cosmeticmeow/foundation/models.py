from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


GENDER_CHOICES = [
    ('M', 'Мужской'),   # Male
    ("F", 'Женский'),   # Female
    ("O", 'Другой'),    # Other
    ("N", 'Не указан')  # Not specified
]


class CustomUser(AbstractUser):
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1, default='N')
    # first name
    # last name
    middle_name = models.CharField(max_length=150, blank=True)  # Аналогично first/last name
    # email
    phone_number = models.CharField(
        max_length=12,
        validators=[RegexValidator(regex=r'^\+7\d{10}$')],
        blank=True,
        null=True)  # TODO null = True?
    nickname = models.CharField(max_length=50)


class Subscriber(models.Model):
    email = models.EmailField(blank=False, null=False, unique=True)
    active = models.BooleanField(blank=False, null=False, default=True)

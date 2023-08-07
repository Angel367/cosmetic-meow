from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class GenderChoices(models.TextChoices):
    MALE = 'M', "Мужской"
    FEMALE = 'F', "Женский"
    OTHER = 'O', "Другой"
    NOT_SPECIFIED = 'N', "Не указан"


class CustomUser(AbstractUser):
    gender = models.CharField(choices=GenderChoices.choices, max_length=1, default=GenderChoices.NOT_SPECIFIED)
    # first name    имя
    # last name     фамилия
    middle_name = models.CharField(max_length=150, blank=True)  # Аналогично first/last name, отчество
    # email
    phone_number = models.CharField(
        max_length=12,
        validators=[RegexValidator(regex=r'^\+7\d{10}$')],
        blank=True,
        null=True)

    class Meta:
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"
        ordering = ["-id"]


class Subscriber(models.Model):
    email = models.EmailField(blank=False, null=False, unique=True)
    active = models.BooleanField(blank=False, null=False, default=True)

    class Meta:
        verbose_name = "подписчик"
        verbose_name_plural = "подписчики"
        ordering = ["-id"]

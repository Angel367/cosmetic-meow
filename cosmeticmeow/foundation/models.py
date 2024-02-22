from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

from foundation.managers import CustomUserManager


# Create your models here.

class CallbackChoices(models.TextChoices):
    TRAINING = 'T', "Обучение"
    SHOP = 'S', "Магазин"
    OTHER = 'O', "Другое"
    DEVELOPMENT = 'D', "Контрактное производство"


class GenderChoices(models.TextChoices):
    MALE = 'M', "Мужской"
    FEMALE = 'F', "Женский"
    OTHER = 'O', "Другой"
    NOT_SPECIFIED = 'N', "Не указан"


class CustomUser(AbstractUser):
    username = None
    gender = models.CharField(choices=GenderChoices.choices,
                              max_length=1,
                              default=GenderChoices.NOT_SPECIFIED,
                              verbose_name="Пол")
    # first name    имя
    # last name     фамилия
    middle_name = models.CharField(max_length=150,
                                   blank=True,
                                   verbose_name="Отчество")  # Аналогично first/last name, отчество
    email = models.EmailField('Почта', unique=True, blank=False)
    is_email_verified = models.BooleanField(blank=False, default=False)
    REQUIRED_FIELDS = []
    phone_number = models.CharField(
        max_length=12,
        validators=[RegexValidator(regex=r'^\+7\d{10}$')],
        blank=True,
        null=True,
        verbose_name="Номер телефона")
    USERNAME_FIELD = "email"
    objects = CustomUserManager()
    isMethodist = models.BooleanField(blank=False, default=False)
    isManager = models.BooleanField(blank=False, default=False)

    @property
    def full_name(self):
        return '%s %s %s' % (self.last_name, self.first_name, self.middle_name)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"
        ordering = ["-id"]


class Subscriber(models.Model):
    email = models.EmailField(blank=False, null=False, unique=True, max_length=40, verbose_name='')
    is_active = models.BooleanField(blank=False, null=False, default=True)

    class Meta:
        verbose_name = "подписчик"
        verbose_name_plural = "подписчики"
        ordering = ["-id"]


class Feedback(models.Model):
    email = models.EmailField(blank=False,
                              null=False,
                              unique=False,
                              max_length=40,
                              verbose_name='Почта')
    is_active = models.BooleanField(blank=False, null=False, default=True)
    is_agreement_signed = models.BooleanField(blank=False, null=False, default=False,
                                              verbose_name="Согласие на обработку персональных данных")

    name = models.CharField(
        max_length=150,
        verbose_name="Имя")
    message = models.TextField(
        verbose_name="Сообщение")
    type = models.CharField(
        choices=CallbackChoices.choices,
        max_length=1,
        blank=True,
        default=CallbackChoices.OTHER,
        verbose_name="Тип обратной связи")

    class Meta:
        verbose_name = "Обратная связь"
        verbose_name_plural = "Обратные связи"
        ordering = ["-id"]

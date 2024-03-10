from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None):
        """
        Creates and saves a User with the given phone_number and password.
        """
        if not phone_number:
            raise ValueError("Users must have an phone number")

        user = self.model(
            phone_number=phone_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            phone_number,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        null=True,
        blank=True
    )
    date_of_birth = models.DateField(
        null=True,
        blank=True,
        verbose_name='Дата рождения'
    )
    phone_number = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        unique=True,
        verbose_name='Номер телефона'
    )
    is_active = models.BooleanField(
        default=True
    )
    is_admin = models.BooleanField(
        default=False
    )

    first_name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Имя'
    )
    last_name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Фамилия'
    )
    middle_name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Отчество'
    )


    objects = CustomUserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.phone_number

    @staticmethod
    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Simplest possible answer: Yes, always
        return True

    @staticmethod
    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        # Simplest possible answer: All admins are staff
        return self.is_admin


# class UserAddress(models.Model):
#     user = models.ForeignKey(
#         to=CustomUser,
#         on_delete=models.CASCADE,
#         verbose_name='Пользователь'
#     )
#     city = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Город'
#     )
#     street = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Улица'
#     )
#     house = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Дом'
#     )
#     apartment = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Квартира'
#     )
#     entrance = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Подъезд'
#     )
#     floor = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Этаж'
#     )
#     intercom_code = models.CharField(
#         max_length=100,
#         null=False,
#         blank=False,
#         verbose_name='Домофон'
#     )
#     comment = models.TextField(
#         null=False,
#         blank=False,
#         verbose_name='Комментарий'
#     )


class BasePrice(models.Model):
    price_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        verbose_name='Цена'
    )


class DiscountPrice(BasePrice):
    begin_date = models.DateField(
        null=False,
        blank=False,
        verbose_name='Дата начала действия скидки'
    )
    end_date = models.DateField(
        null=False,
        blank=False,
        verbose_name='Дата окончания действия скидки'
    )


class ProductTag(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    short_description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Краткое описание'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )
    composition = models.TextField(
        null=False,
        blank=False,
        verbose_name='Состав'
    )
    purpose = models.TextField(
        null=False,
        blank=False,
        verbose_name='Назначение'
    )
    application_method = models.TextField(
        null=False,
        blank=False,
        verbose_name='Способ применения'
    )
    price = models.ForeignKey(
        to=BasePrice,
        related_name='price',
        on_delete=models.CASCADE,
        verbose_name='Цена',
    )
    discount_price = models.ForeignKey(
        to=DiscountPrice,
        related_name='discount_price',
        on_delete=models.CASCADE,
        verbose_name='Цена со скидкой'
    )
    active_substances = models.ManyToManyField(
        to='ProductActiveSubstance',
        verbose_name='Активные вещества'
    )
    advantages = models.ManyToManyField(
        to='ProductAdvantage',
        verbose_name='Преимущества'
    )
    clinical_testing_result = models.ForeignKey(
        to='ProductClinicalTestingResult',
        on_delete=models.CASCADE,
        verbose_name='Результаты клинических испытаний'
    )
    product_line = models.ForeignKey(
        to='ProductLine',
        on_delete=models.CASCADE,
        verbose_name='Линия продукта'
    )
    product_tags = models.ManyToManyField(
        to=ProductTag,
        verbose_name='Теги',
    )


class ProductClinicalTestingResult(models.Model):
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )


class ProductClinicalTestingResultImage(models.Model):
    image = models.ImageField(
        null=True,
        blank=True,
        verbose_name='Изображение'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    product_clinical_testing_result = models.ForeignKey(
        to=ProductClinicalTestingResult,
        on_delete=models.CASCADE,
        verbose_name='Результаты клинических испытаний'
    )


class BasePriceHistory(models.Model):
    old_price = models.ForeignKey(
        to=BasePrice,
        on_delete=models.CASCADE,
        verbose_name='Цена'
    )
    end_date = models.DateField(
        null=False,
        blank=False,
        verbose_name='Дата изменения'
    )


class ProductPartner(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )
    product_lines = models.ManyToManyField(
        to='ProductLine',
        verbose_name='Линии продукта'
    )
    # image


class ProductAdvantage(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )
    # image


class ProductActiveSubstance(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )
    # image


class ProductLine(models.Model):
    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        null=False,
        blank=False,
        verbose_name='Описание'
    )


class FeedBack(models.Model):
    TYPE_CHOICES = (
        ('support', 'Поддержка'),
        ('contract_request', 'Запрос на контрактное производство'),
        ('other', 'Другое')
    )

    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Имя'
    )
    email = models.EmailField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Email'
    )
    message = models.TextField(
        null=False,
        blank=False,
        verbose_name='Сообщение'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    type = models.CharField(
        choices=TYPE_CHOICES,
        max_length=100,
        null=False,
        blank=False,
        verbose_name='Тип'
    )
    is_active = models.BooleanField(
        default=True,
        null=False,
        blank=False,
        verbose_name='Активно'
    )

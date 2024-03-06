from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models


class CustomUser(AbstractBaseUser):
    phone_number = models.CharField(
        max_length=12,
        unique=True,
        null=False,
        blank=False,
        verbose_name='Номер телефона'
    )
    middle_name = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Отчество'
    )

    USERNAME_FIELD = 'phone_number'


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
    description_composition = models.TextField(
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
    #todo Егор это нифига не будет удобно но как есть
    #     надо предложить просто давать ссылку на исследование
    #     а не хранить картинку
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


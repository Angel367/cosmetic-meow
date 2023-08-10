# Generated by Django 4.1.10 on 2023-08-10 19:01

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'атрибут',
                'verbose_name_plural': 'атрибуты',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='категория')),
            ],
            options={
                'verbose_name': 'категория',
                'verbose_name_plural': 'категории',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('sender', models.EmailField(max_length=254)),
                ('is_active', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'отзыв',
                'verbose_name_plural': 'отзывы',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_status', models.CharField(choices=[('CA', 'Корзина'), ('PR', 'Ожидает оплаты'), ('PS', 'Успешно оплачен'), ('CF', 'Подтвержден'), ('FS', 'Выполнен'), ('CL', 'Отменён')], default='CA', max_length=2)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'заказ',
                'verbose_name_plural': 'заказы',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('short_description', models.TextField(max_length=500)),
                ('long_description', models.TextField(max_length=5000)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discountPrice', models.DecimalField(decimal_places=2, default=models.DecimalField(decimal_places=2, max_digits=10), max_digits=10)),
                ('is_active', models.BooleanField(default=True)),
                ('is_course', models.BooleanField(blank=True, default=False)),
                ('amount', models.IntegerField(default=1)),
                ('tax_rate', models.FloatField(default=0.2, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(1.0)])),
                ('views_amount', models.IntegerField(default=0)),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('categories', models.ManyToManyField(blank=True, to='shop.category')),
            ],
            options={
                'verbose_name': 'продукт',
                'verbose_name_plural': 'продукты',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('track_number', models.CharField(blank=True, max_length=20, null=True)),
                ('fix_price', models.DecimalField(decimal_places=2, default=100, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.order')),
            ],
            options={
                'verbose_name': 'доставка',
                'verbose_name_plural': 'доставки',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, default='shop/default_images/default_product_image.png', null=True, upload_to='shop/product_images/')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
            options={
                'verbose_name': 'изображение продукта',
                'verbose_name_plural': 'изображения продуктов',
                'ordering': ['product__name'],
            },
        ),
        migrations.CreateModel(
            name='PriceChange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time_change', models.DateTimeField(auto_now_add=True)),
                ('new_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
            options={
                'verbose_name': 'изменение цены',
                'verbose_name_plural': 'изменения цен',
                'ordering': ['-date_time_change'],
            },
        ),
        migrations.CreateModel(
            name='OrderedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='shop.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='shop.product')),
            ],
            options={
                'verbose_name': 'заказанный продукт',
                'verbose_name_plural': 'заказанные продукты',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='AttributeValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='атрибут')),
                ('attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.attribute')),
            ],
            options={
                'verbose_name': 'значение_атрибута',
                'verbose_name_plural': 'значения_атрибута',
                'ordering': ['name'],
            },
        ),
    ]

# Generated by Django 4.1.10 on 2023-08-07 14:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('sender', models.EmailField(max_length=254)),
                ('is_active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_status', models.CharField(choices=[('CA', 'Корзина'), ('PR', 'Ожидает оплаты'), ('PS', 'Успешно оплачен'), ('CF', 'Подтвержден'), ('FS', 'Выполнен'), ('CL', 'Отменён')], default='CA', max_length=2)),
                ('customer', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discountPrice', models.DecimalField(decimal_places=2, default=models.DecimalField(decimal_places=2, max_digits=10), max_digits=10)),
                ('is_active', models.BooleanField(default=True)),
                ('amount', models.IntegerField(default=1)),
                ('order', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to='shop.order')),
            ],
        ),
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('track_number', models.CharField(blank=True, max_length=20, null=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.order')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='shop/product_images/')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
        ),
        migrations.CreateModel(
            name='PriceChange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time_change', models.DateTimeField()),
                ('new_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
        ),
        migrations.CreateModel(
            name='OrderedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='shop.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='shop.product')),
            ],
        ),
    ]

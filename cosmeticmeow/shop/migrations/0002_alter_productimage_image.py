# Generated by Django 4.1.10 on 2023-08-05 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=models.ImageField(upload_to='shop/product_images/'),
        ),
    ]

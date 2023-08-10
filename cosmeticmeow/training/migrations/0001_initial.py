# Generated by Django 4.1.10 on 2023-08-10 19:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('shop', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='shop.product')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'курс',
                'verbose_name_plural': 'курсы',
                'ordering': ['-id'],
            },
            bases=('shop.product',),
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('id_in_module', models.IntegerField(blank=True)),
            ],
            options={
                'verbose_name': 'урок',
                'verbose_name_plural': 'уроки',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('id_in_course', models.IntegerField(blank=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.course')),
            ],
            options={
                'verbose_name': 'тема',
                'verbose_name_plural': 'темы',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duration', models.DurationField()),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.lesson')),
            ],
            options={
                'verbose_name': 'тест',
                'verbose_name_plural': 'тесты',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('rightAnswer', models.TextField()),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.test')),
            ],
            options={
                'verbose_name': 'вопрос',
                'verbose_name_plural': 'вопросы',
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='lesson',
            name='module',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='training.module'),
        ),
        migrations.CreateModel(
            name='ContentFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='training/content_files')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.lesson')),
            ],
            options={
                'verbose_name': 'файл контента',
                'verbose_name_plural': 'файлы контента',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('time_saved', models.DateTimeField(auto_now_add=True)),
                ('is_right', models.BooleanField()),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.question')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'ответ',
                'verbose_name_plural': 'ответы',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='StudentModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_finished', models.BooleanField(blank=True, default=False)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.module')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'тема студента',
                'verbose_name_plural': 'темы студентов',
                'unique_together': {('module', 'student')},
            },
        ),
        migrations.CreateModel(
            name='StudentLesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_finished', models.BooleanField(blank=True, default=False)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.lesson')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'урок студента',
                'verbose_name_plural': 'уроки студентов',
                'unique_together': {('lesson', 'student')},
            },
        ),
        migrations.CreateModel(
            name='CourseStudent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_date', models.DateField(auto_now_add=True)),
                ('is_finished', models.BooleanField(blank=True, default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'курс для пользователя',
                'verbose_name_plural': 'курсы для пользователей',
                'ordering': ['-purchase_date'],
                'unique_together': {('course', 'student')},
            },
        ),
    ]

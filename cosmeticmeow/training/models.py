from django.db import models
from shop.models import Product, CustomUser
# Create your models here.


# class Teacher(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#
#     class Meta:
#         verbose_name = "учитель"
#         verbose_name_plural = "учители"
#         ordering = ["-id"]


# class Student(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#
#     class Meta:
#         verbose_name = "студент"
#         verbose_name_plural = "студенты"
#         ordering = ["-id"]


class Course(models.Model):  # онлайн вебинары, запись или текстовые файлы и текст
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
    teacher = models.ForeignKey(CustomUser, on_delete=models.PROTECT, null=True)
    # is active for training

    def save(self, **kwargs):
        self.product.is_course = True
        self.save()

    class Meta:
        verbose_name = "курс"
        verbose_name_plural = "курсы"
        ordering = ["-id"]


class CourseUser(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "курс для пользователя"
        verbose_name_plural = "курсы для пользователей"
        ordering = ["-purchase_date"]
#     status прохождения:
#     is not started
#     finished for x% ???
#     waiting exam
#     passed exam
#     finished successful
#     # время доступа :
#       forever or date_of_end_subscr


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField()

    class Meta:
        verbose_name = "урок"
        verbose_name_plural = "уроки"
        ordering = ["-id"]


class StudentLesson(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "урок студента"
        verbose_name_plural = "уроки студентов"


class ContentFile(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    file = models.FileField(upload_to='training/content_files')

    class Meta:
        verbose_name = "файл контента"
        verbose_name_plural = "файлы контента"
        ordering = ["-id"]


# кол-во тестов в курсе? 1, 0 или больше
class Test(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    duration = models.DurationField()

    class Meta:
        verbose_name = "тест"
        verbose_name_plural = "тесты"
        ordering = ["-id"]


class Question(models.Model):
    text = models.TextField()
    rightAnswer = models.TextField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "вопрос"
        verbose_name_plural = "вопросы"
        ordering = ["-id"]


# типы вопросов? radio, checkbox, text
class Answer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time_saved = models.DateTimeField(auto_now_add=True)
    is_right = models.BooleanField()

    class Meta:
        verbose_name = "ответ"
        verbose_name_plural = "ответы"
        ordering = ["-id"]

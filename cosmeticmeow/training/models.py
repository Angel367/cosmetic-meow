from django.db import models
from shop.models import Product, CustomUser
# Create your models here.


class Teacher(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Student(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Course(models.Model):  # онлайн вебинары, запись или текстовые файлы и текст
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT, null=True)
    # is active for training


class CourseUser(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)
#     status прохождения:
#     is not started
#     finished for x%
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


class ContentFile(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    file = models.FileField(upload_to='training/content_files')


# колво тестов в курсе? 1, 0 или больше
class Test(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    duration = models.DurationField()


class Question(models.Model):
    text = models.TextField()
    rightAnswer = models.TextField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE)


# типы вопросов? radio, checkbox, text
class Answer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    time_saved = models.DateTimeField(auto_now_add=True)
    is_right = models.BooleanField()

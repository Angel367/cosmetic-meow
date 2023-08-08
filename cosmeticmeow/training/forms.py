from django.forms import ClearableFileInput, ModelForm
from shop.forms import ProductWithImageForm
from .models import Course, Lesson, ContentFile, Test, Question, Answer


class CourseForm(ModelForm):   # user form add
    class Meta:
        model = Course
        exclude = ['is_active']
        field_classes = {
            'product': ProductWithImageForm
        }
#   TODO      только определенная группа пользователей == учителя
# можно виджеты применить для фильтр


class LessonForm(ModelForm):
    class Meta:
        model = Lesson
        exclude = ['course']


class LessonWithContentFile(ModelForm):
    class Meta:
        model = ContentFile
        fields = ['lesson', 'file']
        field_classes = {
            'lesson': LessonForm
        }
        widgets = {
            'file': ClearableFileInput(attrs={'multiple': True})
        }


class TestForm(ModelForm):
    class Meta:
        model = Test
        fields = "__all__"


class QuestionForm(ModelForm):
    class Meta:
        model = Question
        exclude = ["test"]


class AnswerForm(ModelForm):
    class Meta:
        model = Answer
        fields = ["text"]
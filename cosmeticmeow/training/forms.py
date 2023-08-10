from django.forms import ClearableFileInput, ModelForm, HiddenInput
from shop.forms import ProductForm

from .models import Lesson, ContentFile, Test, Question, Answer


class LessonForm(ModelForm):
    class Meta:
        model = Lesson
        fields = ['name','description', ]


class ContentFileForm(ModelForm):
    class Meta:
        model = ContentFile
        fields = ['file']
        # widgets = {
        #     'file': ClearableFileInput(attrs={'multiple': True})
        # }
# TODO MODULE AND FIX FORMS


class TestFormCreate(ModelForm): # для создания, теста преподом
    class Meta:
        model = Test
        fields = ['duration']


# class TestFormUpdate(ModelForm): # для редактирования теста преподом
#     class Meta:
#         model = Test
#         fields = ['duration', 'id']
#         widgets = {
#             'id': HiddenInput()
#         }


class QuestionForm(ModelForm):
    class Meta:
        model = Question
        fields = ["text", "rightAnswer"]


class AnswerForm(ModelForm):
    class Meta:
        model = Answer
        fields = ["text"]

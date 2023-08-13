from django import forms


class StudentAnswerForm(forms.Form):
    student_answer = forms.CharField()
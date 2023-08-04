from django.urls import path
from django.views.generic import TemplateView

# from . import views

app_name = 'foundation'

urlpatterns = [
    path('', TemplateView.as_view(template_name="main.html"), name='index'),
]

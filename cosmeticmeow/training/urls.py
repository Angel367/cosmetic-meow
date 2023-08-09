from django.urls import path
from .views import CourseInfoView

urlpatterns = [
    path('course/<int:course_id>/', CourseInfoView.as_view(), name='course_info'),
]

from django.conf.urls.static import static
from django.urls import path, include

from cosmeticmeow import settings
from .views import *

url_test=[
    path('questions/<int:question_id>/', MyQuestionInfoView.as_view(), name='question'),
    # path('question/<int:lesson_id>/edit/', UpdateQuestion.as_view(), name='question_edit'),
    # path('question/add/', CreateQuestion.as_view(), name='question_add'),
    # path('answer/<int:lesson_id>/edit/', UpdateAnswer.as_view(), name='answer_edit'),
    # path('answer/add/', CreateAnswer.as_view(), name='answer_add'),
]
url_content = [
    # path('file/<int:lesson_id>/delete/', UpdateLesson.as_view(), name='file_edit'),
    # path('file/add/', CreateLesson.as_view(), name='file_add'),
    # path('tests/<int:test_id>/edit/', LessonInfoViewWithCreate.as_view(), name='test_edit'),
    # path('tests/add/', LessonInfoViewWithCreate.as_view(), name='test_add'),
    path('tests/<int:test_id>/', include(url_test)),
]
url_lessons = [
    path('lessons/<int:lesson_id>/', include(url_content)),
    path('lessons/<int:lesson_id>/', MyLessonInfoView.as_view(), name='lesson_info'),
    path('lessons/<int:lesson_id>/edit/',  UpdateLesson.as_view(), name='lesson_edit'),
    path('lessons/', LessonListView.as_view(), name='lessons_all'),
    path('lessons/add/', CreateLesson.as_view(), name='lesson_add'),
]
url_module = [
    path('modules/<int:module_id>/', include(url_lessons)),
    path('modules/<int:module_id>/edit/', UpdateModule.as_view(), name='module_edit'),
    path('modules/', ModuleListView.as_view(), name='modules_all'),
    path('modules/add/', CreateModule.as_view(), name='module_add'),
]
urlpatterns = [
    path('courses/my/', MyCourseListView.as_view(), name='course'),
    path('courses/<int:course_id>/', CourseInfoView.as_view(), name='course_info'),
    path('courses/<int:course_id>/edit/', UpdateCourse.as_view(), name='course_edit'),
    path('courses/', CourseListView.as_view(), name='courses_all'),
    path('courses/add/', CreateCourse.as_view(), name='course_add_as_product'),
    path('courses/<int:course_id>/', include(url_module)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

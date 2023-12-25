from django.conf.urls.static import static
from django.urls import path, include

from cosmeticmeow import settings
from .views import *
app_name = 'training'

url_test_student = [
    path('tests/<int:test_id>/questions/<int:question_id>', MyQuestionInfoView.as_view(), name='question')
]
# url_test_teacher=[
#     path('questions/<int:question_id>/', MyQuestionInfoView.as_view(), name='teacher_question'),
#     path('question/<int:lesson_id>/edit/', UpdateQuestion.as_view(), name='teacher_question_edit'),
#     path('question/add/', CreateQuestion.as_view(), name='teacher_question_add'),
#     path('answer/<int:lesson_id>/edit/', UpdateAnswer.as_view(), name='teacher_answer_edit'),
#     path('answer/add/', CreateAnswer.as_view(), name='teacher_answer_add'),
# ]
url_content_teacher = [
    path('file/<int:lesson_id>/delete/', UpdateLesson.as_view(), name='teacher_file_edit'),
    path('file/add/', CreateLesson.as_view(), name='teacher_file_add'),
    # path('tests/<int:test_id>/edit/', LessonInfoViewWithCreate.as_view(), name='teacher_test_edit'),
    # path('tests/add/', LessonInfoViewWithCreate.as_view(), name='teacher_test_add'),
    # path('tests/<int:test_id>/', include(url_test_teacher)),
]
url_lessons_student = [
    path('lessons/<int:lesson_id>/', include(url_test_student)),
    path('lessons/<int:lesson_id>/', MyLessonInfoView.as_view(), name='lesson_info'),
    path('lessons/', LessonListView.as_view(), name='lessons_all'),
]
url_lessons_teacher = [
    path('lessons/<int:lesson_id>/', include(url_content_teacher)),
    path('lessons/<int:lesson_id>/', TeacherLessonInfoView.as_view(), name='teacher_lesson_info'),
    path('lessons/<int:lesson_id>/edit/',  UpdateLesson.as_view(), name='teacher_lesson_edit'),
    path('lessons/<int:lesson_id>/delete/', DeleteLesson.as_view(), name='teacher_lesson_delete'),
    path('lessons/', TeacherLessonListView.as_view(), name='teacher_lessons_all'),
    path('lessons/add/', CreateLesson.as_view(), name='teacher_lesson_add'),
]
url_module_student = [
    path('modules/<int:module_id>/', include(url_lessons_student)),
    path('modules/', ModuleListView.as_view(), name='modules_all'),
]
url_module_teacher = [
    path('modules/<int:module_id>/', include(url_lessons_teacher)),
    path('modules/<int:module_id>/delete/', DeleteModule.as_view(), name='teacher_module_delete'),
    path('modules/<int:module_id>/edit/', UpdateModule.as_view(), name='teacher_module_edit'),
    path('modules', TeacherModuleListView.as_view(), name='teacher_modules_all'),
    path('modules/add', CreateModule.as_view(), name='teacher_module_add'),
]
url_courses_student = [
    path('courses/my/', MyCourseListView.as_view(), name='course_my'),
    path('courses/<int:course_id>/', CourseInfoView.as_view(), name='course_info'),
    path('courses', CourseListView.as_view(), name='courses'),
    path('courses/<int:course_id>', include(url_module_student)),
]
url_courses_teacher = [
    path('courses/<int:course_id>/archive/', ArchiveCourse.as_view(), name='teacher_course_archive'),
    path('courses/<int:course_id>/edit/', UpdateCourse.as_view(), name='teacher_course_edit'),
    path('courses/', TeacherCourseListView.as_view(), name='teacher_courses_all'),
    path('courses/add/', CreateCourse.as_view(), name='teacher_course_add'),
    path('courses/<int:course_id>/', include(url_module_teacher)),
]
urlpatterns = [
    path('', include(url_courses_student)),
    path('teacher/', include(url_courses_teacher)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

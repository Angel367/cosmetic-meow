from django.urls import path

from .views import IndexView, DevelopmentView, CustomLogoutView, CustomLoginView, CustomUserDetailsView, \
    CustomRegistrationView, LinePageView, LinePageDetailsView

app_name = 'foundation'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    # path('en', IndexView.as_view(), name='index_en'),
    path('line-page/', LinePageView.as_view(), name='line_page'),
    path('line-page/<int:pk>/', LinePageDetailsView.as_view(), name='line_page_details'),

    path('development/', DevelopmentView.as_view(), name='development'),
    path('my/', CustomUserDetailsView.as_view(), name='user_details'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('register/', CustomRegistrationView.as_view(), name='register'),
]

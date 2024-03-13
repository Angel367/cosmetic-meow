from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .views import (
    ProductViewSet,
    FullProductLineViewSet,
    UserCreateAPIView,
    FeedBackViewSet,
    UserUpdateAPIView,
    OrderViewSet,
    OrderItemViewSet
)
router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='products')
router.register(r'product_line', FullProductLineViewSet, basename='product_lines')
router.register(r'feedback', FeedBackViewSet, basename='feedback')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'order_item', OrderItemViewSet, basename='order_item')


urlpatterns = [
    path('auth/register/', UserCreateAPIView.as_view(), name='user_register'),
    path('auth/update/', UserUpdateAPIView.as_view(), name='user_update'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls))
]

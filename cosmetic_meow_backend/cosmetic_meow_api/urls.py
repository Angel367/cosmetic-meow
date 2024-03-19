from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='products')
router.register(r'product_line', FullProductLineViewSet, basename='product_lines')
router.register(r'feedback', FeedBackViewSet, basename='feedback')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'order_item', OrderItemViewSet, basename='order_item')
router.register(r'pickup_point', PickUpPointViewSet, basename='pickup_point')
router.register(r'product_partner', ProductPartnerViewSet, basename='product_partner')
router.register(r'product_code', ProductCodeViewSet, basename='product_code')


urlpatterns = [
    path('set_user_token/', SetUserTokenGetView.as_view(), name='set_user_token'),
    path('auth/register/', UserCreateAPIView.as_view(), name='user_register'),
    path('auth/update/', UserUpdateAPIView.as_view(), name='user_update'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('phone/send', PhoneSendCode.as_view(), name='phone'),
    path('phone/verify', PhoneVerifyCode.as_view(), name='phone'),
    path('', include(router.urls))
]

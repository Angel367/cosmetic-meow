from django.conf.urls.static import static
from django.urls import path, include

from cosmeticmeow import settings
from .views import *


app_name = 'shop'

url_product_manager = [
    path('products/add/', CreateProduct.as_view(), name='product_manager_add'),
]

urlpatterns = [
    path('product_manager/', include(url_product_manager)),
    path('products', ProductListView.as_view(), name='products'),
    path('products/<int:product_id>', ProductInfoView.as_view(), name='product_info_view')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.conf.urls.static import static
from django.urls import path, include

from cosmeticmeow import settings
from .views import CreateProduct, ProductListView, ProductInfoView

app_name = 'shop'

url_product_manager = [
    path('products/add/', CreateProduct.as_view(), name='product_manager_add'),
]

urlpatterns = [
    path('product_manager/', include(url_product_manager)),
    path('products', ProductListView.as_view(), name='products'),
    path('products/<int:product_id>', ProductInfoView.as_view(), name='product_info_view'),
    path('products/<int:product_id>/add', ProductInfoView.as_view(), name='product_info_add'),
    path('products/<int:product_id>/incr', ProductInfoView.as_view(), name='product_info_incr'),
    path('products/<int:product_id>/decr', ProductInfoView.as_view(), name='product_info_decr')

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

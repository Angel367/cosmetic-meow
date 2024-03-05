from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import Product



class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

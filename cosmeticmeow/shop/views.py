from django.shortcuts import render
from .models import *

# Create your views here.


def db_test():
    product = Product()
    product.save()

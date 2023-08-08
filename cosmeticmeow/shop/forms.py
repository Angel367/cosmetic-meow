from django import forms
from .models import Product, ProductImage, Category, Feedback


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        exclude = 'is_active'


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        exclude = 'is_active'


class ProductWithImageForm(forms.ModelForm):
    class Meta:
        model = ProductImage
        fields = ['product', 'image']
        field_classes = {
            'product': ProductForm
        }
        widgets = {
            'image': forms.ClearableFileInput(attrs={'multiple': True})
        }


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = "__all__"

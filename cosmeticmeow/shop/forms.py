from django import forms
from .models import *


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = [
            "text", 'sender'
        ]


class IdHiddenProductOrderedForm(forms.ModelForm):
    class Meta:
        model = OrderedProduct
        fields = ['id']
        widgets = {
            'id': forms.HiddenInput()
        }


class IdHiddenProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['id']
        widgets = {
            'id': forms.HiddenInput()
        }


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.ImageField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result


class ProductForm(forms.ModelForm):
    images = MultipleFileField()

    class Meta:
        model = Product
        fields = [
            'name',
            'short_description',
            'long_description',
            'price',
            'discountPrice',
            'categories',
            'amount',
            'images'
        ]


# class ProductWithImageForm(forms.ModelForm):
#     class Meta:
#         model = ProductImage
#         fields = ['product', 'image']
#         field_classes = {
#             'product': ProductForm
#         }
#         # widgets = {
#         #     'image': forms.ClearableFileInput(attrs={'multiple': True})
#         # }


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']


class AttributeForm(forms.ModelForm):
    class Meta:
        model = Attribute
        fields = ['name']


class AttributeValueForm(forms.ModelForm):
    class Meta:
        model = AttributeValue
        fields = ['name']

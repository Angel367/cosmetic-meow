from django import forms
from .models import Product, ProductImage, Category, Feedback, Attribute, AttributeValue, OrderedProduct


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
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


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'name',
            'short_description',
            'long_description',
            'price',
            'discountPrice',
            'categories',
            'amount'
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

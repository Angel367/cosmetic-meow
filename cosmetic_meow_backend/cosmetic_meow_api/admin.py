from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductPartner)
admin.site.register(ProductPartnerImage)
admin.site.register(ProductLine)
admin.site.register(ProductLineImage)
admin.site.register(ProductAdvantage)

admin.site.register(ProductAdvantageImage)
admin.site.register(ProductActiveSubstance)
admin.site.register(ProductActiveSubstanceImage)




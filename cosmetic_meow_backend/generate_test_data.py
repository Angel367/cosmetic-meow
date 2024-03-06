import os
import django
import random
from faker import Faker
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cosmetic_meow_backend.settings')
django.setup()

from cosmetic_meow_api.models import *

fake = Faker()


# Function to generate fake data for CustomUser model
def generate_custom_users(num_users=10):
    User = get_user_model()
    for _ in range(num_users):
        phone_number = fake.phone_number()
        middle_name = fake.first_name()
        User.objects.create(phone_number=phone_number, middle_name=middle_name)


# Function to generate fake data for BasePrice model
def generate_base_prices(num_prices=10):
    for _ in range(num_prices):
        price_value = round(random.uniform(10, 1000), 2)
        BasePrice.objects.create(price_value=price_value)


# Function to generate fake data for DiscountPrice model
def generate_discount_prices(num_discounts=10):
    for _ in range(num_discounts):
        begin_date = fake.date_this_year()
        end_date = fake.date_between(start_date=begin_date, end_date='+30d')
        price = BasePrice.objects.order_by('?').first()
        DiscountPrice.objects.create(price_value=price.price_value, begin_date=begin_date, end_date=end_date)


# Function to generate fake data for ProductClinicalTestingResult model
def generate_clinical_testing_results(num_results=10):
    for _ in range(num_results):
        description = fake.text()
        ProductClinicalTestingResult.objects.create(description=description)


# Function to generate fake data for ProductClinicalTestingResultImage model
def generate_clinical_testing_result_images(num_images=10):
    for _ in range(num_images):
        image = 'path/to/image.jpg'  # You can generate or use existing image paths
        result = ProductClinicalTestingResult.objects.order_by('?').first()
        name = fake.word()
        description = fake.text()
        ProductClinicalTestingResultImage.objects.create(image=image,
                                                         name=name,
                                                         description=description,
                                                         product_clinical_testing_result=result)


# Function to generate fake data for BasePriceHistory model
def generate_base_price_histories(num_histories=10):
    for _ in range(num_histories):
        old_price = BasePrice.objects.order_by('?').first()
        end_date = fake.date_this_year()
        BasePriceHistory.objects.create(old_price=old_price, end_date=end_date)


# Function to generate fake data for ProductPartner model
def generate_product_partners(num_partners=10):
    for _ in range(num_partners):
        name = fake.company()
        description = fake.text()
        # You need to fill in other fields and create related instances here
        ProductPartner.objects.create(name=name, description=description)


# Function to generate fake data for ProductAdvantage model
def generate_product_advantages(num_advantages=10):
    for _ in range(num_advantages):
        name = fake.word()
        description = fake.text()
        # You need to fill in other fields and create related instances here
        ProductAdvantage.objects.create(name=name, description=description)


# Function to generate fake data for ProductActiveSubstance model
def generate_product_active_substances(num_substances=10):
    for _ in range(num_substances):
        name = fake.word()
        description = fake.text()
        # You need to fill in other fields and create related instances here
        ProductActiveSubstance.objects.create(name=name, description=description)


# Function to generate fake data for ProductLine model
def generate_product_lines(num_lines=10):
    for _ in range(num_lines):
        name = fake.word()
        description = fake.text()
        ProductLine.objects.create(name=name, description=description)


# Function to generate fake data for Product model
def generate_products(num_products=10):
    for _ in range(num_products):
        name = fake.word()
        description = fake.text()
        price = BasePrice.objects.order_by('?').first()
        discount_price = DiscountPrice.objects.order_by('?').first()
        active_substances = ProductActiveSubstance.objects.order_by('?').all()[:random.randint(1, 3)]
        advantages = ProductAdvantage.objects.order_by('?').all()[:random.randint(1, 3)]
        clinical_testing_result = ProductClinicalTestingResult.objects.order_by('?').first()
        product_line = ProductLine.objects.order_by('?').first()
        short_description = fake.text()
        description_composition = fake.text()
        purpose = fake.text()
        application_method = fake.text()

        product = Product.objects.create(
            name=name,
            description=description,
            price=price,
            discount_price=discount_price,
            clinical_testing_result=clinical_testing_result,
            product_line=product_line,
            short_description=short_description,
            description_composition=description_composition,
            purpose=purpose,
            application_method=application_method
        )
        product.active_substances.set(active_substances)
        product.advantages.set(advantages)


# Call the functions to generate fake data
generate_custom_users()
generate_base_prices()
generate_discount_prices()
generate_clinical_testing_results()
generate_clinical_testing_result_images()
generate_base_price_histories()
generate_product_partners()
generate_product_advantages()
generate_product_active_substances()
generate_product_lines()
generate_products()

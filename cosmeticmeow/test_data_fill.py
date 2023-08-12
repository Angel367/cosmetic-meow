import os
from datetime import timedelta

import django
import random

from faker import Faker

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cosmeticmeow.settings")

django.setup()

fake = Faker()


def generate_users(num_users):
    for _ in range(num_users):
        first_name = fake.first_name()
        last_name = fake.last_name()
        middle_name = fake.first_name()
        email = fake.email()
        is_email_verified = fake.boolean()
        phone_number = fake.phone_number()
        is_staff = fake.boolean()

        user = CustomUser(
            first_name=first_name,
            last_name=last_name,
            middle_name=middle_name,
            email=email,
            is_email_verified=is_email_verified,
            phone_number=phone_number,
            is_staff=is_staff,

        )
        user.set_password("12345678")
        user.save()


def generate_subscribers(num_subscribers):
    for _ in range(num_subscribers):
        email = fake.email()
        is_active = fake.boolean()

        Subscriber.objects.create(
            email=email,
            is_active=is_active,
        )


def generate_categories(num_categories):
    for _ in range(num_categories):
        name = fake.word()
        Category.objects.create(name=name)


def generate_orders(num_orders):
    users = CustomUser.objects.all()

    for _ in range(num_orders):
        customer = random.choice(users)
        order_status = random.choice(OrderStatusChoices.choices)[0]
        price = round(random.uniform(10, 1000), 2)

        Order.objects.create(
            customer=customer,
            order_status=order_status,
            price=price,
        )


def generate_products(num_products):
    categories = Category.objects.all()

    for _ in range(num_products):
        name = fake.word()
        short_description = fake.sentence()
        long_description = fake.paragraph()
        price = round(random.uniform(5, 500), 2)
        is_active = fake.boolean()
        is_course = fake.boolean()
        amount = random.randint(1, 100)
        tax_rate = round(random.uniform(0.05, 0.3), 2)
        views_amount = random.randint(0, 1000)

        product = Product.objects.create(
            name=name,
            short_description=short_description,
            long_description=long_description,
            price=price,
            discountPrice=price,
            is_active=is_active,
            is_course=is_course,
            amount=amount,
            tax_rate=tax_rate,
            views_amount=views_amount,
        )

        num_categories = random.randint(1, len(categories))
        selected_categories = random.sample(list(categories), num_categories)
        product.categories.set(selected_categories)


def generate_attributes(num_attributes):
    for _ in range(num_attributes):
        name = fake.word()
        Attribute.objects.create(name=name)


def generate_attribute_values(num_values_per_attribute):
    attributes = Attribute.objects.all()

    for attribute in attributes:
        for _ in range(num_values_per_attribute):
            name = fake.word()
            AttributeValue.objects.create(
                name=name,
                attribute=attribute,
            )


def generate_price_changes(num_price_changes, products):
    for _ in range(num_price_changes):
        product = random.choice(products)
        new_price = round(random.uniform(5, 500), 2)

        PriceChange.objects.create(
            product=product,
            new_price=new_price,
        )


def generate_ordered_products(num_ordered_products, orders, products):
    for _ in range(num_ordered_products):
        order = random.choice(orders)
        product = random.choice(products)
        price = round(random.uniform(5, 500), 2)

        OrderedProduct.objects.create(
            order=order,
            product=product,
            price=price,
        )


def generate_feedbacks(num_feedbacks):
    for _ in range(num_feedbacks):
        text = fake.paragraph()
        sender = fake.email()
        is_active = fake.boolean()

        Feedback.objects.create(
            text=text,
            sender=sender,
            is_active=is_active,
        )


def generate_shipments(num_shipments, orders):
    for _ in range(num_shipments):
        order = random.choice(orders)
        track_number = fake.random_int(min=100000, max=999999)
        fix_price = round(random.uniform(5, 200), 2)

        Shipment.objects.create(
            order=order,
            track_number=str(track_number),
            fix_price=fix_price,
        )


def generate_courses(num_courses, teachers):
    for _ in range(num_courses):
        name = fake.sentence()
        short_description = fake.paragraph()
        long_description = fake.paragraphs()
        price = round(random.uniform(10, 500), 2)
        amount = random.randint(1, 100)
        tax_rate = round(random.uniform(0.05, 0.3), 2)
        views_amount = random.randint(0, 1000)
        teacher = random.choice(teachers)

        course = Course.objects.create(
            name=name,
            short_description=short_description,
            long_description='\n'.join(long_description),
            price=price,
            discountPrice=price,
            is_active=True,
            is_course=True,
            amount=amount,
            tax_rate=tax_rate,
            views_amount=views_amount,
            teacher=teacher,
        )

        num_categories = random.randint(1, 5)  # Adjust as needed
        selected_categories = random.sample(list(Category.objects.all()), num_categories)
        course.categories.set(selected_categories)


def generate_course_students(courses, students):
    for course in courses:
        num_students = random.randint(1, 3)
        selected_students = random.sample(list(students), num_students)

        for student in selected_students:
            purchase_date = fake.date_between(start_date='-6M', end_date='today')
            is_finished = fake.boolean()

            CourseStudent.objects.get_or_create(
                course=course,
                student=student,
                defaults={
                    'purchase_date': purchase_date,
                    'is_finished': is_finished,
                }
            )


def generate_modules_courses(courses):
    for course in courses:
        num_modules = random.randint(3, 10)  # Adjust as needed

        for index in range(num_modules):
            name = f"Module {index + 1}"
            description = fake.paragraph()

            Module.objects.create(
                course=course,
                name=name,
                description=description,
            )


def generate_lessons_modules(modules):
    for module in modules:
        num_lessons = random.randint(5, 15)  # Adjust as needed

        for index in range(num_lessons):
            name = f"Lesson {index + 1}"
            description = fake.paragraph()

            Lesson.objects.create(
                module=module,
                name=name,
                description=description,
            )


# def generate_student_modules(studentscourses, modules):
#     for studentcourse in studentscourses:
#
#         for module in selected_modules:
#             is_finished = fake.boolean()
#
#             StudentModule.objects.create(
#                 student=student,
#                 module=module,
#                 is_finished=is_finished,
#             )
#
#
# def generate_student_lessons(students, lessons):
#     for student in students:
#         num_lessons = random.randint(1, 15)  # Adjust as needed
#         selected_lessons = random.sample(list(lessons), num_lessons)
#
#         for lesson in selected_lessons:
#             is_finished = fake.boolean()
#
#             StudentLesson.objects.get_or_create(
#                 student=student,
#                 lesson=lesson,
#                 defaults={
#                     'is_finished': is_finished,
#                 }
#             )


def generate_tests(lessons):
    for lesson in lessons:
        duration = timedelta(minutes=random.randint(15, 60))  # Adjust as needed

        Test.objects.create(
            lesson=lesson,
            duration=duration,
        )


def generate_questions(tests):
    for test in tests:
        num_questions = random.randint(5, 10)  # Adjust as needed

        for _ in range(num_questions):
            text = fake.sentence()
            Question.objects.create(
                text=text,
                test=test
            )


def generate_answers(questions, students):
    for question in questions:
        num_answers = random.randint(1, 5)  # Adjust as needed

        for student in students:
            selected_student = student

            is_right = fake.boolean()

            Answer.objects.create(
                text=fake.paragraph(),
                question=question,


                is_right=is_right,
            )


if __name__ == "__main__":
    from foundation.models import *
    from shop.models import *
    from training.models import *

    num_users = 10
    num_orders = 10
    num_categories = 5
    num_products = 20
    num_feedbacks = 10
    num_shipments = 8
    num_attributes = 5
    num_values_per_attribute = 3
    num_price_changes = 10
    num_ordered_products = 30
    num_courses = 15
    num_course_students = 10
    num_modules_per_course = 10
    num_lessons_per_module = 15
    num_student_modules = 10
    num_student_lessons = 20
    num_tests = 5
    num_questions_per_test = 2
    num_answers_per_question = 2

    generate_users(num_users)
    generate_orders(num_orders)
    generate_categories(num_categories)
    generate_products(num_products)
    generate_feedbacks(num_feedbacks)

    generate_attributes(num_attributes)
    generate_attribute_values(num_values_per_attribute)

    products = Product.objects.all()
    orders = Order.objects.all()
    generate_shipments(num_shipments, orders)
    generate_price_changes(num_price_changes, products)
    generate_ordered_products(num_ordered_products, orders, products)

    teachers = CustomUser.objects.filter(is_staff=True)
    students = CustomUser.objects.filter(is_staff=False)

    generate_courses(num_courses, teachers)


    courses = Course.objects.all()
    generate_modules_courses(courses)

    modules = Module.objects.all()
    generate_lessons_modules(modules)

    # generate_student_modules(students, modules)

    lessons = Lesson.objects.all()
    # generate_student_lessons(students, lessons)

    tests = Test.objects.all()
    generate_tests(lessons)
    generate_course_students(Course.objects.all(), students)
    print("main part finished")
    questions = Question.objects.all()
    generate_questions(tests)
    generate_answers(questions, students)

    print("Data generation complete.")


from django.db import models
from shop.models import Product, CustomUser


class Course(Product):  # онлайн вебинары, запись или текстовые файлы и текст
    teacher = models.ForeignKey(CustomUser, on_delete=models.PROTECT, null=True)

    def save(self, *args, **kwargs):
        self.is_course = True
        super(Course, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "курс"
        verbose_name_plural = "курсы"
        ordering = ["-id"]


class CourseStudent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)
    is_finished = models.BooleanField(blank=True, default=False)

    def save(self, *args, **kwargs):
        modules = Module.objects.filter(course=self.course)
        for module in modules:
            StudentModule.objects.get_or_create(student=self.student, module=module)
        super(CourseStudent, self).save(*args, **kwargs)

    def set_finished(self):
        if (StudentModule.objects.filter(module__course=self.course, is_finished=True).count() ==
                Module.objects.filter(course=self.course).count()):
            self.is_finished = True
            self.save()
        return self.is_finished

    def status(self):
        return 100 * StudentModule.objects.filter(course=self.course, is_finished=True).count() \
            / StudentModule.objects.filter(course=self.course).count()

    class Meta:
        verbose_name = "курс для пользователя"
        verbose_name_plural = "курсы для пользователей"
        ordering = ["-purchase_date"]
        unique_together = ('course', 'student')


#     status прохождения:
#     is not started 0 уроков закончено
#     finished for x% ??? n finished_lesson / n all
#     finished successful n finished_lesson = n all
#     # время доступа :
#       forever! or date_of_end_subscr(на будущ)


class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    id_in_course = models.IntegerField(blank=True)

    def save(self, *args, **kwargs):
        _id = Module.objects.filter(course=self.course).__len__()
        self.id_in_course = _id + 1
        super(Module, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "тема"
        verbose_name_plural = "темы"
        ordering = ["course", "id_in_course"]


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    id_in_module = models.IntegerField(blank=True)

    def save(self, *args, **kwargs):
        _id = Lesson.objects.filter(module=self.module).__len__()
        self.id_in_module = _id + 1
        super(Lesson, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "урок"
        verbose_name_plural = "уроки"
        ordering = ["module", "id_in_module"]


class StudentModule(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    is_finished = models.BooleanField(blank=True, default=False)

    def set_finished(self):
        lesson_last = Lesson.objects.get(module=self.module,
                                            id_in_module=Lesson.objects
                                            .filter(module=self.module).count())
        if StudentLesson.objects.get(student=self.student, lesson=lesson_last).is_finished:
            self.is_finished = True
            self.save()
        return self.is_finished

    def get_next_module_id(self):
        if self.module.id_in_course >= Module.objects.filter(course=self.module.course).count():
            CourseStudent.objects.filter(course=self.module.course, student=self.student).first().set_finished()
            return None
        else:
            return Module.objects.get(course=self.module.course,
                                      id_in_course=self.module.id_in_course + 1).id

    def save(self, *args, **kwargs):
        lessons = Lesson.objects.filter(module=self.module)
        for lesson in lessons:
            StudentLesson.objects.get_or_create(student=self.student, lesson=lesson)
        super(StudentModule, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "тема студента"
        verbose_name_plural = "темы студентов"
        unique_together = ('module', 'student')


class StudentLesson(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_finished = models.BooleanField(blank=True, default=False)

    def set_finished(self):
        test = Test.objects.filter(lesson=self.lesson).first()
        if not StudentTest.objects.get(student=self.student, test=test) \
                or StudentTest.objects.get(student=self.student, test=test).is_test_right():
            self.is_finished = True
            self.save()
        return self.is_finished

    def get_next_lesson_id(self):
        if self.lesson.id_in_module >= Lesson.objects.filter(module=self.lesson.module).count():
            StudentModule.objects.get(module=self.lesson.module, student=self.student).set_finished()
            return None
        else:
            return Lesson.objects.get(module=self.lesson.module,
                                      id_in_module=self.lesson.id_in_module + 1).id

    def save(self, *args, **kwargs):
        test = Test.objects.get(lesson=self.lesson)
        StudentTest.objects.get_or_create(student=self.student, test=test)
        super(StudentLesson, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "урок студента"
        verbose_name_plural = "уроки студентов"
        unique_together = ('lesson', 'student')


class ContentFile(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    file = models.FileField(upload_to='training/content_files')

    class Meta:
        verbose_name = "файл контента"
        verbose_name_plural = "файлы контента"
        ordering = ["-id"]


# кол-во тестов в курсе? 1, 0 или больше
class Test(models.Model):
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE)
    duration = models.DurationField()
    quantityOfRightForFinish = models.IntegerField(default=0)

    class Meta:
        verbose_name = "тест"
        verbose_name_plural = "тесты"
        ordering = ["-id"]


class StudentTest(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    def is_test_right(self):
        return self.test.quantityOfRightForFinish <= StudentAnswer.objects.filter(student=self.student,
                                                                                 answer__question__test=self.test,
                                                                                 answer__is_right=True).count()

    class Meta:
        verbose_name = "тест студента"
        verbose_name_plural = "тесты студентов"
        unique_together = ('test', 'student')


class Question(models.Model):
    text = models.TextField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "вопрос"
        verbose_name_plural = "вопросы"
        ordering = ["-id"]


# типы вопросов? radio, ответы задаются преподом


class Answer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_right = models.BooleanField(default=False)

    class Meta:
        verbose_name = "ответ"
        verbose_name_plural = "ответы"
        ordering = ["question", "-id"]


class StudentAnswer(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time_saved = models.DateTimeField(auto_now_add=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    def is_right(self):
        return self.answer.is_right

    class Meta:
        verbose_name = "ответ студента"
        verbose_name_plural = "ответы студентов"
        ordering = ["-id"]
# TODO certificate class (form certificate by templatetext, templateimg, db user_data
# TODO course is_bought in all courses
# for example by tuple (id, is_bought
# TODO access to only first not finished lesson and all finished
# TODO file and test view
# test duration..? 
# TODO adding into basket
# TODO crud-action for teacher


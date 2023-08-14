import threading

from PIL import Image, ImageDraw, ImageFont
from django.db import models

from foundation.models import CustomUser
from shop.models import Product


class Course(Product):  # онлайн вебинары, запись или текстовые файлы и текст
    teacher = models.ForeignKey(CustomUser, on_delete=models.PROTECT, null=True)

    def save(self, *args, **kwargs):
        self.is_course = True
        super(Course, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "курс"
        verbose_name_plural = "курсы"
        ordering = ["id"]


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
            Certificate.objects.get_or_create(course_student=self)
            self.save()
        return self.is_finished

    def status(self):
        return int(100 * StudentLesson.objects.filter(student=self.student,
                                                      lesson__module__course=self.course,
                                                      is_finished=True).count() \
                   / StudentLesson.objects.filter(student=self.student,
                                                  lesson__module__course=self.course).count())

    class Meta:
        verbose_name = "курс для пользователя"
        verbose_name_plural = "курсы для пользователей"
        ordering = ["purchase_date"]
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

    def get_first_not_finished(self):
        module = StudentModule.objects.filter(student=self.student, module__course=self.module.course,
                                              module__id_in_course=1).first()
        while module.is_finished:
            module = StudentModule.objects.filter(student=self.student, module=module.get_next_module()).first()
            if not module:
                return None
        return module.module

    def set_finished(self):
        if (StudentLesson.objects.filter(lesson__module=self.module, is_finished=True).count() ==
                Lesson.objects.filter(module=self.module).count()):
            self.is_finished = True
            self.save()
        return self.is_finished

    def get_next_module(self):
        if self.module.id_in_course >= Module.objects.filter(course=self.module.course).count():
            # CourseStudent.objects.filter(course=self.module.course, student=self.student).first().set_finished()
            return None
        else:
            return Module.objects.get(course=self.module.course,
                                      id_in_course=self.module.id_in_course + 1)

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

    def get_first_not_finished(self):
        lesson = StudentLesson.objects.filter(student=self.student, lesson__module=self.lesson.module,
                                              lesson__id_in_module=1).first()
        while lesson.is_finished:
            # print("\n\n", lesson.id, "\n\n")
            lesson = StudentLesson.objects.filter(student=self.student, lesson=lesson.get_next_lesson()).first()
            if not lesson:
                return None
        return lesson.lesson

    def set_finished(self):
        test = Test.objects.filter(lesson=self.lesson).first()
        student_test = StudentTest.objects.filter(student=self.student, test=test).first()
        if not test or student_test and student_test.is_finished:
            self.is_finished = True
            self.save()
        return self.is_finished

    def get_next_lesson(self):
        if self.lesson.id_in_module >= Lesson.objects.filter(module=self.lesson.module).count():
            # StudentModule.objects.get(module=self.lesson.module, student=self.student).set_finished()
            return None
        else:
            return Lesson.objects.get(module=self.lesson.module,
                                      id_in_module=self.lesson.id_in_module + 1)

    def save(self, *args, **kwargs):
        super(StudentLesson, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "урок студента"
        verbose_name_plural = "уроки студентов"
        unique_together = ('lesson', 'student')


class ContentFile(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    file = models.FileField(upload_to='training/content_files')

    def save(self, *args, **kwargs):
        self.file.name = self.name()
        super(self, ContentFile).save(*args, **kwargs)

    def name(self):
        return (self.lesson.id.__str__() + "_" +
                self.id.__str__() + "_" +
                self.file.name.__str__())

    def path(self):
        return 'training/content_files/'

    def get_absolute_file_upload_url(self):
        return '/media/' + self.path() + self.name()

    class Meta:
        verbose_name = "файл контента"
        verbose_name_plural = "файлы контента"
        ordering = ["id"]


# кол-во тестов в курсе? 1, 0 или больше
class Test(models.Model):
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE)
    duration = models.DurationField()
    quantityOfRightForFinish = models.IntegerField(default=0)

    class Meta:
        verbose_name = "тест"
        verbose_name_plural = "тесты"
        ordering = ["id"]


class StudentTest(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    is_finished = models.BooleanField(default=False)
    time_start = models.DateTimeField(auto_now_add=True)

    def test_time_start(self):
        if not self.is_finished:
            timer = threading.Timer(self.test.duration, self.is_test_right)

    def is_test_right(self):
        is_right = (StudentAnswer.objects.filter(student=self.student, answer__question__test=self.test,
                                                 answer__is_right=True).exists()
                    and self.test.quantityOfRightForFinish <= StudentAnswer.objects.filter(student=self.student,
                                                                                           answer__question__test=self.test,
                                                                                           answer__is_right=True).count())
        if not is_right:
            self.delete()
        self.is_finished = True
        self.save()
        StudentAnswer.objects.filter(student=self.student, answer__question__test=self.test).delete()

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
        ordering = ["id"]


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


class Certificate(models.Model):
    course_student = models.ForeignKey(CourseStudent, on_delete=models.PROTECT)
    file = models.FileField(null=True, blank=True, upload_to="training/certificates/")

    def name(self):
        return self.course_student.id.__str__() + '.png'

    def path(self):
        return 'training/certificates/'

    def get_absolute_file_upload_url(self):
        return '/media/' + self.path() + self.name()

    def save(self, *args, **kwargs):
        txt = open('media/' + self.path() + 'template/text.txt', "r", encoding="utf8").read()

        im = Image.open('media/' + self.path() + 'template/img.png')
        txt = txt.replace("ИМЯ_ФАМИЛИЯ_ОТЧЕСТВО", self.course_student.student.full_name)
        txt = txt.replace("НАЗВАНИЕ_КУРС", self.course_student.course.name)
        font = ImageFont.truetype(
            "media/training/dejavu-fonts-ttf-2.37/ttf/DejaVuSans.ttf",
            size=25,
            encoding='UTF-8',
        )
        draw_text = ImageDraw.Draw(im)
        draw_text.multiline_text(xy=(100, 400), text=u'%s' % txt, font=font, fill="black")
        self.file.name = self.name()
        im.save('media/' + self.path() + self.name())
        super(Certificate, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "сертификат"
        verbose_name_plural = "сертификаты"
        ordering = ["id"]

# TODO testing add timer with redirect, test with  quantity of right
# TODO add img into course
# TODO crud-action for teacher
# TODO adding into basket -- egor

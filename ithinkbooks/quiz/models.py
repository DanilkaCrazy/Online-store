from django.db import models
from users.models import User
from catalogue.models import Products
from django_better_admin_arrayfield.models.fields import ArrayField

# Create your models here.
#Тест для роадмапа
class Quiz(models.Model):
    name = models.CharField(max_length=120, verbose_name='Название теста')
    quiz_theme = models.CharField(max_length=120, verbose_name='Тема теста')

    class Meta:
        db_table = 'quiz'
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'

    def __str__(self):
        return self.name

class Question(models.Model):
    text = models.TextField(max_length=300, verbose_name='Текст вопроса')
    quiz = models.ForeignKey(Quiz, related_name='question' , on_delete=models.DO_NOTHING ,verbose_name='Тест')
    class QuestionType(models.TextChoices):
        THEME = 'Theme Question' #Выбор темы
        LEVEL = 'Level Question' #Вопрос об уровне знаний
        LANGUAGE = 'Language Question' #Вопрос о языке (настоящем языке)
        PRICE = 'Price Question' #Вопрос о цене
        PROG_BEFORE = 'Programmed Before' #Программировали ли ранее
        PROG_LANG = 'Programming Language Question' #Язык программирования
        THEME_SPECIFIC = 'Theme Specific Question' # Что конкретно интересно в данной теме
        LEVEL_SPECIFIC = 'Specific Level Question' #Вопрос об уровне знаний в определенной теме
        THEME_FOR_OTHER = 'Theme for Other' #Выбор темы для других
        OTHER = 'Other'
    question_type = models.TextField(choices=QuestionType, default=QuestionType.THEME, verbose_name='Тип вопроса')
    class Meta:
        db_table = 'question'
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

    def __str__(self):
        return self.text
    
    def get_answers(self):
        return self.answer_set.all()

class Answer(models.Model):
    text = models.TextField(max_length=120, verbose_name='Текст ответа')
    question = models.ForeignKey(Question, related_name='answer', on_delete=models.DO_NOTHING, verbose_name='Вопрос')
    answer_value = models.TextField(verbose_name='Значение вопроса')
    class Meta:
        db_table = 'answer'
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'

    def __str__(self):
        return self.text

class Result(models.Model):
    theme = models.TextField(verbose_name='Тема') #Тема - определяем, будущие вопросы
    level = models.TextField(verbose_name='Уровень знаний') #Определяем уровень знаний
    language = models.TextField(verbose_name='Язык') #Фильтруем по языку - выдаем книги только на этом языке
    price = models.TextField(verbose_name='Цена') #Фильтруем по цене выдаём книги только ниже заданной цены
    programmed_before = models.TextField(verbose_name='Программировал ранее') #Если нет, то понижаем уровень
    prog_lang = models.TextField(verbose_name='Язык программирования') #Фильтруем книги по языку программирования
    theme_specific = models.TextField(verbose_name='Подтема') #Что конкретно в теме интересует
    #theme_specific = ArrayField(models.TextField(verbose_name='Подтема'), verbose_name = 'Подтемы') #Что конкретно в теме интересует
    level_specific = models.TextField(verbose_name='Уровень(для категории)') #Фильтруем книги по уровную знания темы
    theme_other = models.TextField(verbose_name='Тема(другое)', null=True, blank=True) #Тема для другого
    user = models.ForeignKey(User, related_name='user_result', on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name='result', on_delete=models.DO_NOTHING, verbose_name='Тест')
    class Meta:
        db_table = 'result'
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'

class Roadmap(models.Model):
    title = models.TextField(max_length=150, verbose_name='Заголовок')
    user = models.ForeignKey(User, related_name='roadmap_user', on_delete=models.CASCADE)
    result = models.ForeignKey(Result, related_name='result', on_delete=models.CASCADE) #Результат теста, на котором основан роадмап

class RoadmapNode(models.Model):
    roadmap = models.ForeignKey(Roadmap, related_name='node', on_delete=models.CASCADE) #Роадмап
    product = models.ManyToManyField(Products, related_name='roadmap_book') #Книга (Может быть несколько)
    node_level = models.IntegerField(verbose_name='Уровень узла') #Определяет позицию в роадмапе
    class Meta:
        ordering = ['node_level', 'pk']

class ObjectCount(models.Model):
    object_count = models.IntegerField(verbose_name='Кол-во объектов') #Тест - сколько объектов после фильтровки
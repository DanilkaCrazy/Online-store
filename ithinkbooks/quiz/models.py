from django.db import models

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
    text = models.TextField(max_length=120, verbose_name='Текст вопроса')
    quiz = models.ForeignKey(Quiz, related_name='question' , on_delete=models.CASCADE ,verbose_name='Тест')
    class QuestionType(models.TextChoices):
        THEME = 'Theme Question' #Выбор темы
        LEVEL = 'Level Question' #Вопрос об уровне знаний
        LANGUAGE = 'Language Question' #Вопрос о языке
        PRICE = 'Price Question' #Вопрос о цене
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
    question = models.ForeignKey(Question, related_name='answer', on_delete=models.CASCADE, verbose_name='Вопрос')
    answer_value = models.IntegerField(verbose_name='Значение вопроса')
    class Meta:
        db_table = 'answer'
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'

    def __str__(self):
        return self.text

class Result(models.Model):
    theme = models.TextField(verbose_name='Тема')
    level = models.TextField(verbose_name='Уровень знаний')
    language = models.TextField(verbose_name='Язык')
    price = models.TextField(verbose_name='Цена')
    #question = models.ForeignKey(Question, related_name='result', on_delete=models.DO_NOTHING, verbose_name='Результат')
    quiz = models.ForeignKey(Quiz, related_name='result', on_delete=models.DO_NOTHING, verbose_name='Результат')
    class Meta:
        db_table = 'result'
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'
from django.db import models

# Create your models here.
#Тест для роадмапа
class Quiz(models.Model):
    name = models.CharField(max_length=120, verbose_name='Название теста')
    quiz_theme = models.CharField(max_length=120, verbose_name='Тема теста')
    number_of_questions = models.IntegerField(verbose_name='Количество вопросов')

    class Meta:
        db_table = 'quiz'
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'

    def __str__(self):
        return self.name

class Question(models.Model):
    text = models.TextField(max_length=120, verbose_name='Текст вопроса')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE ,verbose_name='Тест')
    #Тип вопроса

    class Meta:
        db_table = 'question'
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

    def __str__(self):
        return self.text

class Answer(models.Model):
    text = models.TextField(max_length=120, verbose_name='Текст ответа')
    question = models.ForeignKey(Question, verbose_name='Вопрос')

    class Meta:
        db_table = 'answer'
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'

    def __str__(self):
        return self.text

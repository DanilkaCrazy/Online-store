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
    text = models.TextField(max_length=300, verbose_name='Текст вопроса')
    quiz = models.ForeignKey(Quiz, related_name='question' , on_delete=models.DO_NOTHING ,verbose_name='Тест')
    class QuestionType(models.TextChoices):
        THEME = 'Theme Question' #Выбор темы
        LEVEL = 'Level Question' #Вопрос об уровне знаний
        LANGUAGE = 'Language Question' #Вопрос о языке (настоящем языке)
        PRICE = 'Price Question' #Вопрос о цене
        PROG_BEFORE = 'Programmed Before' #Программировали ли ранее
        PROG_LANG = 'Programming Language Question'
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
    #question = models.ForeignKey(Question, related_name='result', on_delete=models.DO_NOTHING, verbose_name='Результат')
    quiz = models.ForeignKey(Quiz, related_name='result', on_delete=models.DO_NOTHING, verbose_name='Результат')
    class Meta:
        db_table = 'result'
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'
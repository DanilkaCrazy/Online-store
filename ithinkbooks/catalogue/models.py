from django.db import models
from django.utils.translation import gettext as _

# Create your models here.
#Категории книг
class Categories(models.Model):
    name = models.CharField(max_length = 150, unique=True, verbose_name='Категория')
    description = models.TextField(max_length = 200, verbose_name='Описание категории')
    slug = models.SlugField(max_length = 150, unique=True, blank=True, null=True, verbose_name='URL')

    class Meta:
        db_table = 'category'
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

#Книга
class Products(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    author = models.CharField(max_length=150, null=True, verbose_name='Автор')
    publisher = models.CharField(max_length=150, null=True, verbose_name='Издательство')
    isbn = models.CharField(max_length=100, null=True, verbose_name='ISBN')
    year = models.IntegerField(null=True, verbose_name='Год')
    number_of_pages = models.IntegerField( null=True, verbose_name='Количество страниц')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    #image = models.ImageField(upload_to='catalogue_images', blank=True, null=True, verbose_name='Изображение')
    price = models.DecimalField(default=0.00, max_digits=7, decimal_places=2, verbose_name='Цена')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    #Типы книг
    class BookTheme(models.TextChoices):
        FRONTEND = "frontend","Frontend"
        BACKEND = "backend","Backend"
        DESIGN = "design","Дизайн"
        GAMEDEV = "gamedev","Gamedev"
        ANALYTICS = "analytics", "Analytics"
        AI = "ai", "AI"
        DATASCIENCE = "data", "Data Science"
        DEVOPS = "devops", "DevOps"
        QA = "qa", "Quality Assurance"
        COMPSCI = "CS","Computer Science" #Разбить на несколько
        OTHER = "OT","Other"
    class ProgrammingLanguage(models.TextChoices):
        JAVASCRIPT = "JavaScript"
        JAVA = "Java"
        PYTHON = "Python"
        CSHARP = "C#"
        CLANGUAGE = "C"
        CPLUS = "C++"
        SQL = "SQL"
        OTHER = "OT","Other"
    book_theme = models.CharField(max_length=30, choices=BookTheme, default = BookTheme.OTHER, verbose_name='Темы')
    programming_language = models.CharField(max_length=30, choices = ProgrammingLanguage, default = ProgrammingLanguage.OTHER, verbose_name='Язык программирования')
    #Типы переплета
    class BookBinding(models.TextChoices):
        SOFTCOVER = "Мягкий переплет"
        HARDCOVER = "Твердый переплет"
    #Выбор переплета
    book_bindings = models.CharField(max_length=30, choices = BookBinding, default = BookBinding.SOFTCOVER,verbose_name='Переплёт')
    #Перевод
    class Translator(models.TextChoices):
        TRANSLATE = "Имя переводчика"
        NOTRANSLATE = "Отсутствует"
    #Выбор перевода
    translator_choice = models.CharField (max_length=30, choices = Translator, default=Translator.TRANSLATE, verbose_name='Переводчик')
    #Уровень книги - для роадмапа
    level = models.IntegerField(default=1, verbose_name='Уровень книги')
    class Meta:
        db_table = 'book'
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def __str__(self):
        return self.name

#Звезды отзыва
class RatingStar(models.Model):
    #star_value = models.SmallIntegerField(default=0, verbose_name='Звезда рейтинга')
    star_value = models.DecimalField(default=0, verbose_name='Звезда рейтинга', max_digits=2, decimal_places=1)
    def __str__(self):
        return f"{self.star_value}"
    class Meta:
        db_table = 'rating_star'
        verbose_name = 'Звезда рейтинга'
        verbose_name_plural = 'Звёзды рейтинга'

#Отзыв 
class Review(models.Model):
    #В будущем добавить связь с пользователем (аватарки и роль)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='review')
    title = models.TextField(max_length=100, verbose_name = 'Заголовок отзыва')
    text = models.TextField( max_length=5000, verbose_name = 'Текст отзыва')
    star = models.ForeignKey(RatingStar, on_delete=models.CASCADE, verbose_name='Звезда', related_name='review')
    #Реализовать Upvote/Downvote
    class Meta:
        db_table = 'review'
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
    
    def __str__(self):
        return f"{self.title} - {self.product}"
    
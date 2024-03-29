from django.db import models
from django.utils.translation import gettext as _
from multiselectfield import MultiSelectField

# Create your models here.
#Категории книг
class Categories(models.Model):
    name = models.CharField(max_length = 150, unique=True, verbose_name='Категория')
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
    year = models.IntegerField(null=True, verbose_name='Год')
    number_of_pages = models.IntegerField( null=True, verbose_name='Количество страниц')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    #image = models.ImageField(upload_to='catalogue_images', blank=True, null=True, verbose_name='Изображение')
    price = models.DecimalField(default=0.00, max_digits=7, decimal_places=2, verbose_name='Цена')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    #Типы книг
    class BookTypes(models.TextChoices): #Переделать позже, может очень просто совпадать
        FRONTEND = "FE","Frontend"
        BACKEND = "BE","Backend"
        DESIGN = "DE","Дизайн"
        GAMEDEV = "GD","Gamedev"
        COMPSCI = "CS","Computer Science" #Разбить на несколько
        JAVASCRIPT = "JS","JavaScript"
        JAVA = "J","Java"
        PYTHON = "PY","Python"
        CSHARP = "C#","C#"
        CLANGUAGE = "C","C"
        CPLUS = "C++","C++"
        SQL = "SQL","SQL"
        OTHER = "OT","Другое"
    #Тип книги, максимум четыре типа
    book_type = MultiSelectField( max_length=20, choices=BookTypes, max_choices = 4, default=BookTypes.FRONTEND,verbose_name='Темы')
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
    class Meta:
        db_table = 'book'
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def __str__(self):
        return self.name

#Отзыв 
class Review(models.Model):
    #В будущем добавить связь с пользователем
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='review')
    title = models.TextField("Заголовок отзыва", max_length=100)
    text = models.TextField("Текст отзыва", max_length=5000)
    class Meta:
        db_table = 'review'
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
    
    def __str__(self):
        return f"{self.name} - {self.movie}"
    
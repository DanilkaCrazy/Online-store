from django.db import models
from multiselectfield import MultiSelectField

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    author = models.CharField(max_length=150, null=True, verbose_name='Автор')
    publisher = models.CharField(max_length=150, null=True, verbose_name='Издательство')
    year = models.IntegerField(max_length=4, null=True, verbose_name='Год')
    number_of_pages = models.IntegerField(max_length=10, null=True, verbose_name='Количество страниц')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    image = models.ImageField(upload_to='catalogue_images', blank=True, null=True, verbose_name='Изображение')
    price = models.DecimalField(default=0.00, max_digits=7, decimal_places=2, verbose_name='Цена')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    #Типы книг
    class BookTypes(models.TextChoices): #Переделать позже, может очень просто совпадать
        FRONTEND = "FE",_("Frontend")
        BACKEND = "BE",_("Backend")
        DESIGN = "DE",_("Дизайн")
        GAMEDEV = "GD",_("Gamedev")
        JAVASCRIPT = "JS",_("JavaScript")
        PYTHON = "PY",_("Python")
        CLANGUAGE = "CL",_("C")
    #Тип книги, максимум четыре типа
    book_type = MultiSelectField( max_length=6, choices=BookTypes, max_choices = 4 ,default=BookTypes.FRONTEND,verbose_name='Темы')

    #Типы переплета
    class BookBinding(models.TextChoices):
        SOFTCOVER = "Мягкий переплет"
        HARDCOVER = "Твердый переплет"
    #Выбор переплета
    book_bindings = models.CharField(max_length=30, choices = BookBinding, default = BookBinding.SOFTCOVER,verbose_name='Переплёт')
    #Перевод
    class Translator(models.TextChoices):
        TRANSLATE = "Переводчик"
        NOTRANSLATE = "Нет переводчика"
    #Выбор перевода
    translator_choice = models.CharField (max_length=30, choices = Translator, default=Translator.TRANSLATE, verbose_name='Переводчик')
    class Meta:
        db_table = 'product'
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return f'{self.name} Количество - {self.quantity}'
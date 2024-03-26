from django.contrib import admin
from django.apps import AppConfig
from catalogue.models import Products

# Register your models here.
admin.site.register(Products)
class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'book'
    verbose_name = 'Книга'
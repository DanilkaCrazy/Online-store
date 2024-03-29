from django.contrib import admin
from django.apps import AppConfig
from catalogue.models import Products, Categories, Review, RatingStar

# Register your models here.
@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name',)}

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name',)}

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    prepopulated_fields = {}

@admin.register(RatingStar)
class RatingStarAdmin(admin.ModelAdmin):
    prepopulated_fields = {}
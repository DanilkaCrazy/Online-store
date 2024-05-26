from django.contrib import admin
from django.apps import AppConfig
from catalogue.models import Products, Categories, Review, RatingStar, Favorite
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

# Register your models here.
@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name',)}

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin, DynamicArrayMixin):
    prepopulated_fields = {'slug':('name',)}

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    prepopulated_fields = {}

@admin.register(RatingStar)
class RatingStarAdmin(admin.ModelAdmin):
    prepopulated_fields = {}

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    prepopulated_fields = {}
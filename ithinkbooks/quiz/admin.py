from django.contrib import admin
from django.apps import AppConfig
from catalogue.models import Products, Categories, Review, RatingStar
from quiz.models import Quiz, Question, Answer, AnswerPrice

# Register your models here.
class QuestionInline(admin.TabularInline):
    model = Question
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    prepopulated_fields = {}

class AnswerInline(admin.TabularInline):
    model = Answer

class AnswerPriceInline(admin.TabularInline):
    model = AnswerPrice

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline, AnswerPriceInline]
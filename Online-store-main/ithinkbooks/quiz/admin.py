from django.contrib import admin
from django.apps import AppConfig
from catalogue.models import Products, Categories, Review, RatingStar
from quiz.models import Quiz, Question, Answer, Result

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

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    prepopulated_fields = {}
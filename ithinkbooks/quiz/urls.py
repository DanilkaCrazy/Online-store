from django.urls import path
from quiz.views import QuizListView, QuestionListView

app_name = 'quiz'
urlpatterns = [
    path('/', QuizListView.as_view()),
    path('/questions', QuestionListView.as_view())
]

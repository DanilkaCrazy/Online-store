from django.urls import path
from quiz.views import QuizListView, QuestionListView, QuestionView

app_name = 'quiz'
urlpatterns = [
    path('', QuizListView.as_view()),
    path('questions', QuestionListView.as_view()),
    path('questions/<int:question_id>/', QuestionView.as_view())
]

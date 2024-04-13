from django.urls import path
from quiz.views import QuizListView, QuestionListView, QuestionView, SendResults, SendResultsFull

app_name = 'quiz'
urlpatterns = [
    path('', QuizListView.as_view()),
    path('questions', QuestionListView.as_view()),
    path('questions/<int:question_id>/', QuestionView.as_view()),
    path('questions/<int:question_id>/vote', SendResults.as_view()),
    path('quizes/<int:quiz_id>/vote', SendResultsFull.as_view()),
]

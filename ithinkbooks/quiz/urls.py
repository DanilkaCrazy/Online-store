from django.urls import path
from quiz.views import QuizListView, QuestionListView, QuestionView, SendResultsFull, ViewResults,ViewProductsBasedOnResult, GetRoadMap, RoadmapListView, RoadMapUserView

app_name = 'quiz'
urlpatterns = [
    path('', QuizListView.as_view()),
    path('questions', QuestionListView.as_view()),
    path('questions/<int:question_id>/', QuestionView.as_view()),
    path('quizes/<int:quiz_id>/vote', SendResultsFull.as_view()),
    path('results', ViewResults.as_view()),
    path('results/<int:result_id>', ViewProductsBasedOnResult.as_view()),
    path('roadmap/<int:roadmap_id>', GetRoadMap.as_view()),
    path('roadmaps', RoadmapListView.as_view()),
    path('user_roadmaps', RoadMapUserView.as_view(), name = 'User Roadmaps'),
]

from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from quiz.models import Quiz, Question, Answer
from rest_framework import permissions
from rest_framework.response import Response
from quiz.serializers import QuizSerializer, QuestionSerializer
# Create your views here.
#Просмотр всех книг
class QuizListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = None

#Просмотр одной книги по её Id
class QuestionListView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from quiz.models import Quiz, Question, Answer, Result
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

#Отправка теста
#class CreateResultView(APIView):
    #def post(self, request):
        #data = request.data
        #serializer = QuizSerializer(data)
        
        #if review.is_valid():
         #   review.save()
        #return Response(status=201) 

class QuestionView(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
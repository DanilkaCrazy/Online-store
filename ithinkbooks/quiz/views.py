from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from quiz.models import Quiz, Question, Answer, Result
from rest_framework import permissions
from rest_framework.response import Response
from quiz.serializers import QuizSerializer, QuestionSerializer, VoteSerializer
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
    def get(self, request, question_id):
        questions = get_object_or_404(Question, pk = question_id)
        serializer = QuestionSerializer(questions)
        return Response(serializer.data)

class SendResults(APIView):
    def post(self, request, question_id):
        question = get_object_or_404(Question, pk=question_id)
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            answer = get_object_or_404(Answer, pk = serializer.validated_data['answer_id'], question=question)
            result = Result.objects.create(question=question, level=answer.answer_value)
            return Response("Success")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
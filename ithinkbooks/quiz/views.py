from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from quiz.models import Quiz, Question, Answer, Result
from rest_framework import permissions
from rest_framework.response import Response
from quiz.serializers import QuizSerializer, QuestionSerializer, VoteSerializer, FullVoteSerializer, ResultSerializer
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

class QuestionView(APIView):
    def get(self, request, question_id):
        questions = get_object_or_404(Question, pk = question_id)
        serializer = QuestionSerializer(questions)
        return Response(serializer.data)

class SendResultsFull(APIView):
    def post(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, pk=quiz_id)
        serializer = FullVoteSerializer(data=request.data, many=True)
        theme_val = ''
        level_val = ''
        lang_val = ''
        price_val = ''
        prog_bef_val = ''
        if serializer.is_valid():
            for quiz_dict in serializer.validated_data:
                question = get_object_or_404(Question, pk = quiz_dict['question_id'], quiz=quiz)
                answer = get_object_or_404(Answer, pk = quiz_dict['answer_id'], question=question)
                if (question.question_type == 'Theme Question'):
                    theme_val = answer.answer_value
                if (question.question_type == "Level Question"):
                    level_val = answer.answer_value
                if (question.question_type == "Language Question"):
                    lang_val = answer.answer_value
                if (question.question_type == "Price Question"):
                    price_val = answer.answer_value
                if (question.question_type == "Programmed Before"):
                    prog_bef_val = answer.answer_value
            #if prog_before ==1, answer_value-=1
            result = Result.objects.create(quiz=quiz, theme=theme_val, level = level_val, language=lang_val, price=price_val, programmed_before=prog_bef_val, user=request.user)
            return Response("Success")
        return Response(serializer.errors)


class ViewResults(APIView):
    def get(self, request):
        results = Result.objects.all()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
from rest_framework import serializers
from quiz.models import Quiz, Question, Answer

class QuizSerializer (serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text', 'answer_value',]

class QuestionSerializer (serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['text', 'question_type', 'answer',]
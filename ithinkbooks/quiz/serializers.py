from rest_framework import serializers
from quiz.models import Quiz, Question, Answer, Result, Roadmap, RoadmapNode

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'answer_value',]

class QuestionSerializer (serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'text', 'question_type', 'answer',]

class QuizSerializer (serializers.ModelSerializer):
    question = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'name', 'quiz_theme', 'question']

class VoteSerializer(serializers.Serializer):
    answer_id = serializers.IntegerField()

class FullVoteSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    answer_id = serializers.IntegerField()

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

class RoadmapNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapNode
        fields = '__all__'

class RoadmapSerializer(serializers.ModelSerializer):
    node = RoadmapNodeSerializer(many=True)
    class Meta:
        model = Roadmap
        fields = ['title', 'user', 'node']
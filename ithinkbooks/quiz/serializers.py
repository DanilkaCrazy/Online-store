from rest_framework import serializers
from quiz.models import Quiz, Question, Answer, Result, Roadmap, RoadmapNode
from catalogue.models import Products
from catalogue.serializers import ProductsSerializer, CreateReviewSerializer

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

class RoadmapProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class RoadmapNodeSerializer(serializers.ModelSerializer):
    product = RoadmapProductSerializer(many=True)
    class Meta:
        model = RoadmapNode
        fields = ['node_level', 'roadmap', 'product']

class RoadmapSerializer(serializers.ModelSerializer):
    node = RoadmapNodeSerializer(many=True)
    class Meta:
        model = Roadmap
        fields = '__all__'
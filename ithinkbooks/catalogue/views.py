from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from catalogue.models import Categories, Products
from rest_framework import permissions
from rest_framework.response import Response
from catalogue.serializers import ProductsSerializer, CategoriesSerializer, CreateReviewSerializer
# Create your views here.
#Просмотр всех книг
class ProductsListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    pagination_class = None

#Просмотр одной книги по её Id
class ProductView(RetrieveAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

#Создание отзыва
class CreateReviewView(APIView):
    def post(self, request):
        review = CreateReviewSerializer(data=request.data)
        if review.is_valid():
            review.save()
        return Response(status=201) 
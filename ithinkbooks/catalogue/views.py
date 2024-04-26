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

#Просмотр книг по категории
class CategoryView(ListAPIView):
    serializer_class = ProductsSerializer
    def get_queryset(self):
        #category = self.kwargs['category']
        queryset = Products.objects.all()
        #book_type = self.request.query_params.get('book_type')
        #book_type = book_type.split(",")
        book_theme = self.kwargs['book_theme']
        if book_theme == "all":
            return Products.objects.all()
        else:
            return queryset.filter(book_theme=book_theme)
    

#Создание отзыва
class CreateReviewView(APIView):
    def post(self, request):
        review = CreateReviewSerializer(data=request.data)
        if review.is_valid():
            review.save()
        return Response(status=201) 

def front(request):
    context = {}
    return render(request, "index.html", context)

class TestView(ListAPIView):
    serializer_class = ProductsSerializer
    def get_queryset(self):
        queryset = Products.objects.all()
        return queryset.filter(theme_category__contains=['office'])
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from catalogue.models import Categories, Products, Review
from rest_framework import permissions
from rest_framework.response import Response
from catalogue.serializers import ProductsSerializer, CategoriesSerializer, CreateReviewSerializer, FindBookSerializer
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
    

#Просмотр книг по новым категории
class CategoriesView(APIView):
    def get(request, self, book_theme):
        products = Products.objects.all()
        #serializer_class = ProductsSerializer(products, many=True)
        if book_theme == "all":
            return Products.objects.all()
        else:
            products_filter = products.filter(book_themes__contains = [book_theme])
            serializer_class = ProductsSerializer(products_filter, many=True)
            return Response(serializer_class.data)

#Создание отзыва
class CreateReviewView(APIView):
    def post(self, request):
        review = CreateReviewSerializer(data=request.data)
        if review.is_valid():
            review.save()
            return Response(status=201)
        return Response(review.errors) 

def front(request):
    context = {}
    return render(request, "index.html", context)

class TestView(ListAPIView):
    serializer_class = ProductsSerializer
    def get_queryset(self):
        queryset = Products.objects.all()
        return queryset.filter(theme_category__contains=['office'])

class FindBooksView(APIView):
    def post(self, request):
        serializer = FindBookSerializer(data=request.data)
        if serializer.is_valid():
            book_name = serializer.validated_data['book_name']
            products = Products.objects.all().filter(name__search=book_name)
            products_serializer = ProductsSerializer(products, many=True)
            return Response(products_serializer.data)

class ReviewUserView(APIView):
    def get(self, request,user_id):
        queryset = Review.objects.all()
        review = queryset.filter(user=user_id)
        serializer = CreateReviewSerializer(review, many=True)
        return Response(serializer.data)
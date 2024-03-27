from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from catalogue.models import Categories, Products
from rest_framework import permissions
from catalogue.serializers import ProductsSerializer, CategoriesSerializer
# Create your views here.
class ProductsListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    pagination_class = None

class ProductView(RetrieveAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
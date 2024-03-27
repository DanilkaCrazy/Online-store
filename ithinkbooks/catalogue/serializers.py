from rest_framework import serializers
from catalogue.models import Products, Categories

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        #fields = ('name','slug','author','publisher', 'year','number_of_pages','description','price',
        #'quantity','book_type', 'book_bindings', 'translator_choice' )

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
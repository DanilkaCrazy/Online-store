from rest_framework import serializers
from catalogue.models import Products, Categories, Review

class CreateReviewSerializer (serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    review = CreateReviewSerializer(many = True)
    class Meta:
        model = Products
        fields = '__all__'
        #fields = ('name','slug','author','publisher', 'year','number_of_pages','description','price',
        #'quantity','book_type', 'book_bindings', 'translator_choice' )

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
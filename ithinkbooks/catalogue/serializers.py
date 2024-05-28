from rest_framework import serializers
from catalogue.models import Products, Categories, Review, RatingStar, Favorite
from users.serializers import UserSerializer

class RatingStarSerializer (serializers.ModelSerializer):
    class Meta:
        model = RatingStar
        fields = '__all__'

class CreateReviewSerializer (serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class GetReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
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

class OneProductSerializer(serializers.ModelSerializer):
    review = GetReviewSerializer(many = True)
    class Meta:
        model = Products
        fields = '__all__'

class ProductWithoutReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class FindBookSerializer (serializers.Serializer):
    book_name = serializers.CharField()

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'
    
class FavoriteReturnSerializer(serializers.ModelSerializer):
    product = ProductWithoutReviewSerializer()
    class Meta:
        model = Favorite
        fields = '__all__'

class RemoveFavoriteSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
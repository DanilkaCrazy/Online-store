from rest_framework import serializers
from cart.models import Cart, CartQueryset
from catalogue.serializers import ProductWithoutReviewSerializer

class CartSerializer (serializers.ModelSerializer):
    class Meta:
        model = Cart
        #fields = ('user', 'product', 'quantity')
        fields = '__all__'

class CartGetSerializer (serializers.ModelSerializer):
    product = ProductWithoutReviewSerializer()
    class Meta:
        model = Cart
        #fields = ('user', 'product', 'quantity')
        fields = '__all__'

#class AddToCartSerializer(serializers.ModelSerializer):
 #  class Meta:
  #      model = Cart
   #     fields = '__all__'

class AddToCartSerializer(serializers.Serializer):
    #user_id = serializers.IntegerField()
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

class ChangeCartSerializer(serializers.Serializer):
    #user_id = serializers.IntegerField()
    product_id = serializers.IntegerField()
    cart_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

class RemoveCartSerializer(serializers.Serializer):
    cart_id = serializers.IntegerField()
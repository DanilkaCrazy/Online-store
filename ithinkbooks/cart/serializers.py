from rest_framework import serializers
from cart.models import Cart, CartQueryset

class CartSerializer (serializers.ModelSerializer):
    class Meta:
        model = Cart
        #fields = ('user', 'product', 'quantity')
        fields = '__all__'


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('user', 'product', 'quantity')
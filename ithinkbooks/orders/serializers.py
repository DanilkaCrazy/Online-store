from rest_framework import serializers
from orders.models import Order, OrderItem, OrderitemQueryset

class OrderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Order
        #fields = ('user', 'product', 'quantity')
        fields = '__all__'

class OrderItemSerializer (serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        #fields = ('user', 'product', 'quantity')
        fields = '__all__'

class OrderByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('is_paid', 'status')

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('pick_up_point','is_paid', 'status')
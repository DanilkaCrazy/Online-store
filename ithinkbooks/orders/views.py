from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from cart.models import Cart, CartQueryset
from rest_framework import permissions
from rest_framework.response import Response
from catalogue.models import Products
from orders.serializers import OrderSerializer
from orders.models import Order, OrderItem

class CreateOrderView(APIView):
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                cart_items = Cart.objects.filter(user=request.user)
                if cart_items.exists():
                    order = Order.objects.create(user=request.user, pick_up_point=serializer.validated_data['pick_up_point'])
                    for cart_item in cart_items:
                        product = cart_item.product
                        name = cart_item.product.name
                        price = cart_item.product.price
                        quantity = cart_item.quantity #Кол-во продуктов в КОРЗИНЕ

                        if product.quantity < quantity:
                            raise Exception(f'Недостаточное количество товара {name} на складе. В наличии - {product.quantity}')
                        
                        OrderItem.objects.create(order=order, product=product, name=name, price=price, quantity=quantity)
                        product.quantity-=quantity
                        product.save()
                        cart_items.delete()
                        return Response(status=201)

#Только для разработки - просмотр всех заказов
class OrderListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = None
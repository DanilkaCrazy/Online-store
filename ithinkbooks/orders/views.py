from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from cart.models import Cart, CartQueryset
from rest_framework import permissions
from rest_framework.response import Response
from catalogue.models import Products
from orders.serializers import OrderSerializer, OrderItemSerializer, OrderByUserSerializer, UpdateOrderSerializer
from orders.models import Order, OrderItem

#Создаем заказ, пока не платим
class CreateOrderView(APIView):
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                cart_items = Cart.objects.filter(user=request.user)
                if cart_items.exists():
                    order = Order.objects.create(user=request.user)
                    order.save()
                    for cart_item in cart_items:
                        product = cart_item.product
                        name = cart_item.product.name
                        price = cart_item.product.price
                        author = cart_item.product.author
                        quantity = cart_item.quantity #Кол-во продуктов в КОРЗИНЕ

                        if product.quantity < quantity:
                            raise Exception(f'Недостаточное количество товара {name} на складе. В наличии - {product.quantity}')
                                
                        OrderItem.objects.create(order=order, product=product, name=name, price=price, author=author, quantity=quantity)
                    data = serializer.data
                    data['id'] = order.pk
                    return Response(data)
                return Response(serializer.errors)
            return Response(serializer.errors)
        return Response(serializer.errors)

#Только для разработки - просмотр всех заказов
class OrderListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = None

class OrderItemListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    pagination_class = None


class OrderByUser(APIView):
    def get(self, request):
        queryset = Order.objects.all()
        order = queryset.filter(user=request.user)
        #order_items_queryset = OrderItem.objects.all()
        #order_items = order_items_queryset.filter(order=order)
        serializer = OrderSerializer(order, many=True)
        #serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data)

class OrderItemsByOrder(APIView):
    def get(self, request, order_id):
        queryset = OrderItem.objects.all()
        order_items = queryset.filter(order=order_id)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data)

class OneOrderView(APIView):
    def get(self, request, order_id):
        queryset = Order.objects.all()
        order = queryset.filter(pk=order_id)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)
    def put(self, request, order_id):
        cart_items = Cart.objects.filter(user=request.user)
        order = get_object_or_404(Order, pk=order_id)
        serializer = UpdateOrderSerializer(order, request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.validated_data['status']=="В обработке":
                if cart_items.exists():
                    for cart_item in cart_items:
                        product = cart_item.product
                        name = cart_item.product.name
                        quantity = cart_item.quantity #Кол-во продуктов в КОРЗИНЕ

                        if product.quantity < quantity:
                            raise Exception(f'Недостаточное количество товара {name} на складе. В наличии - {product.quantity}')
                                
                        product.quantity-=quantity
                        product.save()
                        cart_items.delete()
                    return Response(serializer.data)
        return Response(serializer.errors)
    def delete(self, request, order_id):
        queryset = Order.objects.all()
        order = queryset.filter(pk=order_id)
        order.delete()
        return Response(status=204)

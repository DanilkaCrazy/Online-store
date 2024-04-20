from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from cart.models import Cart, CartQueryset
from rest_framework import permissions
from rest_framework.response import Response
from cart.serializers import CartSerializer, AddToCartSerializer
from catalogue.models import Products
# Create your views here.

class CartItemsView(APIView):
    #Просмотр корзины пользователя
    def get(self, request):
        carts = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)
     
    #Добавление предмета в корзину
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        product_id = serializer['product']
        product = Products.objects.get(id=product_id)
        #cart_data = AddToCartSerializer(data=request.data)
        data = request.data
        #carts = Cart.objects.filter(user=request.user)
        Cart.objects.create(user=request.user, product=product, quantity=data['quantity'])
        #if cart_data.is_valid():
            #Cart.objects.create(user=cart_data.user, product=cart_data.product, quantity=cart_data.quantity)
        #    Cart.objects.create(cart_data)
        return Response(status=201) 


#class CartItemsView(ListAPIView):
 #   serializer_class = CartSerializer
  #  def get_queryset(self):
   #     queryset = Cart.objects.all()
    #    return queryset.filter(user=request.user)
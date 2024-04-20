from django.shortcuts import render, get_object_or_404
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
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            product = get_object_or_404(Products, pk = serializer.validated_data['product_id'])
            if request.user.is_authenticated:
                carts = Cart.objects.filter(user=request.user, product=product)
                if carts.exists():
                    cart = carts.first()
                    if cart:
                        cart.quantity += serializer.validated_data['quantity']
                        cart.save()
                else:
                    Cart.objects.create(user=request.user, product=product, quantity=serializer.validated_data['quantity'])
        return Response(status=201)


class ClassProductView(APIView):
    #Просмотр корзины пользователя с отдельным продуктом
    def get(self, request):
        carts = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data) 
    #Добавление предмета в корзину
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        if request.user.is_authenticated:
            carts = Cart.objects.filter(user=request.user)
            if carts.exists():
                cart = carts.first()
                if cart:
                    cart.quantity += 1
                    cart.save()
            else:
                Cart.objects.create(user=request.user, product=AddToCartSerializer['product_id'], quantity=AddToCartSerializer['quantity'])
        return Response(status=201)
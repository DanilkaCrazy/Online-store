from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from cart.models import Cart, CartQueryset
from rest_framework import permissions
from rest_framework.response import Response
from cart.serializers import CartSerializer, AddToCartSerializer, ChangeCartSerializer, RemoveCartSerializer
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
        return Response(data=serializer.errors, status=500)
    def delete(self, request):
        carts = Cart.objects.filter(user=request.user)
        carts.delete()
        return Response(status=204)

class CartChangeView(APIView):
    def post(self, request):
        serializer = ChangeCartSerializer(data=request.data)
        if serializer.is_valid():
            product = get_object_or_404(Products, pk = serializer.validated_data['product_id'])
            if request.user.is_authenticated:
                cart = get_object_or_404(Cart, pk = serializer.validated_data['cart_id'])
                cart.quantity = serializer.validated_data['quantity']
                cart.save()
                return Response(status=201)
        return Response(data=serializer.errors, status=500)

class CartRemoveView(APIView):
    def post(self, request):
        serializer = RemoveCartSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                cart = get_object_or_404(Cart, pk = serializer.validated_data['cart_id'])
                cart.delete()
                return Response(status=201)
        return Response(data=serializer.errors, status=500)
from django.urls import path
#from users.views import 
from cart.views import CartItemsView, CartChangeView, CartRemoveView

app_name = 'cart'
urlpatterns = [
    path('items', CartItemsView.as_view(), name='Cart Items'),
    path('change', CartChangeView.as_view(), name='Change cart'),
    path('remove', CartRemoveView.as_view(), name='Remove item from cart')
]
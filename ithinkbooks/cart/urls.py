from django.urls import path
#from users.views import 
from cart.views import CartItemsView

app_name = 'cart'
urlpatterns = [
    path('items', CartItemsView.as_view(), name='Cart Items'),
    #path('logout', UserLogout.as_view(), name='Logout'),
    #path('login', UserLogin.as_view(), name='Login')
]
from django.urls import path
from orders.views import CreateOrderView, OrderListView 

app_name = 'orders'
urlpatterns = [
    path('create_order', CreateOrderView.as_view(), name='Create Order'),
    path('all_orders', OrderListView.as_view(), name='Orders')
]
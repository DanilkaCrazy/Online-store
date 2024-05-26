from django.urls import path
from orders.views import CreateOrderView, OrderListView, OrderItemListView, OrderByUser, OrderItemsByOrder, OneOrderView

app_name = 'orders'
urlpatterns = [
    path('create_order', CreateOrderView.as_view(), name='Create Order'),
    path('all_orders', OrderListView.as_view(), name='Orders'),
    path('items', OrderItemListView.as_view(), name='Order List'),
    path('user_items', OrderByUser.as_view(), name ='User orders'),
    path('user_items/<order_id>', OrderItemsByOrder.as_view(), name='Order Items'),
    path('<order_id>', OneOrderView.as_view(), name = 'Order'),
]
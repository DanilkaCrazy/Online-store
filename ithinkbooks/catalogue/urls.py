from django.urls import path
from catalogue.views import ProductsListView, ProductView

app_name = 'catalogue'
urlpatterns = [
    path('',ProductsListView.as_view(), name='Products'),
    path('product',ProductView.as_view(),name='product')
]

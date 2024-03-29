from django.urls import path
from catalogue.views import ProductsListView, ProductView

app_name = 'catalogue'
urlpatterns = [
    path('products',ProductsListView.as_view(), name='Products'),
    path('products/<int:pk>',ProductView.as_view(),name='Products')
]

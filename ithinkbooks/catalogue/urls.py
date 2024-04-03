from django.urls import path
from catalogue.views import ProductsListView, ProductView, CreateReviewView, CategoryView

app_name = 'catalogue'
urlpatterns = [
    path('products',ProductsListView.as_view(), name='Products'),
    path('products/<int:pk>',ProductView.as_view(),name='Product'),
    #path('products/<book_type>', ProductsListView.as_view(), name= 'Products by Type'),
    path('category/<category>', CategoryView.as_view(), name='Category'),
    #path('<slug:category_slug>/', CategoryView.as_view(), name='Category'),
    path('review/', CreateReviewView.as_view(), name='Review'),
]

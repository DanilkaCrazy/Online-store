from django.urls import path
from catalogue.views import ProductsListView, ProductView, CreateReviewView, CategoryView, front, TestView, CategoriesView, ReviewUserView, FindBooksView

app_name = 'catalogue'
urlpatterns = [
    path('products',ProductsListView.as_view(), name='Products'),
    path('products/<int:pk>',ProductView.as_view(),name='Product'),
    #path('products/<book_type>', ProductsListView.as_view(), name= 'Products by Type'),
    path('theme/<book_theme>', CategoryView.as_view(), name='Theme'),
    #path('<slug:category_slug>/', CategoryView.as_view(), name='Category'),
    path('review/', CreateReviewView.as_view(), name='Review'),
    path("", front, name='Front'),
    path("test", TestView.as_view(), name='Test'),
    path("categories/<book_theme>", CategoriesView.as_view()),
    path("<user_id>/reviews", ReviewUserView.as_view(), name='User reviews'),
    path("books_search", FindBooksView.as_view(), name = 'Books by name')
]

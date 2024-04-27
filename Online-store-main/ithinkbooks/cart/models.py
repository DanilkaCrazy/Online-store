from django.db import models
from users.models import User
from catalogue.models import Products

# Create your models here.

class CartQueryset(models.QuerySet):
    
    def total_price(self):
        return sum(cart.products_price() for cart in self)
    
    def total_quantity(self):
        if self:
            return sum(cart.quantity for cart in self)
        return 0

class Cart(models.Model):
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Пользователь')
    product = models.ForeignKey(Products, related_name='book', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Книга')
    quantity = models.PositiveSmallIntegerField(default=0, verbose_name='Количество')
    created_timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        db_table = 'cart'
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

    objects = CartQueryset().as_manager()
    
    def products_price(self):
        return round(self.product.price() * self.quantity, 2)
    
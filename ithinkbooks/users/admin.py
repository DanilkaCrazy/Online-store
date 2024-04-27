from django.contrib import admin
from users.models import User
from cart.admin import CartTabAdmin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin
# Register your models here.

# Register your models here.
#admin.site.register(User)
@admin.register(User)
class UserAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [CartTabAdmin]
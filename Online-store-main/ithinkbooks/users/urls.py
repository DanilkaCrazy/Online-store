from django.urls import path
from users.views import RegisterUser, UserLogout, UserLogin

app_name = 'users'
urlpatterns = [
    path('register', RegisterUser.as_view(), name='Register'),
    path('logout', UserLogout.as_view(), name='Logout'),
    path('login', UserLogin.as_view(), name='Login')
]
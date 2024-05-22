from django.urls import path
from users.views import RegisterUser, UserLogout, UserLogin, GetUser, UpdateProfileView

app_name = 'users'
urlpatterns = [
    path('register', RegisterUser.as_view(), name='Register'),
    path('logout', UserLogout.as_view(), name='Logout'),
    path('login', UserLogin.as_view(), name='Login'),
    path('user/<username>', GetUser.as_view(), name = 'User Page'),
    path('update_profile/<int:pk>', UpdateProfileView.as_view(), name = 'Change Profile'),
]
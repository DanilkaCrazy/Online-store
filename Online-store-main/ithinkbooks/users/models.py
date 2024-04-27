from django.db import models
from django.contrib.auth.models import AbstractUser
from django_better_admin_arrayfield.models.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(verbose_name="Электронная почта")
    image = models.ImageField(upload_to = 'users_images', blank=True, null=True, verbose_name='Фото профиля')
    phone_number = models.TextField(max_length=10, null=True, verbose_name='Номер телефона')
    birthdate = models.DateField(null=True, verbose_name='Дата рождения')
    location = models.TextField(max_length=50, null=True, verbose_name='Населенный пункт')
    about_self = models.TextField(max_length=300, null=True, blank=True, verbose_name='О себе')
    class UserDirection(models.TextChoices):
        FRONTEND = "frontend","Frontend"
        BACKEND = "backend","Backend"
        DESIGN = "design","Дизайн"
        GAMEDEV = "gamedev","Gamedev"
        ANALYTICS = "analytics", "Analytics"
        AI = "ai", "AI"
        DATASCIENCE = "data", "Data Science"
        DEVOPS = "devops", "DevOps"
        QA = "qa", "Quality Assurance"
        COMPSCI = "CS","Computer Science" #Разбить на несколько
        OTHER = "OT","Other"
    user_direction = models.CharField(max_length=20, choices=UserDirection, default=UserDirection.OTHER, verbose_name='Направление')
    user_directions = ArrayField(models.CharField(max_length=20, choices=UserDirection, default=UserDirection.OTHER), null=True, blank=True  ,verbose_name='Направление')
    class UserStatus(models.TextChoices):
        STUDENT = "student"
        TRAINEE = "trainee"
        JUNIOR = "junior"
        MIDDLE = "middle"
        SENIOR = "senior"
    user_status = models.CharField(max_length=20, choices=UserStatus, default=UserStatus.STUDENT, verbose_name='Статус')

    class Meta:
        db_table = 'user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return self.username
    
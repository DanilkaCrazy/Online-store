# Generated by Django 5.0.3 on 2024-05-14 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_user_directions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_direction',
        ),
    ]
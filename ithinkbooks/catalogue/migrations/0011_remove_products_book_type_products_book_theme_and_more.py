# Generated by Django 5.0.3 on 2024-04-03 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0010_products_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='book_type',
        ),
        migrations.AddField(
            model_name='products',
            name='book_theme',
            field=models.CharField(choices=[('FE', 'Frontend'), ('BE', 'Backend'), ('DE', 'Дизайн'), ('GD', 'Gamedev'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Темы'),
        ),
        migrations.AddField(
            model_name='products',
            name='programming_language',
            field=models.CharField(choices=[('JS', 'JavaScript'), ('J', 'Java'), ('PY', 'Python'), ('C#', 'C#'), ('C', 'C'), ('C++', 'C++'), ('SQL', 'SQL'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Язык программирования'),
        ),
    ]
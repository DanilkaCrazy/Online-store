# Generated by Django 5.0.3 on 2024-03-26 14:51

import multiselectfield.db.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True, verbose_name='Название')),
                ('slug', models.SlugField(blank=True, max_length=200, null=True, unique=True, verbose_name='URL')),
                ('author', models.CharField(max_length=150, null=True, verbose_name='Автор')),
                ('publisher', models.CharField(max_length=150, null=True, verbose_name='Издательство')),
                ('year', models.IntegerField(null=True, verbose_name='Год')),
                ('number_of_pages', models.IntegerField(null=True, verbose_name='Количество страниц')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=7, verbose_name='Цена')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Количество')),
                ('book_type', multiselectfield.db.fields.MultiSelectField(choices=[('FE', 'Frontend'), ('BE', 'Backend'), ('DE', 'Дизайн'), ('GD', 'Gamedev'), ('CS', 'Computer Science'), ('JS', 'JavaScript'), ('J', 'Java'), ('PY', 'Python'), ('C#', 'C#'), ('C', 'C'), ('C++', 'C++'), ('SQL', 'SQL'), ('OT', 'Другое')], default='FE', max_length=20, verbose_name='Темы')),
                ('book_bindings', models.CharField(choices=[('Мягкий переплет', 'Softcover'), ('Твердый переплет', 'Hardcover')], default='Мягкий переплет', max_length=30, verbose_name='Переплёт')),
                ('translator_choice', models.CharField(choices=[('Переводчик', 'Translate'), ('Нет переводчика', 'Notranslate')], default='Переводчик', max_length=30, verbose_name='Переводчик')),
            ],
            options={
                'verbose_name': 'Книга',
                'verbose_name_plural': 'Книги',
                'db_table': 'book',
            },
        ),
    ]

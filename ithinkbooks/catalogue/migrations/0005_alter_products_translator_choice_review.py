# Generated by Django 5.0.3 on 2024-03-29 11:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0004_products_book_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='translator_choice',
            field=models.CharField(choices=[('Имя переводчика', 'Translate'), ('Отсутствует', 'Notranslate')], default='Имя переводчика', max_length=30, verbose_name='Переводчик'),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=100, verbose_name='Заголовок отзыва')),
                ('text', models.TextField(max_length=5000, verbose_name='Текст отзыва')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalogue.products')),
            ],
            options={
                'verbose_name': 'Отзыв',
                'verbose_name_plural': 'Отзывы',
                'db_table': 'review',
            },
        ),
    ]

# Generated by Django 5.0.3 on 2024-04-27 06:05

import django_better_admin_arrayfield.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0009_products_book_format_products_book_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='book_themes',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('frontend', 'Frontend'), ('backend', 'Backend'), ('design', 'Дизайн'), ('gamedev', 'Gamedev'), ('analytics', 'Analytics'), ('ai', 'AI'), ('data', 'Data Science'), ('devops', 'DevOps'), ('qa', 'Quality Assurance'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Темы'), blank=True, null=True, size=None),
        ),
    ]
# Generated by Django 5.0.3 on 2024-04-05 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0013_alter_products_programming_language'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='category',
        ),
        migrations.AddField(
            model_name='products',
            name='isbn',
            field=models.CharField(max_length=100, null=True, verbose_name='ISBN'),
        ),
    ]

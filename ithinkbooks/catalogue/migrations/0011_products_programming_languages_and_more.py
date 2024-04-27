# Generated by Django 5.0.3 on 2024-04-27 06:19

import django_better_admin_arrayfield.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0010_products_book_themes'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='programming_languages',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('JavaScript', 'Javascript'), ('Java', 'Java'), ('Python', 'Python'), ('C#', 'Csharp'), ('C', 'Clanguage'), ('C++', 'Cplus'), ('SQL', 'Sql'), ('HTMLCSS', 'Htmlcss'), ('Ruby', 'Ruby'), ('PHP', 'Php'), ('TypeScript', 'Typescript'), ('Assembler', 'Assembler'), ('Bash/Powershell', 'Bash Powershell'), ('OT', 'Other')], default='OT', max_length=30), blank=True, null=True, size=None, verbose_name='Языки программирования'),
        ),
        migrations.AlterField(
            model_name='products',
            name='book_theme',
            field=models.CharField(choices=[('frontend', 'Frontend'), ('backend', 'Backend'), ('design', 'Дизайн'), ('gamedev', 'Gamedev'), ('analytics', 'Analytics'), ('ai', 'AI'), ('data', 'Data Science'), ('devops', 'DevOps'), ('qa', 'Quality Assurance'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Тема'),
        ),
        migrations.AlterField(
            model_name='products',
            name='book_themes',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('frontend', 'Frontend'), ('backend', 'Backend'), ('design', 'Дизайн'), ('gamedev', 'Gamedev'), ('analytics', 'Analytics'), ('ai', 'AI'), ('data', 'Data Science'), ('devops', 'DevOps'), ('qa', 'Quality Assurance'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30), blank=True, null=True, size=None, verbose_name='Темы'),
        ),
    ]
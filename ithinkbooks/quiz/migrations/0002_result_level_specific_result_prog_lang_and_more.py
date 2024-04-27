# Generated by Django 5.0.3 on 2024-04-26 12:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0008_alter_products_theme_category'),
        ('quiz', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='level_specific',
            field=models.TextField(default=1, verbose_name='Уровень(для категории)'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='result',
            name='prog_lang',
            field=models.TextField(default=1, verbose_name='Язык программирования'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='question',
            name='question_type',
            field=models.TextField(choices=[('Theme Question', 'Theme'), ('Level Question', 'Level'), ('Language Question', 'Language'), ('Price Question', 'Price'), ('Programmed Before', 'Prog Before'), ('Programming Language Question', 'Prog Lang'), ('Theme Specific Question', 'Theme Specific'), ('Specific Level Question', 'Level Specific'), ('Theme for Other', 'Theme For Other'), ('Other', 'Other')], default='Theme Question', verbose_name='Тип вопроса'),
        ),
        migrations.AlterField(
            model_name='result',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='result', to='quiz.quiz', verbose_name='Тест'),
        ),
        migrations.CreateModel(
            name='Roadmap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=150, verbose_name='Заголовок')),
                ('result', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='result', to='quiz.result')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='roadmap_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoadmapNode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('node_level', models.IntegerField(verbose_name='Уровень узла')),
                ('product', models.ManyToManyField(related_name='roadmap_book', to='catalogue.products')),
                ('roadmap', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='roadmap', to='quiz.roadmap')),
            ],
        ),
    ]
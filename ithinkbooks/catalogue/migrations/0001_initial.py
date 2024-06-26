# Generated by Django 5.0.3 on 2024-06-02 12:20

import django.core.validators
import django.db.models.deletion
import django_better_admin_arrayfield.models.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True, verbose_name='Категория')),
                ('description', models.TextField(max_length=200, verbose_name='Описание категории')),
                ('slug', models.SlugField(blank=True, max_length=150, null=True, unique=True, verbose_name='URL')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='RatingStar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('star_value', models.DecimalField(decimal_places=1, default=0, max_digits=2, verbose_name='Звезда рейтинга')),
            ],
            options={
                'verbose_name': 'Звезда рейтинга',
                'verbose_name_plural': 'Звёзды рейтинга',
                'db_table': 'rating_star',
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True, verbose_name='Название')),
                ('slug', models.SlugField(blank=True, max_length=200, null=True, unique=True, verbose_name='URL')),
                ('author', models.CharField(max_length=150, null=True, verbose_name='Автор')),
                ('publisher', models.CharField(max_length=150, null=True, verbose_name='Издательство')),
                ('isbn', models.CharField(max_length=100, null=True, verbose_name='ISBN')),
                ('year', models.IntegerField(null=True, verbose_name='Год')),
                ('number_of_pages', models.IntegerField(null=True, verbose_name='Количество страниц')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=7, verbose_name='Цена')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Количество')),
                ('book_theme', models.CharField(choices=[('frontend', 'Frontend'), ('fullstack', 'FullStack'), ('backend', 'Backend'), ('Kubersecurity', 'Кибербезопасность'), ('mobiledev', 'Мобильная разработка'), ('design', 'Дизайн'), ('gamedev', 'Gamedev'), ('analytics', 'Analytics'), ('ai', 'AI'), ('data', 'Data Science'), ('devops', 'DevOps'), ('qa', 'Quality Assurance'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Тема')),
                ('book_themes', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('frontend', 'Frontend'), ('fullstack', 'FullStack'), ('backend', 'Backend'), ('Kubersecurity', 'Кибербезопасность'), ('mobiledev', 'Мобильная разработка'), ('design', 'Дизайн'), ('gamedev', 'Gamedev'), ('analytics', 'Analytics'), ('ai', 'AI'), ('data', 'Data Science'), ('devops', 'DevOps'), ('qa', 'Quality Assurance'), ('CS', 'Computer Science'), ('OT', 'Other')], default='OT', max_length=30), blank=True, null=True, size=None, verbose_name='Темы')),
                ('programming_language', models.CharField(choices=[('JavaScript', 'Javascript'), ('Java', 'Java'), ('Python', 'Python'), ('C#', 'Csharp'), ('C', 'Clanguage'), ('C++', 'Cplus'), ('SQL', 'Sql'), ('HTMLCSS', 'Htmlcss'), ('Ruby', 'Ruby'), ('PHP', 'Php'), ('TypeScript', 'Typescript'), ('Assembler', 'Assembler'), ('Bash/Powershell', 'Bash Powershell'), ('OT', 'Other')], default='OT', max_length=30, verbose_name='Язык программирования')),
                ('programming_languages', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('JavaScript', 'Javascript'), ('Java', 'Java'), ('Python', 'Python'), ('C#', 'Csharp'), ('C', 'Clanguage'), ('C++', 'Cplus'), ('SQL', 'Sql'), ('HTMLCSS', 'Htmlcss'), ('Ruby', 'Ruby'), ('PHP', 'Php'), ('TypeScript', 'Typescript'), ('Assembler', 'Assembler'), ('Bash/Powershell', 'Bash Powershell'), ('OT', 'Other')], default='OT', max_length=30), blank=True, null=True, size=None, verbose_name='Языки программирования')),
                ('book_bindings', models.CharField(choices=[('Мягкий переплет', 'Softcover'), ('Твердый переплет', 'Hardcover')], default='Мягкий переплет', max_length=30, verbose_name='Переплёт')),
                ('translator_choice', models.CharField(choices=[('Имя переводчика', 'Translate'), ('Отсутствует', 'Notranslate')], default='Имя переводчика', max_length=30, verbose_name='Переводчик')),
                ('level', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)], verbose_name='Уровень книги')),
                ('theme_category', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('source_control', 'Использование систем управлений версиями (Git, SVN и т.д.)'), ('api_work', 'Принципы работы с API'), ('team_work', 'Умение работать в команде (навыки коммуникации, планирования, координации и совместной работы над проектом и т.д.).'), ('db_basics', 'Основы баз данных'), ('db_advanced', 'Принципы работы с базами данных (SQL, NoSQL, Oracle, MySQL и т.д.)'), ('developement_methods', 'Методологии разработки программного обеспечения (Agile, Scrum, Waterfall и т.д.)'), ('networks_protocols', 'Принципы работы с сетями и протоколами (HTTP, HTTPS, TCP/IP, FTP и т.д.)'), ('math_knowledge', 'Знания математики (линейная алгебра, теория вероятности и статистика, дифференциальные уравнения и т.д.)'), ('machine_learning', 'Методы машинного обучения (нейронные сети, классификация, регрессия, кластеризация и т.д.)'), ('os_basic', 'Принципы работы операционных систем (Windows, Linux, MacOS и т.д)'), ('optimization', 'Знание принципов оптимизации (оптимизация кода, оптимизация моделей, оптимизация алгоритмов и т.д.)'), ('other', 'Другое'), ('process_modeling', 'Основы моделирования процессов'), ('competitor_analysis', 'Анализ конкурентов'), ('office_apps', 'Офисные приложения (MS Office)'), ('metrics_work', 'Работа с метриками'), ('think_analysis', 'Аналитическое мышление'), ('risks_analytics', 'Оценка рисков'), ('frontend_framework', 'Знание фреймворков и библиотек (React, Angular, Vue.js и т.д.)'), ('frontend_automatization', 'Знание инстурментов автоматизации (Webpack, Gulp, Grunt и т.д.)'), ('frontend_testing', 'Владение инструментами тестирования (Jest, Mocha, Jasmine и т.д.)'), ('frontend_design', 'Знание принципов верстки и дизайна'), ('frontend_optimization', 'Принципы оптимизации производительности'), ('frontend_graphic', 'Навыки работы с графическими редакторами (Photoshop, Illustrator, Figma и т.д.)'), ('backend_db', 'Работа с системами управления базами данных (СУБД) и язык SQL'), ('backend_architecture', 'Знание принципов архитектуры (MVC, MVP, MVVM и т.д.)'), ('backend_security', 'Знание принципов безопасности (шифрование, аутентификация, авторизация, защита от атак и т.д.)'), ('backend_optimization', 'Знание принципов оптимизации производительности (кэширование, индексирование, оптимизация запросов к базе данных и т.д.)'), ('design_principal', 'Принципы структуры дизайна (композиция, цветовая гамма, типографика, баланс, контраст, пропорции и т.д.)'), ('design_tools', 'Дизайнерские инструменты (Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Figma, Sketch и т.д.)'), ('design_ui', 'Принципы пользовательского интерфейса (UI) и пользовательского опыта (UX) (навигация, интерактивность, отзывчивость, доступность и т.д.)'), ('design_brand', 'Принципов брендинга (логотип, корпоративный стиль, визуальная идентичность и т.д.)'), ('desing_frontend', 'Принципы верстки (HTML, CSS, JavaScript и т.д.)'), ('design_adapt', 'Принципы адаптивного дизайна (дизайн для различных устройств и размеров экрана и т.д.)'), ('design_visualization', 'Визуализация данных (инфографика, диаграммы, графики и т.д.)'), ('design_images', 'Принципы работы с изображениями (растровая и векторная графика, оптимизация изображений, цветовая коррекция и т.д.)'), ('gamedev_engines', 'Работа с игровыми движками (Unity, Unreal Engine, CryEngine, Godot и т.д.)'), ('gamedev_design', 'Принципы игрового дизайна (геймплей, механика, уровни, сюжет, персонажи и т.д.)'), ('gamedev_graphics', 'Принципы графического дизайна (моделирование, текстурирование, анимация, визуальные эффекты и т.д.)'), ('gamedev_sound', 'Звуковой дизайн (музыка, звуковые эффекты, озвучивание и т.д.)'), ('gamedev_physics', 'Знание принципов физики и математики (физика движка, математическое моделирование, алгоритмы и т.д.)'), ('gamedev_optimisation', 'Знание принципов оптимизации (оптимизация кода, оптимизация графики, оптимизация памяти и т.д.)'), ('gamedev_test', 'Знание принципов тестирования (отладка, тестирование, отзывы пользователей и т.д.)'), ('deep_learning', 'Принципы глубокого обучения (сверточные нейронные сети, повторяющиеся нейронные сети, генеративные состязательные сети и т.д.)'), ('natural_language', 'Знание естественного языкового процессинга (обработка текста, разметка текста, синтаксический анализ, семантический анализ и т.д.)'), ('computer_vision', 'Компьютерное зрение (распознавание образов, сегментация изображений, обнаружение объектов и т.д.)'), ('datascience_visualization', 'Визуализация данных (Matplotlib, Seaborn, Tableau, Power BI и т.д.)'), ('datascience_work', 'Знание инструментов обработки данных (Pandas, NumPy, SciPy, Scikit-learn и т.д.)'), ('datascience_bigdata', 'Принципы работы с большими данными (распределенные вычисления, обработка потоков данных, масштабируемость и т.д.)'), ('devops_automatization', 'Инструменты автоматизации (Ansible, Chef, Puppet, Terraform и т.д.)'), ('devops_container', 'Методы контейнеризации (Docker, Kubernetes и т.д.)'), ('devops_cloud', 'Облачные технологий (Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) и т.д.)'), ('devops_monitor', 'Системы мониторинга (Nagios, Zabbix, Prometheus, Grafana и т.д.)'), ('devops_integration', 'Системы непрерывной интеграции и непрерывного развертывания - CI/CD (Jenkins, Travis CI, CircleCI, GitLab CI и т.д.)'), ('devops_security', 'Знание принципов безопасности (шифрование, аутентификация, авторизация, управление доступом и т.д.)'), ('testing_methods', 'Владение методологиями тестирования (черный ящик, белый ящик, серый ящик, функциональное тестирование, нефункциональное тестирование, регрессионное тестирование, модульное тестирование, интеграционное тестирование, нагрузочное тестирование, стрессовое тестирование и т.д.)'), ('testing_automatization', 'Инструменты автоматизации тестирования (Selenium, Appium, TestComplete, Ranorex, JMeter и т.д.)'), ('testing_tracking', 'Системы отслеживания ошибок (Jira, Bugzilla, Redmine и т.д.)'), ('cs_algoritm', 'Алгоритмы и структуры данных (алгоритмы сортировки, поиска, оптимизации, структуры данных и тд)'), ('cs_architecture', 'Архитектура компьютерных систем (процессоры, память, ввод-вывод, сети и т.д.)'), ('cs_math', 'Математические методы в компьютерных науках (дискретная математика, линейная алгебра, теория вероятностей, статистика и т.д.)'), ('cs_tools', 'Инструменты разработки программного обеспечения (IDE, отладчики, профайлеры, системы управления версиями и т.д.)'), ('mobile', 'Понимание особенностей мобильных устройств, архитектуры и инструментов разработки для конкретной платформы (Android или IOS)'), ('bd_exp', 'Опыт работы с базами данных (знания SQL, опыт работы с ORM-фреймворками'), ('network', 'Опыт работы с сетями (знание протоколов HTTP/HTTPS, опыт работы с RESTful API)'), ('algoritms', 'Знания алгоритмов и структур данных'), ('testing', 'Подходы и инструменты для тестирования мобильных приложений'), ('control_version', 'Системы контроля версий (Git и другие)'), ('design', 'Понимание принципов UX/UI - дизайна, опыт работы с графическими редакторами'), ('operation_systems', 'Операционные системы'), ('networks', 'Сети'), ('systems_of_security', 'Системы безопасности: основы конфиденциальности, целостности и доступности информации; системы аутентификации, шифрования и защиты периметра'), ('pentest', 'Атаки на проникновение и защита'), ('monitoring', 'Мониторинг и реагирование на инциденты'), ('instruments', 'Владение инструментами безопасности'), ('standarts', 'Знание стандартов и практик безопасности')], default='other', max_length=300), blank=True, null=True, size=None)),
                ('book_language', models.CharField(choices=[('en', 'English'), ('ru', 'Russian'), ('es', 'Spanish'), ('fr', 'French'), ('zh', 'Chinese'), ('de', 'German'), ('ja', 'Japanese')], default='en', max_length=30, verbose_name='Язык книги')),
                ('book_format', models.CharField(choices=[('paper', 'Бумажная'), ('online', 'Электронная')], default='online', max_length=30, verbose_name='Формат книги')),
                ('is_favorite', models.ManyToManyField(blank=True, related_name='favorite', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Книга',
                'verbose_name_plural': 'Книги',
                'db_table': 'book',
            },
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='favorite_user', to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorite', to='catalogue.products')),
            ],
            options={
                'verbose_name': 'Избранное',
                'verbose_name_plural': 'Избранные',
                'db_table': 'favorite',
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=100, verbose_name='Заголовок отзыва')),
                ('text', models.TextField(max_length=5000, verbose_name='Текст отзыва')),
                ('star', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='Звезда рейтинга')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review', to='catalogue.products')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='review_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Отзыв',
                'verbose_name_plural': 'Отзывы',
                'db_table': 'review',
            },
        ),
    ]

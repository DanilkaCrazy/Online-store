# Generated by Django 5.0.3 on 2024-04-25 12:10

import django_better_admin_arrayfield.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0004_alter_products_theme_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='theme_category',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(max_length=300), blank=True, choices=[('Использование систем управлений версиями (Git, SVN и т.д.)', 'Source Control'), ('Принципы работы с API', 'Api Work'), ('Умение работать в команде (навыки коммуникации, планирования, координации и совместной работы над проектом и т.д.).', 'Team Work'), ('Основы баз данных', 'Db Basics'), ('Принципы работы с базами данных (SQL, NoSQL, Oracle, MySQL и т.д.)', 'Db Advanced'), ('Методологии разработки программного обеспечения (Agile, Scrum, Waterfall и т.д.)', 'Developement Methods'), ('Принципы работы с сетями и протоколами (HTTP, HTTPS, TCP/IP, FTP и т.д.)', 'Networks Protocols'), ('Знания математики (линейная алгебра, теория вероятности и статистика, дифференциальные уравнения и т.д.)', 'Math Knowledge'), ('Методы машинного обучения (нейронные сети, классификация, регрессия, кластеризация и т.д.)', 'Machine Learning'), ('Принципы работы операционных систем (Windows, Linux, MacOS и т.д)', 'Os Basic'), ('Знание принципов оптимизации (оптимизация кода, оптимизация моделей, оптимизация алгоритмов и т.д.)', 'Optimization'), ('Другое', 'Other'), ('Основы моделирования процессов', 'Process Modeling'), ('Анализ конкурентов', 'Competitor Analysis'), ('Офисные приложения (MS Office)', 'Office Apps'), ('Работа с метриками', 'Metrics Work'), ('Знание фреймворков и библиотек (React, Angular, Vue.js и т.д.)', 'Frontend Framework'), ('Знание инстурментов автоматизации (Webpack, Gulp, Grunt и т.д.)', 'Frontend Automatization'), ('Владение инструментами тестирования (Jest, Mocha, Jasmine и т.д.)', 'Frontend Testing'), ('Знание принципов верстки и дизайна', 'Frontend Design'), ('Принципы оптимизации производительности', 'Frontend Optimization'), ('Навыки работы с графическими редакторами (Photoshop, Illustrator, Figma и т.д.)', 'Frontend Graphic'), ('Работа с системами управления базами данных (СУБД) и язык SQL', 'Backend Db'), ('Знание принципов архитектуры (MVC, MVP, MVVM и т.д.)', 'Backend Architecture'), ('Знание принципов безопасности (шифрование, аутентификация, авторизация, защита от атак и т.д.)', 'Backend Security'), ('Знание принципов оптимизации производительности (кэширование, индексирование, оптимизация запросов к базе данных и т.д.)', 'Backend Optimization'), ('Принципы структуры дизайна (композиция, цветовая гамма, типографика, баланс, контраст, пропорции и т.д.)', 'Design Principal'), ('Дизайнерские инструменты (Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Figma, Sketch и т.д.)', 'Design Tools'), ('Принципы пользовательского интерфейса (UI) и пользовательского опыта (UX) (навигация, интерактивность, отзывчивость, доступность и т.д.)', 'Design Ui'), ('Принципов брендинга (логотип, корпоративный стиль, визуальная идентичность и т.д.)', 'Design Brand'), ('Принципы верстки (HTML, CSS, JavaScript и т.д.)', 'Desing Frontend'), ('Принципы адаптивного дизайна (дизайн для различных устройств и размеров экрана и т.д.)', 'Design Adapt'), ('Визуализация данных (инфографика, диаграммы, графики и т.д.)', 'Design Visualization'), ('Принципы работы с изображениями (растровая и векторная графика, оптимизация изображений, цветовая коррекция и т.д.)', 'Design Images'), ('Работа с игровыми движками (Unity, Unreal Engine, CryEngine, Godot и т.д.)', 'Gamedev Engines'), ('Принципы игрового дизайна (геймплей, механика, уровни, сюжет, персонажи и т.д.)', 'Gamedev Design'), ('Принципы графического дизайна (моделирование, текстурирование, анимация, визуальные эффекты и т.д.)', 'Gamedev Graphics'), ('Звуковой дизайн (музыка, звуковые эффекты, озвучивание и т.д.)', 'Gamedev Sound'), ('Знание принципов физики и математики (физика движка, математическое моделирование, алгоритмы и т.д.)', 'Gamedev Physics'), ('Знание принципов оптимизации (оптимизация кода, оптимизация графики, оптимизация памяти и т.д.)', 'Gamedev Optimisation'), ('Знание принципов тестирования (отладка, тестирование, отзывы пользователей и т.д.)', 'Gamedev Test'), ('Принципы глубокого обучения (сверточные нейронные сети, повторяющиеся нейронные сети, генеративные состязательные сети и т.д.)', 'Deep Learning'), ('Знание естественного языкового процессинга (обработка текста, разметка текста, синтаксический анализ, семантический анализ и т.д.)', 'Natural Language'), ('Компьютерное зрения (распознавание образов, сегментация изображений, обнаружение объектов и т.д.)', 'Computer Vision'), ('Визуализация данных (Matplotlib, Seaborn, Tableau, Power BI и т.д.)', 'Datascience Visualization'), ('Знание инструментов обработки данных (Pandas, NumPy, SciPy, Scikit-learn и т.д.)', 'Datascience Work'), ('Принципы работы с большими данными (распределенные вычисления, обработка потоков данных, масштабируемость и т.д.)', 'Datascience Bigdata'), ('Инструменты автоматизации (Ansible, Chef, Puppet, Terraform и т.д.)', 'Devops Automatization'), ('Методы контейнеризации (Docker, Kubernetes и т.д.)', 'Devops Container'), ('Облачные технологий (Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) и т.д.)', 'Devops Cloud'), ('Системы мониторинга (Nagios, Zabbix, Prometheus, Grafana и т.д.)', 'Devops Monitor'), ('Системы непрерывной интеграции и непрерывного развертывания - CI/CD (Jenkins, Travis CI, CircleCI, GitLab CI и т.д.)', 'Devops Integration'), ('Знание принципов безопасности (шифрование, аутентификация, авторизация, управление доступом и т.д.)', 'Devops Security'), ('Владение методологиями тестирования (черный ящик, белый ящик, серый ящик, функциональное тестирование, нефункциональное тестирование, регрессионное тестирование, модульное тестирование, интеграционное тестирование, нагрузочное тестирование, стрессовое тестирование и т.д.)', 'Testing Methods'), ('Инструменты автоматизации тестирования (Selenium, Appium, TestComplete, Ranorex, JMeter и т.д.)', 'Testing Automatization'), ('Системы отслеживания ошибок (Jira, Bugzilla, Redmine и т.д.)', 'Testing Tracking'), ('Алгоритмы и структуры данных (алгоритмы сортировки, поиска, оптимизации, структуры данных и тд)', 'Cs Algoritm'), ('Архитектура компьютерных систем (процессоры, память, ввод-вывод, сети и т.д.)', 'Cs Architecture'), ('Математические методы в компьютерных науках (дискретная математика, линейная алгебра, теория вероятностей, статистика и т.д.)', 'Cs Math'), ('Инструменты разработки программного обеспечения (IDE, отладчики, профайлеры, системы управления версиями и т.д.)', 'Cs Tools')], null=True, size=None),
        ),
    ]

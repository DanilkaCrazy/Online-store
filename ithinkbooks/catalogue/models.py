from django.db import models
from django.utils.translation import gettext as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django_better_admin_arrayfield.models.fields import ArrayField
from users.models import User


# Create your models here.
#Категории книг
class Categories(models.Model):
    name = models.CharField(max_length = 150, unique=True, verbose_name='Категория')
    description = models.TextField(max_length = 200, verbose_name='Описание категории')
    slug = models.SlugField(max_length = 150, unique=True, blank=True, null=True, verbose_name='URL')

    class Meta:
        db_table = 'category'
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

#Книга
class Products(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    author = models.CharField(max_length=150, null=True, verbose_name='Автор')
    publisher = models.CharField(max_length=150, null=True, verbose_name='Издательство')
    isbn = models.CharField(max_length=100, null=True, verbose_name='ISBN')
    year = models.IntegerField(null=True, verbose_name='Год')
    number_of_pages = models.IntegerField( null=True, verbose_name='Количество страниц')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    #image = models.ImageField(upload_to='catalogue_images', blank=True, null=True, verbose_name='Изображение')
    price = models.DecimalField(default=0.00, max_digits=7, decimal_places=2, verbose_name='Цена')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    #Типы книг
    class BookTheme(models.TextChoices):
        FRONTEND = "frontend","Frontend"
        FULLSTACK = "fullstack", "FullStack"
        BACKEND = "backend","Backend"
        KUBERSECURITY = "Kubersecurity", "Кибербезопасность"
        MOBILEDEV = "mobiledev", "Мобильная разработка"
        DESIGN = "design","Дизайн"
        GAMEDEV = "gamedev","Gamedev"
        ANALYTICS = "analytics", "Analytics"
        AI = "ai", "AI"
        DATASCIENCE = "data", "Data Science"
        DEVOPS = "devops", "DevOps"
        QA = "qa", "Quality Assurance"
        COMPSCI = "CS","Computer Science" #Разбить на несколько
        OTHER = "OT","Other"
    class ProgrammingLanguage(models.TextChoices):
        JAVASCRIPT = "JavaScript"
        JAVA = "Java"
        PYTHON = "Python"
        CSHARP = "C#"
        CLANGUAGE = "C"
        CPLUS = "C++"
        SQL = "SQL"
        HTMLCSS = "HTMLCSS" #HTML и CSS Вместе, так как один без другого редко
        RUBY = "Ruby"
        PHP = "PHP"
        TYPESCRIPT = "TypeScript"
        ASSEMBLER = "Assembler"
        BASH_POWERSHELL = "Bash/Powershell"
        OTHER = "OT","Other"
    book_theme = models.CharField(max_length=30, choices=BookTheme, default = BookTheme.OTHER, verbose_name='Тема')
    book_themes = ArrayField( models.CharField(max_length=30, choices=BookTheme, default = BookTheme.OTHER), null=True, blank=True , verbose_name='Темы')
    programming_language = models.CharField(max_length=30, choices = ProgrammingLanguage, default = ProgrammingLanguage.OTHER, verbose_name='Язык программирования')
    programming_languages = ArrayField(models.CharField(max_length=30, choices = ProgrammingLanguage, default = ProgrammingLanguage.OTHER), null=True, blank=True, verbose_name='Языки программирования')
    #Типы переплета
    class BookBinding(models.TextChoices):
        SOFTCOVER = "Мягкий переплет"
        HARDCOVER = "Твердый переплет"
    #Выбор переплета
    book_bindings = models.CharField(max_length=30, choices = BookBinding, default = BookBinding.SOFTCOVER,verbose_name='Переплёт')
    #Перевод
    class Translator(models.TextChoices):
        TRANSLATE = "Имя переводчика"
        NOTRANSLATE = "Отсутствует"
    #Выбор перевода
    translator_choice = models.CharField (max_length=30, choices = Translator, default=Translator.TRANSLATE, verbose_name='Переводчик')
    #Уровень книги - для роадмапа
    level = models.IntegerField(default=1, verbose_name='Уровень книги', validators=[MinValueValidator(0), MaxValueValidator(5)])
    #Категория конкретной темы
    class THEME_CATEGORIES(models.TextChoices):
        #Общее (в нескольких темах)
        source_control = "source_control", "Использование систем управлений версиями (Git, SVN и т.д.)"
        api_work = "api_work", "Принципы работы с API"
        team_work = "team_work", "Умение работать в команде (навыки коммуникации, планирования, координации и совместной работы над проектом и т.д.)."
        db_basics = "db_basics", "Основы баз данных"
        db_advanced = "db_advanced", "Принципы работы с базами данных (SQL, NoSQL, Oracle, MySQL и т.д.)"
        developement_methods = "developement_methods", "Методологии разработки программного обеспечения (Agile, Scrum, Waterfall и т.д.)"
        networks_protocols = "networks_protocols", "Принципы работы с сетями и протоколами (HTTP, HTTPS, TCP/IP, FTP и т.д.)"
        math_knowledge = "math_knowledge", "Знания математики (линейная алгебра, теория вероятности и статистика, дифференциальные уравнения и т.д.)"
        machine_learning = "machine_learning", "Методы машинного обучения (нейронные сети, классификация, регрессия, кластеризация и т.д.)"
        os_basic = "os_basic", "Принципы работы операционных систем (Windows, Linux, MacOS и т.д)"
        optimization = "optimization", "Знание принципов оптимизации (оптимизация кода, оптимизация моделей, оптимизация алгоритмов и т.д.)"
        other = "other", "Другое"
        #Аналитика
        process_modeling = "process_modeling", "Основы моделирования процессов"
        competitor_analysis = "competitor_analysis", "Анализ конкурентов"
        office_apps = "office_apps", "Офисные приложения (MS Office)"
        metrics_work = "metrics_work", "Работа с метриками"
        think_analysis = "think_analysis", "Аналитическое мышление"
        risks_analytics = "risks_analytics", "Оценка рисков"
        #Фронтенд
        frontend_framework = "frontend_framework", "Знание фреймворков и библиотек (React, Angular, Vue.js и т.д.)"
        frontend_automatization = "frontend_automatization", "Знание инстурментов автоматизации (Webpack, Gulp, Grunt и т.д.)"
        frontend_testing = "frontend_testing", "Владение инструментами тестирования (Jest, Mocha, Jasmine и т.д.)"
        frontend_design = "frontend_design", "Знание принципов верстки и дизайна"
        frontend_optimization = "frontend_optimization", "Принципы оптимизации производительности"
        frontend_graphic = "frontend_graphic", "Навыки работы с графическими редакторами (Photoshop, Illustrator, Figma и т.д.)"
        #Бэкенд
        backend_db = "backend_db", "Работа с системами управления базами данных (СУБД) и язык SQL"
        backend_architecture = "backend_architecture", "Знание принципов архитектуры (MVC, MVP, MVVM и т.д.)"
        backend_security = "backend_security", "Знание принципов безопасности (шифрование, аутентификация, авторизация, защита от атак и т.д.)"
        backend_optimization = "backend_optimization", "Знание принципов оптимизации производительности (кэширование, индексирование, оптимизация запросов к базе данных и т.д.)"
        #Дизайн
        design_principal = "design_principal", "Принципы структуры дизайна (композиция, цветовая гамма, типографика, баланс, контраст, пропорции и т.д.)"
        design_tools = "design_tools", "Дизайнерские инструменты (Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Figma, Sketch и т.д.)"
        design_ui = "design_ui", "Принципы пользовательского интерфейса (UI) и пользовательского опыта (UX) (навигация, интерактивность, отзывчивость, доступность и т.д.)"
        design_brand = "design_brand", "Принципов брендинга (логотип, корпоративный стиль, визуальная идентичность и т.д.)"
        desing_frontend = "desing_frontend", "Принципы верстки (HTML, CSS, JavaScript и т.д.)"
        design_adapt = "design_adapt", "Принципы адаптивного дизайна (дизайн для различных устройств и размеров экрана и т.д.)"
        design_visualization = "design_visualization", "Визуализация данных (инфографика, диаграммы, графики и т.д.)"
        design_images = "design_images", "Принципы работы с изображениями (растровая и векторная графика, оптимизация изображений, цветовая коррекция и т.д.)"
        #Геймдев
        gamedev_engines = "gamedev_engines", "Работа с игровыми движками (Unity, Unreal Engine, CryEngine, Godot и т.д.)"
        gamedev_design = "gamedev_design", "Принципы игрового дизайна (геймплей, механика, уровни, сюжет, персонажи и т.д.)"
        gamedev_graphics = "gamedev_graphics", "Принципы графического дизайна (моделирование, текстурирование, анимация, визуальные эффекты и т.д.)"
        gamedev_sound = "gamedev_sound", "Звуковой дизайн (музыка, звуковые эффекты, озвучивание и т.д.)"
        gamedev_physics = "gamedev_physics", "Знание принципов физики и математики (физика движка, математическое моделирование, алгоритмы и т.д.)"
        gamedev_optimisation = "gamedev_optimisation", "Знание принципов оптимизации (оптимизация кода, оптимизация графики, оптимизация памяти и т.д.)"
        gamedev_test = "gamedev_test", "Знание принципов тестирования (отладка, тестирование, отзывы пользователей и т.д.)"
        #AI
        deep_learning = "deep_learning", "Принципы глубокого обучения (сверточные нейронные сети, повторяющиеся нейронные сети, генеративные состязательные сети и т.д.)"
        natural_language = "natural_language", "Знание естественного языкового процессинга (обработка текста, разметка текста, синтаксический анализ, семантический анализ и т.д.)"
        computer_vision = "computer_vision", "Компьютерное зрение (распознавание образов, сегментация изображений, обнаружение объектов и т.д.)"
        #Data Science
        datascience_visualization = "datascience_visualization", "Визуализация данных (Matplotlib, Seaborn, Tableau, Power BI и т.д.)"
        datascience_work = "datascience_work", "Знание инструментов обработки данных (Pandas, NumPy, SciPy, Scikit-learn и т.д.)"
        datascience_bigdata = "datascience_bigdata", "Принципы работы с большими данными (распределенные вычисления, обработка потоков данных, масштабируемость и т.д.)"
        #Devops
        devops_automatization = "devops_automatization", "Инструменты автоматизации (Ansible, Chef, Puppet, Terraform и т.д.)"
        devops_container = "devops_container", "Методы контейнеризации (Docker, Kubernetes и т.д.)"
        devops_cloud = "devops_cloud", "Облачные технологий (Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) и т.д.)"
        devops_monitor = "devops_monitor", "Системы мониторинга (Nagios, Zabbix, Prometheus, Grafana и т.д.)"
        devops_integration = "devops_integration", "Системы непрерывной интеграции и непрерывного развертывания - CI/CD (Jenkins, Travis CI, CircleCI, GitLab CI и т.д.)"
        devops_security = "devops_security", "Знание принципов безопасности (шифрование, аутентификация, авторизация, управление доступом и т.д.)"
        #Testing
        testing_methods = "testing_methods", "Владение методологиями тестирования (черный ящик, белый ящик, серый ящик, функциональное тестирование, нефункциональное тестирование, регрессионное тестирование, модульное тестирование, интеграционное тестирование, нагрузочное тестирование, стрессовое тестирование и т.д.)"
        testing_automatization = "testing_automatization", "Инструменты автоматизации тестирования (Selenium, Appium, TestComplete, Ranorex, JMeter и т.д.)"
        testing_tracking = "testing_tracking", "Системы отслеживания ошибок (Jira, Bugzilla, Redmine и т.д.)"
        #Computer Science (CS)
        cs_algoritm = "cs_algoritm", "Алгоритмы и структуры данных (алгоритмы сортировки, поиска, оптимизации, структуры данных и тд)"
        cs_architecture = "cs_architecture", "Архитектура компьютерных систем (процессоры, память, ввод-вывод, сети и т.д.)"
        cs_math = "cs_math", "Математические методы в компьютерных науках (дискретная математика, линейная алгебра, теория вероятностей, статистика и т.д.)"
        cs_tools = "cs_tools", "Инструменты разработки программного обеспечения (IDE, отладчики, профайлеры, системы управления версиями и т.д.)"
        #Mobile Develop (mobiledev)
        mobile = "mobile", "Понимание особенностей мобильных устройств, архитектуры и инструментов разработки для конкретной платформы (Android или IOS)"
        bd_exp = "bd_exp", "Опыт работы с базами данных (знания SQL, опыт работы с ORM-фреймворками"
        network = "network", "Опыт работы с сетями (знание протоколов HTTP/HTTPS, опыт работы с RESTful API)"
        algoritms = "algoritms", "Знания алгоритмов и структур данных"
        testing = "testing", "Подходы и инструменты для тестирования мобильных приложений"
        control_version = "control_version", "Системы контроля версий (Git и другие)"
        design = "design", "Понимание принципов UX/UI - дизайна, опыт работы с графическими редакторами"

        #Кибербезопасность (Kubersecurity)
        operation_systems = "operation_systems", "Операционные системы"
        networks = "networks", "Сети"
        systems_of_security = "systems_of_security", "Системы безопасности: основы конфиденциальности, целостности и доступности информации; системы аутентификации, шифрования и защиты периметра"
        pentest = "pentest", "Атаки на проникновение и защита"
        monitoring = "monitoring", "Мониторинг и реагирование на инциденты"
        instruments = "instruments", "Владение инструментами безопасности"
        standarts = "standarts","Знание стандартов и практик безопасности"

        #FULLSTACK (fullstack) - см. теги бэка и фронта
    theme_category = ArrayField(models.CharField(max_length=300, choices=THEME_CATEGORIES, default=THEME_CATEGORIES.other), null=True, blank=True)
    #Настоящий язык книги
    class BookLanguage(models.TextChoices):
        ENGLISH = "en", "English"
        RUSSIAN = "ru", "Russian"
        SPANISH = "es", "Spanish"
        FRENCH = "fr", "French"
        CHINESE = "zh", "Chinese"
        GERMAN = "de", "German"
        JAPANESE = "ja", "Japanese"
    book_language = models.CharField(max_length=30, choices=BookLanguage, default=BookLanguage.ENGLISH, verbose_name='Язык книги')
    #Форма книги - бумажная или электронная
    class BookFormat(models.TextChoices):
        PAPER = "paper", "Бумажная"
        ONLINE = "online", "Электронная"
    book_format = models.CharField(max_length=30, choices=BookFormat, default=BookFormat.ONLINE, verbose_name="Формат книги")
    is_favorite = models.ManyToManyField(User, related_name='favorite', blank=True)
    class Meta:
        db_table = 'book'
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def __str__(self):
        return self.name

#Звезды отзыва
class RatingStar(models.Model):
    #star_value = models.SmallIntegerField(default=0, verbose_name='Звезда рейтинга')
    star_value = models.DecimalField(default=0, verbose_name='Звезда рейтинга', max_digits=2, decimal_places=1)
    def __str__(self):
        return f"{self.star_value}"
    class Meta:
        db_table = 'rating_star'
        verbose_name = 'Звезда рейтинга'
        verbose_name_plural = 'Звёзды рейтинга'

#Отзыв 
class Review(models.Model):
    #В будущем добавить связь с пользователем (аватарки и роль)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='review')
    title = models.TextField(max_length=100, verbose_name = 'Заголовок отзыва')
    text = models.TextField( max_length=5000, verbose_name = 'Текст отзыва')
    star = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], verbose_name='Звезда рейтинга')
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='review_user')
    #Реализовать Upvote/Downvote
    class Meta:
        db_table = 'review'
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
    
    def __str__(self):
        return f"{self.title} - {self.product}"

#Избранное
class Favorite(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='favorite')
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='favorite_user')
    class Meta:
        db_table = 'favorite'
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранные'
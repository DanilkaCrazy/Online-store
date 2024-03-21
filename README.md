# Разработка книжного интернет-магазина "IThink Books"

Уникальное предложение проекта заключается в комбинации широкого выбора книг по IT, индивидуальных роадмапов, персонализированного опыта и активного социального взаимодействия. Мы стремимся предоставить пользователям удобную и информативную платформу для развития в сфере информационных технологий.

## Описание проекта

**Целью нашего проекта** является создание и успешное функционирование интернет-магазина книг по IT, который предоставит пользователю удобную платформу для выбора и приобретения книг, специализированных в различных областях информационных технологий. Мы стремимся стать ведущим поставщиком книг в сфере IT и оказать полезную поддержку профессионалам, студентам и любителям этой отрасли.

Основной **целью нашего продукта**, интернет-магазина книг по IT, является предоставление удобной и разносторонней платформы для поиска, выбора и приобретения книг, относящихся к различным областям информационных технологий. Мы стремимся предложить широкий каталог книг, включающий как классические, так и новейшие издания, чтобы удовлетворить потребности разнообразной аудитории. 
Наш продукт также нацелен на предоставление персонализированного опыта пользователя. Мы планируем разработать систему тестирования, которая поможет каждому пользователю индивидуально определить свои потребности и предоставит рекомендации по подбору книг, соответствующих его профессиональным целям и уровню знаний. Мы стремимся помочь пользователям построить свой собственный роадмап развития в IT и обеспечить им доступ к актуальным и полезным ресурсам. Кроме того, мы также стремимся создать активное сообщество вокруг нашего продукта, где пользователи смогут обмениваться отзывами, рекомендациями и опытом. Мы хотим, чтобы наш интернет-магазин стал не только местом для покупки книг, но и платформой для взаимодействия и обучения в области IT.

### Целевая аудитория:
- Студенты технических направлений;
- Специалисты IT-отраслей;
- Все, кто интересуется IT или хочет поглубже изучить отдельные темы.

### Географические рамки проекта:
- Электронный вариант: покупка из любой точки мира;
- Бумажный вариант (на русском языке): только по России.

### Критерии приемки/Результат проекта:
1. Реализованы все функции личного кабинета (в дальнейшем ЛК);
2. Разработана модель тестирования пользователей для составления роадмапа;
3. Реализованы интерфейсы: страницы книги, корзины, процессов ее покупки и оплаты картой (этапы доведения пользователя до конечного результата).

![Screenshot_1](https://github.com/DanilkaCrazy/Online-store/assets/95550202/db36bad9-a58b-46a2-8b12-bc6b1651b80b)

### Форматы книг:
- Электронный (все книги на ин. языках);
- Электронный и бумажный (для книг на русском языке).

### Форматы для загрузки электронных книг:
- EPUB – довольно популярный формат в книжной индустрии, одна из примечательных функций: возможность переконвертирования в любой другой формат;
- PDF – самый удобочитаемый и привлекательный с точки зрения пользования формат;
- DOC (DOCX) – формат редактора Word;
- FB2 – самый распространенный формат в РФ.

## Обзор аналогов

Проведение анализа конкурентов, включая Лабиринт, ЛитРес, Читай-город, Booken, O'Reilly, Packt, а также проведение SWOT-анализа для определения преимуществ, недостатков, возможностей и угроз интернет-магазина, а также формулировка стратегии развития. 

Ссылка на Яндекс.Диск по каждому виду анализа: https://disk.yandex.ru/d/zlcy8AnMpXKPIw

Сравнительный (матричный) анализ конкурентов с выделением используемых функций:

![Screenshot_3](https://github.com/DanilkaCrazy/Online-store/assets/95550202/d0f31178-5b6c-423e-b7a4-72a17e890d3e)

В ходе сравнительного анализа были выделены конкурентные функции, которые станут основой при проектировании и разработке интернет-магазина «IThink». Стоит отметить, что некоторые функции остаются под вопросом, их реализация может стать дополнительным функционалом магазина, а может быть отброшена по решению команды, впоследствие разработки.

Анализ конкурентов через методологию SWOT:

![Screenshot_2](https://github.com/DanilkaCrazy/Online-store/assets/95550202/221c35b2-eafe-4b51-8232-e98b5907f8c1)

При проведении SWOT – анализа, помимо многих различных функций, были отмечены и общие (базовые) принципы, составляющие необходимый минимальный функционал для каждого из представленных магазинов.

## Проектирование сайта
В процессе проектирования мы определяем зачем нужен интернет-магазин, как он будет решать проблемы и боли клиентов, какие в нем будут разделы и как они будут выглядеть.

### Описание ролей
- Незарегистрированный пользователь - автоматическая роль при заходе пользователя на сайт;
- Зарегистрированный пользователь - пользователь, которому доступны базовые функции сайта;
- Администратор - привилегированный пользователь системы (имеет админ-права и соответствующие функции).

### Моделирование процессов интернет-магазина
При моделировании был использован сервис draw.io, через BPMN (Нотация моделирования бизнес-процессов) составлен бизнес-процесс "Доведения пользователя до целевого действия". Под целевым действием понимается покупка книги.

![Screenshot_4](https://github.com/DanilkaCrazy/Online-store/assets/95550202/fa037871-6ba3-47a2-a1f2-cf54d2034134)


Моделирование функционала ролей строилось на основе диаграммы вариантов использования (диаграмма прецендентов) с использованием языка моделирования UML через draw.io.

![Screenshot_5](https://github.com/DanilkaCrazy/Online-store/assets/95550202/acde4d85-6ebe-4352-bc55-aea8f1b73d2b)


### Структура проекта: формирование разделов, подразделов и функционала сайта

#### Функции системы:
- Целевое действие: покупка книги;
- Прохождение роадмапа (построение персонализированной подборки книг);
- Написание рецензий по книге;
- Возможно: выгрузка отчетов по продажам для администратора

**Header**
- Название сайта (бренд);
- Каталог книг - делится на подразделы в зависимости от тематики книжек: Backend, Frontend, Аналитика и т.д..;
- Поиск - при нажатии может сортировать книги по необходимым критериям;
- Построить роадмап;
- Переключение темы (Темная и Светлая);
- Избранные товары;
- Корзина (иконка) - можно перейти: посмотреть, добавить или удалить товар;
- Личный кабинет (иконка) - пользователь может вводить ФИО (также можно использовать анонимизацию: возможность задать аватар и показывать его на сайте, при желании скрыть ФИО и показывать только логин), информацию о себе.
    
**Footer**
- Название сайта (бренд);
- Контакты (соц. сети, телефон, почта - по вкусу);
- Партнеры;
- Акции;
- Отображение каталога и его подразделов;
- Помощь: 1) Составление роадмапа (текстовое описание: что это и как работает), 2) Оплата и доставка, 3) Вопросы и ответы, 4) Обратная связь.

#### Главная страница:
- Наполенение сайта: у каждой книги есть цена, количество, экземпляр (бумажный или электронный), предложенные форматы, можно реализовать функцию предпросмотра;
- Возможная прокрутка с тематикой книг.

#### Личный кабинет:
- Фото (можно добавить пользователю);
- Небольшое описание (ФИО или Логин, о себе);
- История покупок;
- Сохраненные роадмапы (не более 3);
- Просмотр корзины;
- Настройки (использовать логин заместо ФИО, еще что-то можно продумать);
- Рецензии.

#### Каталог книг:
- Наполнение (товары): их можно купить, добавить в избранное, удалить;
- Фильтр поиска: языки, форматы, темы, цена, год издания.

#### Страница книги:
- Обложка;
- Формат: электронный/бумажный;
- Действие: купить;
- Характеристики;
- Описание;
- Отзывы (сортировка по отзывам);
- Предпросмотр;
- Подобные товары к которым можно перейти.

#### Действия:
**Войти на сайт, как зарегистрированный пользователь**
- Маркетинговое предложение: при регистрации скидка 15% на первую покупку;
- Пройти процедуру регистрации: ввести логин, пароль, повторить пароль, ФИО, эл. почта, номер телефона, дата рождения, населенный пункт, статус, профессия, о себе.
- Пройти процедуру авторизации: логин и пароль.
На данном этапе могут возникнуть дополнительные требования к обеспечению безопасности: пароль должен быть сложным (содержание не менее 8 символов, строчные и заглавные буквы латинского языка, специальные символы, без пробелов), письмо о подтверждении регистрации отправляется на почту, ограничение числа попыток входа в систему (защищает от атак методом перебора).

**Покупка книги**
- Заполнение формы (Контакты: номер тел, адрес эл. почты, адрес доставки - если формат бумажный);
- Оплата заказа;
- Доставка (на почту - если выбран эл. формат, на адрес - если формат бумажный).

**Прохождение роадмапа**
- Доступно только для зарегистрированных пользователей;
- Нажать на кнопку: построить роадмап;
- Пройти роадмап (выбрать ответы, предложенные в тестовой форме);
- Можно сохранить результат (не более 3-х раз, потом будет доступна возможность удаления роадмапов - чтобы не тратилась память).

**Написание рецензии**
- Перейти на страницу книги;
- Написание рецензиции и ее публикация (проходит проверку администратора).









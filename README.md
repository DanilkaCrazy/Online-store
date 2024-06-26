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

### Моделирование процессов и функций интернет-магазина:
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
- Наполнение сайта: у каждой книги есть цена, количество, экземпляр (бумажный или электронный), предложенные форматы, можно реализовать функцию предпросмотра;
- Возможная прокрутка с тематикой книг.

#### Личный кабинет:
- Фото (можно добавить пользователю);
- Небольшое описание (Имя или Логин, о себе);
- История покупок;
- Сохраненные роадмапы (не более 3);
- Просмотр корзины;
- Настройки;
- Рецензии.
  
#### Каталог книг:
- Наполнение (товары): их можно купить, добавить в избранное, удалить;
- Сортировка: популярность;
- Фильтр поиска: языки, форматы, темы, цена, год издания.
Предоставлен список книг. У каждой книги есть обложка, название, автор, рейтинг (0–5 звёзд, TODO: что показывается, если нет рецензий?), цена, кнопка «Купить» для добавления в корзину. На каждую книгу можно нажать, чтобы перейти на отдельную страницу и получить более подробное описание.
Каталог можно сортировать по:
- Популярность, (TODO: добавить фильтры).
Каталог можно фильтровать по следующим параметрам:
- Язык (русский, английский, испанский и т. д.);
- Формат (печатный, электронный);
- Тема (гейм-дизайн, программирование, графика и т. д.);
- Цена;
- Год издания.
  
#### Страница книги:
- Обложка;
- Название;
- Автор;
- Формат: электронный/бумажный;
- Действие: купить;
- Характеристики: издательство, год, кол-во страница,  ISBN, Тип переплёта, переводчик, тип (Фронтенд, бэкенд и т.д. Язык программирования)
- Описание;
- Отзывы (сортировка по отзывам):
	- Дан общий рейтинг на основе всех отзывов (0–5 звёзд). Написано число отзывов;
	- Отзывы можно сортировать (Популярность, TODO: другие методы сортировки).
- Предпросмотр;
- Подобные товары к которым можно перейти.
  
#### Отзыв:
Состоит из непосредственно самого отзыва и его заголовка, также показаны имя пользователя и его статус работы.
Отзыв состоит из:
- Заголовок;
- Текст отзыва;
- Имя пользователя, оставившего отзыв, и его изображение (аватар);
- Статус работы пользователя, оставившего отзыв;
- Рейтинг книги от пользователя (0–5 звёзд);
- Рейтинг отзыва (Upvote/Downvote).
  
#### Корзина:
В разделе корзина показаны книги, которые находятся в корзине пользователя. Можно купить их отдельно друг от друга, нажав на кнопку «Купить» под каждой книгой или купить все вместе нажав на кнопку «Купить все». Можно убрать книги из корзины, можно сделать это по отдельности нажав на кнопку «Убрать» под определенной книгой или убрать все нажав на кнопку «Убрать все». 

#### История покупок:
Видны покупки, совершенные пользователем в прошлом. По клику на покупку можно увидеть книги, которые были приобретены. По клику на книгу может перейти на её страницу.

#### Роадмапы:
Пользователь может создавать роадмапы на основе предложенных профессий или интересов и прохождения теста, для пользователя в определенный момент доступны только 3 роадмапа. Роадмап состоит из книг, соответствующих специализации, которыми интересуется пользователь.

#### Рецензии:
Видны рецензии, оставленные пользователем, и книги, на которые эти рецензии писались. По клику на книгу можно перейти на её страницу.

#### Доп. элементы:
- Под параметрами находится кнопка «Купить», по клику на неё книга добавляется в корзину;
- В самом низу страницы расположены похожие книги;
- На странице каждой книге можно построит роадмап нажав на кнопку «Построить роадмап» в верхней панели.

#### Действия:
**Войти на сайт, как зарегистрированный пользователь (Регистрация и Авторизация)**
- Маркетинговое предложение: при регистрации скидка 15% на первую покупку;
- Пройти процедуру регистрации (если у пользователя нет аккаунта, то по клику на кнопку «Зарегистрироваться» ниже поля пароль открывается форма регистрации нового пользователя со следующими полями): ввести логин, пароль, повторить пароль, имя (никнейм – его видят другие пользователи), эл. почта, номер телефона (необязательно), дата рождения, населенный пункт, статус работы (Junior, Middle, Senior, стажёр, студент), специальность.
На данном этапе могут возникнуть дополнительные требования к обеспечению безопасности: пароль должен быть сложным (содержание не менее 8 символов, строчные и заглавные буквы латинского языка, специальные символы, без пробелов), письмо о подтверждении регистрации отправляется на почту, ограничение числа попыток входа в систему (защищает от атак методом перебора).
- Пройти процедуру авторизации: логин и пароль. (Открывается форма авторизации пользователя по клику на кнопку профиля в левом верхнем углу.)
- Если пользователь уже авторизирован, то открывается его профиль.

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

### Проектирование БД. Разработка инфологической модели:
На данном этапе рекомендуется использовать SQLite. Она является легковесной, встроенной базой данных, которая хранит данные в одном файле. Она удобна для разработки и тестирования, так как не требует установки и настройки отдельного сервера базы данных. SQLite может быть хорошим выбором для небольших проектов или на начальных этапах разработки, но может иметь ограничения по производительности и масштабируемости для крупных интернет-магазинов. В дальнейшем есть возможность перейти в PostreSQL.

#### Структура спроектированной базы данных:
![Структура](https://github.com/DanilkaCrazy/Online-store/assets/95550202/70687f79-c12f-498d-86bf-cf7ea9127cd1)

#### Инфологическая модель спроектированной структуры:
![Инфологическая модель](https://github.com/DanilkaCrazy/Online-store/assets/95550202/130daaa5-9d99-4836-bb6e-d28334e3fb2e)

### User stories (Пользовательские истории)
Описание проекта: Интернет-магазин "IThink Books" представляет собой уникальный проект, который сочетает в себе широкий выбор книг по информационным технологиям, персонализированный опыт для пользователей и активное социальное взаимодействие. Наша цель - предоставить удобную и информативную платформу для развития в сфере IT, помочь пользователям выбрать книги, соответствующие их интересам и профессиональным целям, а также создать сообщество единомышленников.

![Screenshot_2](https://github.com/DanilkaCrazy/Online-store/assets/95550202/dc434f9d-671b-4392-bbbf-f9a38d9fa583)






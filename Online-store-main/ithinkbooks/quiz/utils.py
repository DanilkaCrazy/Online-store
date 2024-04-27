from quiz.models import Quiz, Question, Answer, Result, Roadmap, RoadmapNode
from catalogue.models import Products

#def calculateTestResults(Quiz, Result):
 #   if (Quiz.Question.question_type == 'LEVEL'):
#        level == Quiz.Question.Answer.value
def formRoadmap(result, user):
    products_main = Products.objects.filter(book_theme=result.theme) #Главный фильтр - по теме
    roadmap = Roadmap.objects.create(result=result, user = user, title=f"{user} roadmap")
    #Цену фильтруем для всех
    products_main = products_main.filter(price__lt=int(result.price))
    if (result.theme == "OT"):
        products_main.filter(book_theme=result.theme_other)
    else:
        products_main = products_main.filter(level__gt=int(result.level)) #Фильтрация по опыту пользователя
        #products_main = products_main.filter(programming_language=result.prog_lang) Фильтрация по языку программирования - выключена, т.к. книг мало в роадмапе и без неё
    for i in products_main:
        roadmap_node = RoadmapNode.objects.create(node_level=i.level, roadmap=roadmap) 
        roadmap_node.product.set([i])
        roadmap_node.save()
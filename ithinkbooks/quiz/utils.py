from quiz.models import Quiz, Question, Answer, Result, Roadmap, RoadmapNode, ObjectCount
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
        #if (result.programmed_before==1): #Если не программировал, то сразу с нуля
         #   products_main = products_main.filter(level__gt=0) #Фильтрация по опыту пользователя
        #else:
        products_main = products_main.filter(level__gt=int(result.level)) #Фильтрация по опыту пользователя
        #products_main = products_main.filter(programming_language=result.prog_lang) #Фильтрация по языку программирования
        products_main_theme = products_main.filter(theme_category__contains = [result.theme_specific])
        count = products_main_theme.count()
        if count>5:
            products_main = products_main_theme
        ObjectCount.objects.create(object_count=count)
    for i in products_main:
        roadmap_node = RoadmapNode.objects.create(node_level=i.level, roadmap=roadmap) 
        roadmap_node.product.set([i])
        roadmap_node.save()
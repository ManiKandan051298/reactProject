from django.contrib import admin
from .models import User
from .models import *
admin.site.register(User)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Topic)
admin.site.register(Article)
admin.site.register(UserTopic)
admin.site.register(UserChoice)
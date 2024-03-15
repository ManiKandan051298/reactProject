from django.db import models
from django.utils import timezone

class User(models.Model):
    username = models.CharField(max_length=100)
    email    = models.CharField(max_length =100, unique=True )
    password = models.CharField(max_length=100)


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published',default=timezone.now)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
    
class Topic(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    image_url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=1200)
    content = models.TextField()
    pub_date = models.DateTimeField('date published', default=timezone.now)
    image_url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title
    

class UserTopic(models.Model):
    STATUS_CHOICES = [
        (1, 1),
        (2, 2),
        (3, 3),
    ]
    DEFAULT_STATUS = 1
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    status = models.IntegerField( choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('user', 'topic') 

class UserChoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'question'], name='unique_user_question')
        ]

    def __str__(self):
        return f"{self.user.username} - {self.question.question_text}"
    
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'question', 'choice_text', 'votes']
        depth = 1

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'choices']
        depth = 1

        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'description', 'image_url']
        depth = 1

class ArticleSerializer(serializers.ModelSerializer):
    topic = TopicSerializer()
    class Meta:
        model = Article
        fields = ['id', 'topic', 'title', 'content', 'pub_date' ,"image_url"]
        depth = 1

class UserTopicSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    topic = TopicSerializer()  # Nested serializer for Topic
    class Meta:
        model = UserTopic
        fields = ['id', 'user', 'topic', 'status']
        

class UserChoiceSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    question = QuestionSerializer()
    choice = ChoiceSerializer()

    class Meta:
        model = UserChoice
        fields = ['id', 'user', 'question', 'choice']
        depth = 1


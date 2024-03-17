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
        fields = ['id', 'choice_text']

class QuestionSerializer(serializers.ModelSerializer):
    # choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'pub_date']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        question_id = data['id']
        choices_queryset = Choice.objects.filter(question_id=question_id)
        choices_serializer = ChoiceSerializer(choices_queryset, many=True)
        data['choices'] = choices_serializer.data
        return data
        
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


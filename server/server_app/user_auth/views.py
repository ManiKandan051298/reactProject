from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
import os

@api_view(['POST'])
def upload_audio_file(request):
    if request.method == 'POST' and request.FILES.get('audio_file'):
        audio_file = request.FILES['audio_file']
        file_path = os.path.join('test/', audio_file.name)

        # Save the file to the specified location
        with open(file_path, 'wb') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)

        return Response({'message': 'File uploaded successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No audio file provided'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'signup success','status':1}, status=status.HTTP_200_OK)
    return Response({'message':serializer.errors, 'status':0}, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username,password)
    user = User.objects.filter(username=username, password=password).first()
    if user:
        return Response({'message': 'Login successful','status': 1}, status=status.HTTP_200_OK)
    return Response({'message': 'Invalid credentials','status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def question_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def question_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({'message': '404','status': 0},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1})
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        question.delete()
        return Response({'message': 'success','status': 1},status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def choice_list(request):
    if request.method == 'GET':
        choices = Choice.objects.all()
        serializer = ChoiceSerializer(choices, many=True)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'POST':
        serializer = ChoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def choice_detail(request, pk):
    try:
        choice = Choice.objects.get(pk=pk)
    except Choice.DoesNotExist:
        return Response({'message': '404','status': 0},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChoiceSerializer(choice)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'PUT':
        serializer = ChoiceSerializer(choice, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1})
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        choice.delete()
        return Response({'message': 'success','status': 1},status=status.HTTP_200_OK)



@api_view(['GET', 'POST'])
def topic_list(request):
    if request.method == 'GET':
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'POST':
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def topic_detail(request, pk):
    try:
        topic = Topic.objects.get(pk=pk)
    except Topic.DoesNotExist:
        return Response({'message': '404','status': 0},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TopicSerializer(topic)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'PUT':
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1})
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        topic.delete()
        return Response({'message': 'success','status': 1},status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response({'message': '404','status': 0},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1})
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        article.delete()
        return Response({'message': 'success','status': 1},status=status.HTTP_200_OK)
    

@api_view(['GET', 'POST'])
def usertopic_list(request):
    if request.method == 'GET':
        usertopics = UserTopic.objects.all()
        serializer = UserTopicSerializer(usertopics, many=True)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'POST':
        serializer = UserTopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def usertopic_detail(request, pk):
    try:
        usertopic = UserTopic.objects.get(pk=pk)
    except UserTopic.DoesNotExist:
        return Response({'message': '404','status': 0},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserTopicSerializer(usertopic)
        return Response({'message': serializer.data,'status': 1})
    elif request.method == 'PUT':
        serializer = UserTopicSerializer(usertopic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data,'status': 1})
        return Response({'message': serializer.errors,'status': 0}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        usertopic.delete()
        return Response({'message': 'success','status': 1},status=status.HTTP_200_OK)
    
    
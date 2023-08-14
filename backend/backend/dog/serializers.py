from rest_framework import serializers
from .models import Dog

class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'

class DogInfo(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = ['id', 'name', 'img']

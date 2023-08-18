from rest_framework import serializers
from .models import Dog, WeightRecord, CheckListItem


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'


class DogInfo(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = ['id', 'name', 'img']


class CheckListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckListItem
        fields = '__all__'


# 맞춤 일지
class WeightRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightRecord
        fields = '__all__'

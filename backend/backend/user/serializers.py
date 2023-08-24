from datetime import date
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class JWTJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'name', 'nickname', 'phone']

    def validate(self, data):
        email = data.get('email', None)

        if User.objects.filter(email=email, is_deleted=False).exists():
            raise serializers.ValidationError("이미 존재하는 계정입니다.")

        data['created_at'] = date.today()
        data['updated_at'] = date.today()
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            nickname=validated_data['nickname'],
            phone=validated_data['phone'],
        )
        return user


class JWTLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = fields = ['email', 'password']

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user:
            token = RefreshToken.for_user(user)
            return {
                'user': user,
                'refresh': str(token),
                'access': str(token.access_token)
            }
        raise serializers.ValidationError("인증 정보가 잘못되었습니다.")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['id', 'email', 'password', 'phone', 'name', 'nickname', 'created_at', 'updated_at', 'is_deleted']

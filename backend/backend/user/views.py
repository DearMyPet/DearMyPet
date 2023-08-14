from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Point
from .serializers import *
from rest_framework import status
from rest_framework.response import Response

# 회원가입
class Join(APIView):
    def post(self, request):
        serializer = JWTJoinSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return JsonResponse(
                {
                    'user': UserSerializer(user).data,
                    'access': str(token.access_token),
                    'refresh': str(token)
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그인
class Login(APIView):
    def post(self, request):
        # request.data = User.objects.filter(is_deleted=False)
        serializer = JWTLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return JsonResponse(
                {
                    'id': user.id,
                    'access': serializer.validated_data['access'],
                    'refresh': serializer.validated_data['refresh']
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그아웃
class Logout(APIView):
    def delete(self, request):
        return Response({"message": "Logout 성공"}, status=status.HTTP_202_ACCEPTED)

class PointView(APIView):
    def get(self, request, id):
        point = Point.objects.filter(user_id=id).first()
        if point:
            return JsonResponse({'points': point.points}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
from django.http import JsonResponse
from rest_framework.decorators import api_view
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


# 이메일 중복 확인
@api_view(['POST'])
def check_email_duplicate(request):
    email = request.data.get('email')

    if not email:
        return JsonResponse({"detail": "이메일을 제공해주세요."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"message": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({"message": "사용 가능한 이메일입니다."}, status=status.HTTP_200_OK)


# 로그인
class Login(APIView):
    def post(self, request):
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


@api_view(['get'])
def get_user(request, id):
    user = User.objects.get(id=id)

    if not user:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class PointView(APIView):
    def get(self, request, id):
        point = Point.objects.get(user_id=id)
        if point:
            return JsonResponse({'point': point.points}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
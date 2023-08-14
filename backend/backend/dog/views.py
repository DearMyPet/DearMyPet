from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from rest_framework.response import Response

class DogAPIview(APIView):
    def get(self, request, id):
        dogs = Dog.objects.filter(user_id=id).first()

        if not dogs:
            return Response({"message": "반려견을 등록하세요."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DogInfo(dogs)
        return Response(serializer.data, status=status.HTTP_200_OK)

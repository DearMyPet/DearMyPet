from rest_framework.views import APIView
from .models import DietDiary, PreventionDiary, CheckList
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from user.models import User


# 반려견 정보 확인 및 등록
class DogAPIview(APIView):
    def get(self, request, id):
        dogs = Dog.objects.filter(user_id=id).first()

        if not dogs:
            return Response({"message": "반려견을 등록하세요."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DogInfo(dogs)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        data = request.data
        try:
            user = User.objects.get(pk=id)

            dog = Dog.objects.create(
                name=data['name'],
                weight=data['weight'],
                age=data['age'],
                breed=data.get('breed', None),
                img=data.get('img', None),
                user=user
            )

            serializer = DogSerializer(dog)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except User.DoesNotExist:
            return Response({"error": "해당 ID를 가진 사용자가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"error": f"{e} 정보가 누락되었습니다."}, status=status.HTTP_400_BAD_REQUEST)


# 예방 일지
class PreventionDiaryAPIView(APIView):
    def get(self, request, dog_id):
        prevention_diary = PreventionDiary.objects.get(dog_id=dog_id)
        check_list_items = CheckListItem.objects.filter(check_list__prevention_diary=prevention_diary)

        if not check_list_items:
            return Response({"message": "해당 강아지의 체크 항목이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CheckListSerializer(check_list_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, dog_id):
        prevention_diary = PreventionDiary.objects.get(dog_id=dog_id)

        try:
            check_list = CheckList.objects.get(prevention_diary=prevention_diary)
        except CheckList.DoesNotExist:
            return Response({"message": "해당 강아지의 체크 항목이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['check_list'] = check_list.id

        serializer = CheckListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, dog_id):
        item_id = request.data.get('item_id')

        if not item_id:
            return Response({"message": "item_id를 제공해주세요."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            check_list_item = CheckListItem.objects.get(id=item_id)
            check_list_item.is_checked = True
            check_list_item.save()
            return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

        except CheckListItem.DoesNotExist:
            return Response({"message": "해당 체크리스트 항목을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


# 맞춤 일지 페이지
class DietDiaryAPIView(APIView):
    def get(self, request, dog_id):
        # 가장 최근의 해당 dog_id를 가진 WeightRecord 항목 가져오기
        latest_weight_record = WeightRecord.objects.filter(diet_diary__dog_id=dog_id).order_by('-date').first()

        if latest_weight_record:
            data = {
                'weight': latest_weight_record.weight,
                'obesity': latest_weight_record.obesity
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            dog = Dog.objects.get(id=dog_id)
            data = {
                'weight': dog.weight,
                'obesity': None
            }
            return Response(data, status=status.HTTP_200_OK)


# 맞춤 일지 - 몸무게 기록
class WeightRecordAPIView(APIView):
    def get(self, request, dog_id):
        diet_diary = DietDiary.objects.get(dog_id=dog_id)
        weight_records = WeightRecord.objects.filter(diet_diary=diet_diary)

        if not weight_records.exists():
            return Response({"message": "몸무게 기록이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = WeightRecordSerializer(weight_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, dog_id):
        diet_diary = DietDiary.objects.get(dog_id=dog_id)
        data = request.data
        data['diet_diary'] = diet_diary.id

        serializer = WeightRecordSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

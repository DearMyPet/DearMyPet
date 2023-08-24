from rest_framework.views import APIView
from .models import DietDiary, PreventionDiary, CheckList
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from user.models import User
from utils.cloudinary_helpers import upload_image_to_cloudinary


# 반려견 정보 확인 및 등록
class DogAPIview(APIView):
    def get(self, request, id):
        dogs = Dog.objects.filter(user_id=id).first()

        if not dogs:
            return Response({"message": "반려견을 등록하세요."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DogSerializer(dogs)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        data = request.data
        try:
            user = User.objects.get(pk=id)

            if 'img' in data:
                image_file = data['img']
                uploaded_image_url = upload_image_to_cloudinary(image_file)
                data['img'] = uploaded_image_url

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

    def patch(self, request, id):
        dog_id = request.data.get('id')
        name = request.data.get('name')
        weight = request.data.get('weight')
        age = request.data.get('age')
        breed = request.data.get('breed')
        img = request.data.get('img')

        try:
            dog = Dog.objects.get(id=dog_id)

            if name:
                dog.name = name
            if weight:
                dog.weight = weight
            if age:
                dog.age = age
            if breed:
                dog.breed = breed
            if img:
                uploaded_image_url = upload_image_to_cloudinary(img)
                dog.img = uploaded_image_url

            dog.save()
            return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

        except Dog.DoesNotExist:
            return Response({"message": "강아지를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        # dog_id = request.data.get('id')
        dog_id = request.query_params.get('id')
        try:
            dog = Dog.objects.get(id=dog_id)
            dog.delete()
            return Response(status=status.HTTP_200_OK)

        except Dog.DoesNotExist:
            return Response({"message": "해당 반려견을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)



# 예방 일지 - 체크 리스트
class CheckListAPIView(APIView):
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
        item_content = request.data.get('item')  # 변경할 항목 내용
        is_checked = request.data.get('is_checked')  # 변경할 체크 여부

        if not item_id:
            return Response({"message": "item_id를 제공해주세요."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            check_list_item = CheckListItem.objects.get(id=item_id, check_list__prevention_diary__dog_id=dog_id)

            if item_content is not None:
                check_list_item.item = item_content

            if is_checked is not None:
                check_list_item.is_checked = is_checked

            check_list_item.save()
            return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

        except CheckListItem.DoesNotExist:
            return Response({"message": "해당 체크리스트 항목을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, dog_id):
        item_id = request.data.get('item_id')
        if not item_id:
            return Response({"message": "item_id를 제공해주세요."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            check_list_item = CheckListItem.objects.get(id=item_id, check_list__prevention_diary__dog_id=dog_id)
            check_list_item.delete()

            return Response({"message": "체크리스트 항목이 성공적으로 삭제되었습니다."}, status=status.HTTP_200_OK)

        except CheckListItem.DoesNotExist:
            return Response({"message": "해당 체크리스트 항목을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


# 예방 일지 - 병원 기록
class MedicalRecordAPIView(APIView):
    def get(self, request, dog_id):
        medical_record = MedicalRecord.objects.filter(prevention_diary__dog_id=dog_id)
        if not medical_record.exists():
            return Response({"message": "진료 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MedicalRecordSerializer(medical_record, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, dog_id):
        prevention_diary = PreventionDiary.objects.get(dog_id=dog_id)
        data = request.data
        data['prevention_diary'] = prevention_diary.id

        serializer = MedicalRecordSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 예방 일지 - 예방 접종
class VaccinationAPIView(APIView):
    def get(self, request, dog_id):
        vaccination_record = Vaccination.objects.filter(prevention_diary__dog_id=dog_id)

        if not vaccination_record.exists():
            return Response({"message": "예방 접종 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = VaccinationSerializer(vaccination_record, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, dog_id):
        prevention_diary = PreventionDiary.objects.get(dog_id=dog_id)
        data = request.data
        data['prevention_diary'] = prevention_diary.id

        serializer = VaccinationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 예방 일지 - 약물 복용
class MedicationAPIView(APIView):
    def get(self, request, dog_id):
        medication_record = Medication.objects.filter(prevention_diary__dog_id=dog_id)

        if not medication_record.exists():
            return Response({"message": "약물 복용 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MedicationSerializer(medication_record, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, dog_id):
        prevention_diary = PreventionDiary.objects.get(dog_id=dog_id)
        data = request.data
        data['prevention_diary'] = prevention_diary.id

        serializer = MedicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

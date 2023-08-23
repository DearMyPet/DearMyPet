from django.urls import path
from dog.views import DogAPIview, CheckListAPIView, MedicalRecordAPIView, VaccinationAPIView, MedicationAPIView, WeightRecordAPIView, DietDiaryAPIView

urlpatterns = [
    path('<int:id>', DogAPIview.as_view()),     # user_id
    path('prevention-diary/<int:dog_id>', CheckListAPIView.as_view()),
    path('prevention-diary/medical-record/<int:dog_id>', MedicalRecordAPIView.as_view()),
    path('prevention-diary/vaccination/<int:dog_id>', VaccinationAPIView.as_view()),
    path('prevention-diary/medication/<int:dog_id>', MedicationAPIView.as_view()),
    path('diet/<int:dog_id>', DietDiaryAPIView.as_view()),
    path('diet/weight-record/<int:dog_id>', WeightRecordAPIView.as_view())
]

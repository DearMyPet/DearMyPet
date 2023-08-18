from django.urls import path
from dog.views import DogAPIview, WeightRecordAPIView, DietDiaryAPIView, PreventionDiaryAPIView

urlpatterns = [
    # user_id
    path('<int:id>', DogAPIview.as_view()),
    path('prevention-diary/<int:dog_id>', PreventionDiaryAPIView.as_view()),
    path('diet/<int:dog_id>', DietDiaryAPIView.as_view()),
    path('diet/weight-record/<int:dog_id>', WeightRecordAPIView.as_view())
]

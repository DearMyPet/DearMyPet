from django.urls import path
from dog.views import DogAPIview

urlpatterns = [
    path('<int:id>/', DogAPIview.as_view())
]
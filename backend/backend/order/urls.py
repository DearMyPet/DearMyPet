from django.urls import path
from .views import OrderAPIView, get_last_address

urlpatterns = [
    path('last/<int:user_id>', get_last_address),
    path('<int:user_id>', OrderAPIView.as_view())
]

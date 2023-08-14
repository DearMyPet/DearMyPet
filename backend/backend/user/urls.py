from django.urls import path
from .views import Join, Login, Logout, PointView

urlpatterns = [
    path('join/', Join.as_view()),
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('<int:id>/', PointView.as_view())
]

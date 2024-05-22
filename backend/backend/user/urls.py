from django.urls import path
from .views import Join, check_email_duplicate, Login, Logout, UserAPIView, PointView, CartView

urlpatterns = [
    path('join', Join.as_view()),
    path('check_email', check_email_duplicate),
    path('login', Login.as_view()),
    path('logout', Logout.as_view()),
    path('<int:id>', UserAPIView.as_view()),
    path('points/<int:id>', PointView.as_view()),
    path('cart/<int:id>', CartView.as_view())
]

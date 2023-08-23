from django.urls import path
from .views import Join, check_email_duplicate, Login, Logout, PointView, get_user

urlpatterns = [
    path('join', Join.as_view()),
    path('check_email', check_email_duplicate),
    path('login', Login.as_view()),
    path('logout', Logout.as_view()),
    path('info/<int:id>', get_user),
    path('<int:id>', PointView.as_view())
]

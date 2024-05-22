from django.urls import path
from .views import ProductAPIView, ProductInfoAPIView, ReviewAPIView, InquiryAPIView

urlpatterns = [
    path('', ProductAPIView.as_view()),
    path('<int:product_id>', ProductInfoAPIView.as_view()),
    path('reviews/<int:product_id>', ReviewAPIView.as_view()),
    path('inquirys/<int:product_id>', InquiryAPIView.as_view())
]

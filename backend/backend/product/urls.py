from django.urls import path
from .views import get_product_list, get_product_info, ReviewAPIView, InquiryAPIView

urlpatterns = [
    path('', get_product_list),
    path('<int:product_id>', get_product_info),
    path('reviews/<int:product_id>', ReviewAPIView.as_view()),
    path('inquirys/<int:product_id>', InquiryAPIView.as_view())
]

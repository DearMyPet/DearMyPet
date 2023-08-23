from django.db import transaction
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from user.models import Point


# 가장 최근 배송지 정보 조회
@api_view(['GET'])
def get_last_address(request, user_id):
    try:
        last_order = Order.objects.filter(user_id=user_id).latest('order_date')

        address_info = {
            "address_name": last_order.address_name,
            "recipient": last_order.recipient,
            "recipient_phone": last_order.recipient_phon,
            "address": last_order.address,
        }

        return Response(address_info, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"message": "주문 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)


class OrderAPIView(APIView):
    def get(self, request, user_id):
        order_id = request.query_params.get('id')

        orders = Order.objects.filter(user_id=user_id)
        if order_id:
            orders = orders.filter(id=order_id)

        if not orders.exists():
            return Response({"message": "주문 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, user_id):
        data = request.data
        data['user'] = user_id
        points_used = data.get('points_used', 0)

        user_point = Point.objects.get(user_id=user_id)
        if user_point.points < points_used:
            return Response({"message": "사용 가능한 포인트를 초과했습니다."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderSerializer(data=data)

        if serializer.is_valid():
            with transaction.atomic():  # 트랜잭션 시작
                serializer.save()

                user_point.points -= points_used
                user_point.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, user_id):
        order_id = request.data.get('id')

        try:
            order = Order.objects.get(user_id=user_id, id=order_id)
        except Order.DoesNotExist:
            return Response({"message": "주문을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

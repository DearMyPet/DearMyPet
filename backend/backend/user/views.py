from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Point, Cart
from .serializers import *
from rest_framework import status
from rest_framework.response import Response


# 회원가입
class Join(APIView):
    def post(self, request):
        serializer = JWTJoinSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return JsonResponse(
                {
                    'user': UserSerializer(user).data,
                    'access': str(token.access_token),
                    'refresh': str(token)
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 이메일 중복 확인
@api_view(['POST'])
def check_email_duplicate(request):
    email = request.data.get('email')

    if not email:
        return JsonResponse({"detail": "이메일을 제공해주세요."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"message": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({"message": "사용 가능한 이메일입니다."}, status=status.HTTP_200_OK)


# 로그인
class Login(APIView):
    def post(self, request):
        serializer = JWTLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return JsonResponse(
                {
                    'id': user.id,
                    'access': serializer.validated_data['access'],
                    'refresh': serializer.validated_data['refresh']
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 로그아웃
class Logout(APIView):
    def delete(self, request):
        return Response({"message": "Logout 성공"}, status=status.HTTP_202_ACCEPTED)


class UserAPIView(APIView):
    def get(self, request, id):
        user = User.objects.get(id=id)

        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, id):
        password = request.data.get('password')
        name = request.data.get('name')
        nickname = request.data.get('nickname')
        phone = request.data.get('phone')

        try:
            user = User.objects.get(id=id)

            if password:
                user.password = password
            if name:
                user.name = name
            if nickname:
                user.nickname = nickname
            if phone:
                user.phone = phone

            user.save()
            return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"message": "해당 사용자를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()

            return Response({"message": "성공적으로 삭제되었습니다."}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"message": "해당 사용자를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


class PointView(APIView):
    def get(self, request, id):
        point = Point.objects.get(user_id=id)
        if point:
            return JsonResponse({'point': point.points}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class CartView(APIView):
    def get(self, request, id):
        cart = Cart.objects.get(user_id=id)

        cart_item_list = CartItem.objects.filter(cart_id=cart.id)

        if not cart_item_list.exists():
            return Response({"message": "장바구니에 상품이 없습니다."})

        data = request.data
        data['cart'] = cart.id

        serializer = CartItemSerializer(cart_item_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        cart = Cart.objects.get(user_id=id)
        existing_item = CartItem.objects.filter( cart=cart, product_id=request.data['product'] ).first()

        # 이미 있는 상품의 수량 업데이트
        if existing_item:
            existing_item.quantity += int(request.data['quantity'])
            existing_item.save()
            return Response({"message": "상품 수량이 업데이트되었습니다."}, status=status.HTTP_200_OK)

        data = request.data
        data['cart'] = cart.id

        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        cart = Cart.objects.get(user_id=id)
        product_id = request.data.get('product')
        new_quantity = request.data.get('quantity')

        if not product_id or not new_quantity:
            return Response({"message": "상품 ID와 수량은 필수입니다."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()

        if cart_item:
            cart_item.quantity = new_quantity
            cart_item.save()
            return Response({"message": "상품 수량이 업데이트되었습니다."}, status=status.HTTP_200_OK)

        return Response({"message": "해당 상품이 장바구니에 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        cart = Cart.objects.get(user_id=id)
        product_id = request.data.get('product', None)

        # 특정 상품만 삭제
        if product_id:
            cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
            if cart_item:
                cart_item.delete()
                return Response({"message": "상품이 장바구니에서 삭제되었습니다."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "해당 상품이 장바구니에 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        # cart 모든 상품 삭제
        else:
            CartItem.objects.filter(cart=cart).delete()
            return Response({"message": "장바구니의 모든 상품이 삭제되었습니다."}, status=status.HTTP_200_OK)

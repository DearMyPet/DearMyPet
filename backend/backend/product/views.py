from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from utils.cloudinary_helpers import upload_image_to_cloudinary
from user.models import User


# 상품 리스트 조회 (id, 타입, 부위 조건에 따라서 필터링)
class ProductAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()

        product_type = request.query_params.get('type')
        if product_type:
            products = products.filter(type=product_type)

        part = request.query_params.get('part')
        if part:
            products = products.filter(part=part)

        ids = request.query_params.get('id')
        if ids:
            id_list = [int(i) for i in ids.split(',')]
            products = products.filter(id__in=id_list)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data

        if 'img' in data and data['img']:
            image_file = data['img']
            uploaded_image_url = upload_image_to_cloudinary(image_file)
            data['img'] = uploaded_image_url

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 상품 상세 정보 조회
class ProductInfoAPIView(APIView):
    def get(self, request, product_id):
        products = Product.objects.get(id=product_id)
        products_info = ProductInfo.objects.get(id=product_id)

        return JsonResponse(
            {
                "product": ProductSerializer(products).data,
                "product-info": ProductInfoSerializer(products_info).data
            }, status=status.HTTP_200_OK)

    def post(self, request, product_id):
        data = request.data

        image_fields = ['content_img1', 'ingredient_img1', 'ingredient_img2', 'ship_method_img', 'summary_info_img']

        for field in image_fields:
            if field in data and data[field]:
                image_file = data[field]
                try:
                    uploaded_image_url = upload_image_to_cloudinary(image_file)
                    data[field] = uploaded_image_url
                except Exception as e:
                    return Response(
                        {"error": f"Upload for {field} failed: {str( e )}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data['product'] = product_id

        serializer = ProductInfoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewAPIView(APIView):
    def get(self, request, product_id):
        reviews = Review.objects.filter(product_id=product_id)
        if not reviews:
            return Response({"message": "해당 상품의 리뷰가 없습니다."})

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, product_id):
        data = request.data
        data['product'] = product_id

        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, product_id):
        review_id = request.data.get('id')
        user_id = request.data.get('user')
        rating = request.data.get('rating')
        content = request.data.get('content')
        img = request.data.get('img')

        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response({"message": "해당 리뷰를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        if not review.user.id == user_id:
            return Response({"message": "리뷰 작성자가 아닙니다."}, status=status.HTTP_403_FORBIDDEN)

        if rating:
            review.rating = rating
        if content:
            review.content = content
        if img:
            review.img = img

        review.save()
        return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

    def delete(self, request, product_id):
        review_id = request.data.get('id')
        user_id = request.data.get('user')

        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response({"message": "해당 리뷰를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        if not review.user.id == user_id:
            return Response({"message": "리뷰 작성자가 아닙니다."}, status=status.HTTP_403_FORBIDDEN)

        review.delete()

        return Response({"message": "성공적으로 삭제되었습니다."}, status=status.HTTP_200_OK)


class InquiryAPIView(APIView):
    def get(self, request, product_id):
        inquiry = Inquiry.objects.filter(product_id=product_id)
        if not inquiry:
            return Response({"message": "해당 상품의 문의가 없습니다."})

        serializer = InquirySerializer(inquiry, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, product_id):
        data = request.data
        data['product'] = product_id

        serializer = InquirySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, product_id):
        inquiry_id = request.data.get('id')
        user_id = request.data.get('user')
        content = request.data.get('content')
        img = request.data.get('img')
        tag = request.data.get('tag')
        answer = request.data.get('answer')

        try:
            inquiry = Inquiry.objects.get(id=inquiry_id)
        except Inquiry.DoesNotExist:
            return Response({"message": "해당 문의를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        if not inquiry.user.id == user_id:
            return Response({"message": "문의 작성자가 아닙니다."}, status=status.HTTP_403_FORBIDDEN)

        if content:
            inquiry.content = content
        if img:
            inquiry.img = img
        if tag:
            inquiry.tag = tag
        if answer:
            inquiry.answer = answer

        inquiry.save()
        return Response({"message": "성공적으로 업데이트되었습니다."}, status=status.HTTP_200_OK)

    def delete(self, request, product_id):
        inquiry_id = request.data.get('id')
        user_id = request.data.get('user')

        try:
            inquiry = Inquiry.objects.get(id=inquiry_id)
        except Inquiry.DoesNotExist:
            return Response({"message": "해당 문의를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        if not inquiry.user.id == user_id:
            return Response({"message": "문의 작성자가 아닙니다."}, status=status.HTTP_403_FORBIDDEN)

        inquiry.delete()
        return Response({"message": "성공적으로 삭제되었습니다."}, status=status.HTTP_200_OK)


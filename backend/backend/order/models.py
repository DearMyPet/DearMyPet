from django.db import models
from user.models import User
from product.models import Product


class Order(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    address_name = models.CharField(max_length=45, null=False)
    recipient = models.CharField(max_length=45, null=False)
    address = models.CharField(max_length=100, null=False)
    delivery_memo = models.CharField(max_length=255, blank=True)
    points_used = models.IntegerField(default=0)
    payment = models.CharField(max_length=45)
    total_price = models.DecimalField(max_digits=8, decimal_places=0, null=False)
    order_date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=45, default="주문 완료")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Order'


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    quantity = models.IntegerField(null=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = 'OrderItem'


class Delivery(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    status = models.CharField(max_length=45, default="배송 준비 중")
    order = models.OneToOneField(Order, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Delivery'


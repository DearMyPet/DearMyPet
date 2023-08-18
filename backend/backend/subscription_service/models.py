from django.db import models
from product.models import Product, Ingredient
from user.models import User


class SubscriptionService(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    price = models.DecimalField(max_digits=8, decimal_places=0, null=False)
    part = models.CharField(max_length=45, null=False)
    start_date = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        db_table = 'SubscriptionService'


class SubscriptionDetail(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    subscription_service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = 'SubscriptionDetail'

from django.db import models
from user.models import User
from disease_diary.models import Nutrients
from disease_diary.models import HealthAnomalies

TYPE_CHOICES = [
    ('사료', '사료'),
    ('간식', '간식'),
]

class Product(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, null=False)
    part = models.CharField(max_length=10, null=False)
    name = models.CharField(max_length=100, null=False)
    price = models.DecimalField(max_digits=8, decimal_places=0, null=False)
    img = models.CharField(max_length=255)
    class Meta:
        db_table = 'Product'

class Recommendations(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    health_anomalies = models.ForeignKey(HealthAnomalies, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Recommendations'
class ProductInfo(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    category_desc1 = models.CharField(max_length=255, null=False)
    category_desc2 = models.CharField(max_length=255, null=False)
    category_desc3 = models.CharField(max_length=255, null=False)
    stiffness = models.IntegerField(null=False)
    size = models.IntegerField(null=False)
    content1 = models.CharField(max_length=255, null=False)
    content2 = models.CharField(max_length=255, null=False)
    content_img1 = models.CharField(max_length=255, null=False)
    ingredient_img1 = models.CharField(max_length=255, null=False)
    ingredient_img2 = models.CharField(max_length=255, null=False)
    ingredient1 = models.CharField(max_length=255, null=False)
    ingredient2 = models.CharField(max_length=255, null=False)
    ship_method_img = models.CharField(max_length=255, null=False)
    summary_info_img = models.CharField(max_length=255, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = 'ProductInfo'

class Ingredient(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45, null=False)

    class Meta:
        db_table = 'Ingredient'

class ProductIngredients(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        db_table = 'ProductIngredients'

class ProductNutrient(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    product_ingredient = models.ForeignKey(ProductIngredients, on_delete=models.CASCADE)
    nutrient = models.ForeignKey(Nutrients, on_delete=models.CASCADE)

    class Meta:
        db_table = 'ProductNutrient'


class Review(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=False)
    content = models.CharField(max_length=255, null=False)
    img = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Review'

class Inquiry(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    content = models.CharField(max_length=255, null=False)
    img = models.CharField(max_length=255, null=False)
    tag = models.CharField(max_length=10, blank=True)
    answer = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Inquiry'

from django.db import models
from user.models import User

class Dog(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=20, null=False)
    weight = models.DecimalField(max_digits=3, decimal_places=2, null=False)
    age = models.IntegerField(null=False)
    breed = models.CharField(max_length=30)
    img = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Dog'

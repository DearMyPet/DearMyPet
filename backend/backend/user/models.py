from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(unique=True, max_length=35, null=False)
    password = models.CharField(max_length=20, null=False)
    name = models.CharField(max_length=20, null=False)
    nickname = models.CharField(max_length=45, null=False)
    phone = models.CharField(max_length=15, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'User'

class Point(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    points = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Point'
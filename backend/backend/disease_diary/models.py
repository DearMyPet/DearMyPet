from django.db import models
from dog.models import Dog

class HealthReport(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    img = models.CharField(max_length=255, null=False)
    part = models.CharField(max_length=45, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

    class Meta:
        db_table = 'HealthReport'

class Disease(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    part = models.CharField(max_length=45, null=False)
    name = models.CharField(max_length=45, null=False)
    description = models.CharField(max_length=255, null=False)

    class Meta:
        db_table = 'Disease'

class HealthAnomalies(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    percentage = models.IntegerField(null=False)
    health_report = models.ForeignKey(HealthReport, on_delete=models.CASCADE)
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)

    class Meta:
        db_table = 'HealthAnomalies'

class Nutrients(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45)

    class Meta:
        db_table = 'Nutrients'

class NutrientsHasDisease(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    nutrient = models.ForeignKey(Nutrients, on_delete=models.CASCADE)

    class Meta:
        db_table = 'NutrientsHasDisease'
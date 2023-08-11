from django.db import models
from dog.models import Dog

class DietDiary(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    feeding_amount = models.IntegerField(null=False)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

    class Meta:
        db_table = 'DietDiary'

OBESITY_CHOICES = [
    ('마름', '마름'),
    ('적정', '적정'),
    ('비만', '비만'),
]

class WeightRecord(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    weight = models.DecimalField(max_digits=3, decimal_places=2, null=False)
    bsc = models.IntegerField(null=False)
    date = models.DateField(auto_now=True)
    memo = models.CharField(max_length=255, blank=True)
    obesity = models.CharField(max_length=10, choices=OBESITY_CHOICES)
    diet_diary = models.ForeignKey(DietDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'WeightRecord'


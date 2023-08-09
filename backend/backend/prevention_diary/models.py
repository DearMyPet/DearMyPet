from django.db import models
from dog.models import Dog

class PreventionDiary(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

    class Meta:
        db_table = 'PreventionDiary'

class MedicalRecord(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45)
    reason = models.CharField(max_length=255)
    prescription_history = models.CharField(max_length=255)
    memo = models.CharField(max_length=255, blank=True)
    date = models.DateField(auto_now=True)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'MedicalRecord'


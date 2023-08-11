from django.db import models
from dog.models import Dog

class PreventionDiary(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

    class Meta:
        db_table = 'PreventionDiary'

class CheckList(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'CheckList'

class CheckListItem(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    item = models.CharField(max_length=100, null=False)
    is_checkd = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    check_list = models.ForeignKey(CheckList, on_delete=models.CASCADE)

    class Meta:
        db_table = 'CheckListItem'

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

class Vaccination(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45, null=False)
    inoculation_cycle = models.CharField(max_length=45)
    vaccination_date = models.DateField(auto_now=True)
    hospital = models.CharField(max_length=100)
    cost = models.DecimalField(decimal_places=0, max_digits=8)
    memo = models.CharField(max_length=255, blank=True)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Vaccination'

class Medication(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45, null=False)
    dosing_cycle = models.CharField(max_length=45, null=False)
    dosing_period = models.CharField(max_length=45)
    disease = models.CharField(max_length=45)
    memo = models.CharField(max_length=255, blank=True)
    date = models.DateField(auto_now=True)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Medication'

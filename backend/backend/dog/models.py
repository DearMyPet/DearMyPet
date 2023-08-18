from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Dog(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=20, null=False)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    age = models.IntegerField(null=False)
    breed = models.CharField(max_length=30, null=True)
    img = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Dog'


@receiver(post_save, sender=Dog)
def create_related_records(sender, instance, created, **kwargs):
    if created:
        PreventionDiary.objects.create(dog=instance)
        DietDiary.objects.create(dog=instance)


# 예방 일지
class PreventionDiary(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

    class Meta:
        db_table = 'PreventionDiary'


@receiver(post_save, sender=PreventionDiary)
def create_checklist(sender, instance, created, **kwargs):
    if created:
        CheckList.objects.create(prevention_diary=instance)


class CheckList(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'CheckList'


class CheckListItem(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    item = models.CharField(max_length=100, null=False)
    is_checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
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
    cost = models.DecimalField(max_digits=8, decimal_places=0)
    memo = models.CharField(max_length=255, blank=True, null=True)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Vaccination'


class Medication(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=45, null=False)
    dosing_cycle = models.CharField(max_length=45, null=False)
    dosing_period = models.CharField(max_length=45)
    disease = models.CharField(max_length=45)
    memo = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(auto_now=True)
    prevention_diary = models.ForeignKey(PreventionDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Medication'


# 맞춤 일지
class DietDiary(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    # feeding_amount = models.DecimalField(max_digits=3, decimal_places=2, null=False)
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
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    bsc = models.IntegerField(null=False)
    date = models.DateField(auto_now=True)
    memo = models.CharField(max_length=255, blank=True, null=True)
    obesity = models.CharField(max_length=10, choices=OBESITY_CHOICES)
    diet_diary = models.ForeignKey(DietDiary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'WeightRecord'

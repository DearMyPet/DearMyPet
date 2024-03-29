# Generated by Django 4.2.1 on 2023-08-22 18:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dog',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dietdiary',
            name='dog',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.dog'),
        ),
        migrations.AddField(
            model_name='checklistitem',
            name='check_list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.checklist'),
        ),
        migrations.AddField(
            model_name='checklist',
            name='prevention_diary',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.preventiondiary'),
        ),
    ]

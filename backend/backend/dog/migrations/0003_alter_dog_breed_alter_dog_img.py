# Generated by Django 4.2.1 on 2023-08-14 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dog', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dog',
            name='breed',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='dog',
            name='img',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]

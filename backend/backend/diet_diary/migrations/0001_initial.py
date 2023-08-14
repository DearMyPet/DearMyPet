# Generated by Django 4.2.1 on 2023-08-12 17:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DietDiary',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('feeding_amount', models.IntegerField()),
            ],
            options={
                'db_table': 'DietDiary',
            },
        ),
        migrations.CreateModel(
            name='WeightRecord',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=3)),
                ('bsc', models.IntegerField()),
                ('date', models.DateField(auto_now=True)),
                ('memo', models.CharField(blank=True, max_length=255)),
                ('obesity', models.CharField(choices=[('마름', '마름'), ('적정', '적정'), ('비만', '비만')], max_length=10)),
                ('diet_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diet_diary.dietdiary')),
            ],
            options={
                'db_table': 'WeightRecord',
            },
        ),
    ]
# Generated by Django 4.2.1 on 2023-08-22 18:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CheckList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'CheckList',
            },
        ),
        migrations.CreateModel(
            name='CheckListItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('item', models.CharField(max_length=100)),
                ('is_checked', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'CheckListItem',
            },
        ),
        migrations.CreateModel(
            name='DietDiary',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'DietDiary',
            },
        ),
        migrations.CreateModel(
            name='Dog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('age', models.IntegerField()),
                ('breed', models.CharField(max_length=30, null=True)),
                ('img', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Dog',
            },
        ),
        migrations.CreateModel(
            name='PreventionDiary',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.dog')),
            ],
            options={
                'db_table': 'PreventionDiary',
            },
        ),
        migrations.CreateModel(
            name='WeightRecord',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('bsc', models.IntegerField()),
                ('date', models.DateField(auto_now=True)),
                ('memo', models.CharField(blank=True, max_length=255, null=True)),
                ('obesity', models.CharField(choices=[('마름', '마름'), ('적정', '적정'), ('비만', '비만')], max_length=10)),
                ('diet_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.dietdiary')),
            ],
            options={
                'db_table': 'WeightRecord',
            },
        ),
        migrations.CreateModel(
            name='Vaccination',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('inoculation_cycle', models.CharField(max_length=45)),
                ('vaccination_date', models.DateField(auto_now=True)),
                ('hospital', models.CharField(max_length=100)),
                ('cost', models.DecimalField(decimal_places=0, max_digits=8)),
                ('memo', models.CharField(blank=True, max_length=255, null=True)),
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.preventiondiary')),
            ],
            options={
                'db_table': 'Vaccination',
            },
        ),
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('dosing_cycle', models.CharField(max_length=45)),
                ('dosing_period', models.CharField(max_length=45)),
                ('disease', models.CharField(max_length=45)),
                ('memo', models.CharField(blank=True, max_length=255, null=True)),
                ('date', models.DateField(auto_now=True)),
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.preventiondiary')),
            ],
            options={
                'db_table': 'Medication',
            },
        ),
        migrations.CreateModel(
            name='MedicalRecord',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('reason', models.CharField(max_length=255)),
                ('prescription_history', models.CharField(max_length=255)),
                ('memo', models.CharField(blank=True, max_length=255)),
                ('date', models.DateField(auto_now=True)),
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dog.preventiondiary')),
            ],
            options={
                'db_table': 'MedicalRecord',
            },
        ),
    ]
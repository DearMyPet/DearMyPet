# Generated by Django 4.2.1 on 2023-08-12 17:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dog', '0001_initial'),
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
            name='Vaccination',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('inoculation_cycle', models.CharField(max_length=45)),
                ('vaccination_date', models.DateField(auto_now=True)),
                ('hospital', models.CharField(max_length=100)),
                ('cost', models.DecimalField(decimal_places=0, max_digits=8)),
                ('memo', models.CharField(blank=True, max_length=255)),
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prevention_diary.preventiondiary')),
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
                ('memo', models.CharField(blank=True, max_length=255)),
                ('date', models.DateField(auto_now=True)),
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prevention_diary.preventiondiary')),
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
                ('prevention_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prevention_diary.preventiondiary')),
            ],
            options={
                'db_table': 'MedicalRecord',
            },
        ),
        migrations.CreateModel(
            name='CheckListItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('item', models.CharField(max_length=100)),
                ('is_checkd', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('check_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prevention_diary.checklist')),
            ],
            options={
                'db_table': 'CheckListItem',
            },
        ),
        migrations.AddField(
            model_name='checklist',
            name='prevention_diary',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prevention_diary.preventiondiary'),
        ),
    ]

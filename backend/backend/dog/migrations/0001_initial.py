# Generated by Django 4.2.1 on 2023-08-12 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=3)),
                ('age', models.IntegerField()),
                ('breed', models.CharField(max_length=30)),
                ('img', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Dog',
            },
        ),
    ]

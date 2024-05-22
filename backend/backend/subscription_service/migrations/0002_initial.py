# Generated by Django 4.2.1 on 2023-08-22 18:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0002_initial'),
        ('subscription_service', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriptionservice',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='subscriptiondetail',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
        migrations.AddField(
            model_name='subscriptiondetail',
            name='subscription_service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subscription_service.subscriptionservice'),
        ),
    ]
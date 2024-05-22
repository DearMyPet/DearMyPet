from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError('이메일이 필요합니다.')

        name = kwargs.get('name', None)
        nickname = kwargs.get('nickname', None)
        phone = kwargs.get('phone', None)

        user = self.model(
            email=email,
            name=name,
            nickname=nickname,
            phone=phone
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        superuser = self.create_user(
            email=email,
            password=password,
        )

        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True

        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(unique=True, max_length=35, null=False)
    password = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=20, null=False)
    nickname = models.CharField(max_length=45, null=False)
    phone = models.CharField(max_length=15, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        db_table = 'User'


# User 테이블 생성시 자동으로 point, cart 테이블 생성
@receiver(post_save, sender=User)
def create_for_new_user(sender, instance, created, **kwargs):
    if created:
        Point.objects.create(user=instance)
        Cart.objects.create(user=instance)


class Cart(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Cart'


class CartItem(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    quantity = models.IntegerField(null=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE)

    class Meta:
        db_table = 'CartItem'


class Point(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    points = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Point'




"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
from datetime import timedelta
from pathlib import Path
import os
import json
import cloudinary

from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

secret_file = os.path.join(BASE_DIR, 'secrets.json')

with open('secrets.json') as file:
    secrets = json.loads(file.read())

def get_secret(setting, secret_key = secrets):
    try:
        return secret_key[setting]
    except KeyError:
        error_msg = f'Set the {setting} environment variable'
        raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")

cloudinary.config(
    cloud_name=get_secret("CLOUD_NAME"),
    api_key=get_secret("API_KEY"),
    api_secret=get_secret("API_SECRET")
)

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # install
    'rest_framework',
    'rest_framework_simplejwt',
    'cloudinary',
    # app
    'user',
    'dog',
    'disease_diary',
    'prevention_diary',
    'diet_diary',
    'product',
    'order',
    'subscription_service',
]

REST_USE_JWT = True
AUTH_USER_MODEL = 'user.User'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'TOKEN_USER_CLASS': 'user.User'
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     # 'rest_framework.permissions.IsAuthenticated', # 인증된 사용자만 접근
    #     # 'rest_framework.permissions.IsAdminUser', # 관리자만 접근
    #     'rest_framework.permissions.AllowAny', # 누구나 접근
    # ]
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS 추가
    'django.middleware.common.CommonMiddleware',  # CORS 추가
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS 설정
CORS_ORIGIN_WHITELIST = ('http://127.0.0.1:8000', 'http://localhost:3000')

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': get_secret("NAME"),
        'USER': get_secret("USER"),
        'PASSWORD': get_secret("PASSWORD"),
        'HOST': get_secret("HOST"),
        'PORT': get_secret("PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'ko'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

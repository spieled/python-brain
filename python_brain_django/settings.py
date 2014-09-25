"""
Django settings for python_brain_django project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '%ag4bxypj)qm8la(ghxuyg)3*5^3tvc1nce$zpzl8efb&wy#fm'

# SECURITY WARNING: don't run with debug turned on in production!
# 默认情况，当DEBUG为FALSE的时候，django不再提供静态服务，无法引用静态文件。最佳解决方案 python manager.py runserver --insecure
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['localhost']


# Application definition
TEMPLATE_DIRS = (
    'templates',
    'application/templates',
    'accounts/templates',
)

STATICFILES_DIRS = (
    'static',
    'application/static',
    'accounts/static',
)

STATIC_URL = (
    '/',
)

# MEDIA_ROOT = 'meida'
# MEDIA_URL = 'media'

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'application',
    'accounts',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'python_brain_django.urls'

WSGI_APPLICATION = 'python_brain_django.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

from django.conf.urls import patterns, include, url
from application.views import *


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'python_brain_django.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'hello/', hello),
)

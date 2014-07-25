from django.conf.urls import patterns, include, url
from application.views import *
from application.datas import *


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'python_brain_django.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', index),
    url(r'hello/', hello),
    url(r'member/save/', member_save),
    url(r'member/show/', member_show),
    url(r'member/(?P<member_id>\d+)/', member_detail, name="detail"),
)

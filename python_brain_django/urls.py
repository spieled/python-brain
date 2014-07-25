from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

# if DEBUG is True, this will never be used
handler404 = 'application.views.page_not_found'

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'python_brain_django.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^application/', include('application.urls')),
)

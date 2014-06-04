from django.conf.urls.defaults import patterns, include, url
from views import *
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
     url(r'^$', home),
     url(r'^upload/', upload),
     url(r'^upload_internet/', upload_internet),
     url(r'^new/', nw),
     url(r'^save/', save),
     url(r'^save_as/', save_as),
     url(r'^rotate/', rotate),
     url(r'^saved/', saved),
     url(r'^undo/', undo),
     url(r'^resize/', resize),
     url(r'^exposure/', exposure),
     url(r'^median/', median),
     url(r'^sharpen/', sharpen),

    # Examples:
    # url(r'^$', 'painter.views.home', name='home'),
    # url(r'^painter/', include('painter.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

from django.conf.urls import url
from SchedulerApp import views
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
     url(r'^candidate$',views.candidateApi),
     url(r'^candidate/([0-9]+)$',views.candidateApi),
     url(r'^schedule$',views.scheduleApi),
     url(r'^schedule/([0-9]+)$',views.scheduleApi),
]
     
# ?P<id>
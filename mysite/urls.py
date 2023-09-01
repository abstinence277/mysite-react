"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from app01 import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/login',views.login),
    path('user/register',views.register),
    path('iris/all', views.query_iris),
    path('chess/all/', views.query_chess),
    path('iris/history', views.query_iris_history),
    path('shapley', views.query_compensation),#计算shapley和compensation
    path('write_survey', views.write_survey),#调查点,
    path('amp', views.query_amp),#all
    path('amp_shapley', views.query_amp_shapley),#其他算法
    path('model/release', views.release_model),#发布模型
    path('buymodel', views.query_limited_model),#buyer获取模型
    path('iris/test', views.testiris),#buyer获取模型
]

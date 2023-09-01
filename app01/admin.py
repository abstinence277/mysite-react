from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .resources import *

# Register your models here.
from app01 import models

class TrainIrisAdmin(ImportExportModelAdmin):
    resource_class = TrainIrisResource
    list_display = ['id', 'sepallength', 'sepalwidth', 'label']
admin.site.register(models.TrainIris,TrainIrisAdmin)

class TestIrisAdmin(ImportExportModelAdmin):
    resource_class = TestIrisResource
    list_display = ['id', 'sepallength', 'sepalwidth', 'label']
admin.site.register(models.TestIris,TestIrisAdmin)

class ShapleyInfoAdmin(ImportExportModelAdmin):
    resource_class = ShapleyInfoResource
    list_display = ['id', 'shapley','status']
admin.site.register(models.ShapleyInfo,ShapleyInfoAdmin)

class ModelInfoAdmin(ImportExportModelAdmin):
    resource_class = ModelInfoResource
    list_display = ['id', 'dataset', 'epsilon', 'coverage', 'price', 'state','accuracy']
admin.site.register(models.ModelInfo,ModelInfoAdmin)

class SurveyInfoAdmin(ImportExportModelAdmin):
    resource_class = SurveyInfoResource
    list_display = ['eps', 'pri']
admin.site.register(models.SurveyInfo,SurveyInfoAdmin)

class IrisHistoryInfoAdmin(ImportExportModelAdmin):
    resource_class = IrisHistoryInfoResource
    list_display = ['id','status','submmitdate','compensation']
admin.site.register(models.IrisHistoryInfo,IrisHistoryInfoAdmin)

class TrainChessAdmin(ImportExportModelAdmin):
    resource_class = TrainChessResource
    list_display = ['id', 'arr1', 'arr2', 'arr3', 'arr4', 'arr5', 'arr6', 'arr7', 'arr8', 'arr9', 'arr10', 'arr11',
                    'arr12', 'arr13', 'arr14', 'arr15', 'arr16', 'arr17', 'arr18', 'arr19', 'arr20', 'arr21', 'arr22',
                    'arr23', 'arr24', 'arr25', 'arr26', 'arr27', 'arr28', 'arr29', 'arr30', 'arr31', 'arr32', 'arr33',
                    'arr34', 'arr35', 'label']
admin.site.register(models.TrainChess,TrainChessAdmin)

class TestChessAdmin(ImportExportModelAdmin):
    resource_class = TestChessResource
    list_display = ['id', 'arr1', 'arr2', 'arr3', 'arr4', 'arr5', 'arr6', 'arr7', 'arr8', 'arr9', 'arr10', 'arr11',
                    'arr12', 'arr13', 'arr14', 'arr15', 'arr16', 'arr17', 'arr18', 'arr19', 'arr20', 'arr21', 'arr22',
                    'arr23', 'arr24', 'arr25', 'arr26', 'arr27', 'arr28', 'arr29', 'arr30', 'arr31', 'arr32', 'arr33',
                    'arr34', 'arr35', 'label']
admin.site.register(models.TestChess,TestChessAdmin)
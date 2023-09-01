from import_export import resources
from .models import *


class TrainIrisResource(resources.ModelResource):
    class Meta:
        model = TrainIris

class TestIrisResource(resources.ModelResource):
    class Meta:
        model = TestIris

class ShapleyInfoResource(resources.ModelResource):
    class Meta:
        model = ShapleyInfo

class SurveyInfoResource(resources.ModelResource):
    class Meta:
        model = SurveyInfo

class ModelInfoResource(resources.ModelResource):
    class Meta:
        model = ModelInfo

class IrisHistoryInfoResource(resources.ModelResource):
    class Meta:
        model = IrisHistoryInfo

class TrainChessResource(resources.ModelResource):
    class Meta:
        model = TrainChess

class TestChessResource(resources.ModelResource):
    class Meta:
        model = TestChess

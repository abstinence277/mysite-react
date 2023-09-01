from django.apps import AppConfig


class App01Config(AppConfig):#需要加在设置文件中install
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app01'
    verbose_name = "broker"


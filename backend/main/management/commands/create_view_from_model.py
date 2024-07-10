
# command created by script !
# 04/08/2022 à 09:27:10

from inspect import stack
import os
import json
from pathlib import Path
from datetime import datetime, date
from os.path import join
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from . import utils
from django.contrib.contenttypes.models import ContentType
from django.apps import apps
from django.contrib.admin.widgets import FilteredSelectMultiple
import logging
from django.utils.module_loading import import_string
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Help text here !'
    def add_arguments(self, parser):
        # add custom args here !
        parser.add_argument('--app', type=str, default="main")
        parser.add_argument('--model', type=str, default="all")

    def handle(self, *args, **options):
        # Use arguments from options;
        # process logic here :
        app_name = options["app"]
        spec_model = options["model"]

        main_directory = Path(__file__).resolve().parent.parent.parent.parent
        crud_directory = join(main_directory, app_name, "crud")
        urls_directory = join(main_directory, app_name, "crud_urls")
        serializers_directory = join(main_directory, app_name, "serializers")


        utils.validate_of_create_path(crud_directory, include_init=True)
        utils.validate_of_create_path(urls_directory, include_init=True)
        utils.validate_of_create_path(serializers_directory, include_init=True)
        
        app_models = ContentType.objects.filter(app_label=app_name)
        print(app_models)

        for model_object in app_models:


            if (spec_model != "all") and (model_object.model != spec_model):
                continue

            model = apps.get_model(model_object.app_label, model_object.model)
            model_name = model.__name__
            logger.warning(f'{"-"*10} {model_name} {"-"*10}')
            file_name_import = f"crud_{model_name.lower()}"
            file_name = f"crud_{model_name.lower()}.py"
            file_path = join(crud_directory, file_name)
            print(file_path)
            



            utils.validate_of_create_file(file_path, text=f"""
# created on {datetime.today().strftime("%d/%m/%Y à %H:%M:%S")}

# Function to add in models.py




from {app_name}.models import {model_name}
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from {app_name}.serializers.{model_name.lower()}_serializers import {model_name}Serializer, Create{model_name}Serializer, Update{model_name}Serializer, Retrieve{model_name}Serializer


import logging


logger = logging.getLogger(__name__)

""")
            with open(file_path, "a") as f:
                listccbv = f"{app_name}.crud.crud_{model_name.lower()}.List{model_name}APIView"
                createccbv = f"{app_name}.crud.crud_{model_name.lower()}.Create{model_name}APIView"
                updateccbv = f"{app_name}.crud.crud_{model_name.lower()}.Update{model_name}APIView"
                retrieveccbv = f"{app_name}.crud.crud_{model_name.lower()}.Retrieve{model_name}APIView"
                delete = f"{app_name}.crud.crud_{model_name.lower()}.Delete{model_name}APIView"


                if not utils.module_exist(listccbv):
                    f.write(f"""
class List{model_name}APIView(ListAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = {model_name}
    queryset = {model_name}.objects.all()
    serializer_class = {model_name}Serializer

                    """)
                if not utils.module_exist(createccbv):
                    f.write(f"""
class Create{model_name}APIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = {model_name}
    queryset = {model_name}.objects.all()
    serializer_class = Create{model_name}Serializer

                    """)
                if not utils.module_exist(updateccbv):
                    f.write(f"""
class Update{model_name}APIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = {model_name}
    queryset = {model_name}.objects.all()
    serializer_class = Create{model_name}Serializer
    lookup_field = "uid"
    lookup_url_kwarg = "{model_name.lower()}_uid"


                    """)
                if not utils.module_exist(retrieveccbv):
                    f.write(f"""
class Retrieve{model_name}APIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = {model_name}
    queryset = {model_name}.objects.all()
    serializer_class = Retrieve{model_name}Serializer
    lookup_field = "uid"
    lookup_url_kwarg = "{model_name.lower()}_uid"



                    """)
                if not utils.module_exist(delete):
                    f.write(f"""
class Delete{model_name}APIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = {model_name}
    queryset = {model_name}.objects.all()
    serializer_class = {model_name}Serializer
    lookup_field = "uid"
    lookup_url_kwarg = "{model_name.lower()}_uid"


                    """)
             

                

##################################################################################################################################

                                                    # URLS

##################################################################################################################################
            urls_path = join(main_directory, app_name, "crud_urls", f"urls_{model_name.lower()}.py")


            with open(urls_path, "w") as f:
                f.write(f"""
from django.urls import path
import {app_name}.crud.crud_{model_name.lower()} as api_views

urlpatterns = [
    path("list/{model_name.lower()}/", api_views.List{model_name}APIView.as_view(), name="list-{model_name.lower()}"),
    path("create/{model_name.lower()}/", api_views.Create{model_name}APIView.as_view(), name="create-{model_name.lower()}"),
    # path("update/{model_name.lower()}/<uuid:{model_name.lower()}_uid>/", api_views.Update{model_name}APIView.as_view(), name="update-{model_name.lower()}"),
    # path("delete/{model_name.lower()}/<uuid:{model_name.lower()}_uid>/", api_views.Delete{model_name}APIView.as_view(), name="delete-{model_name.lower()}"),
    # path("retrieve/{model_name.lower()}/<uuid:{model_name.lower()}_uid>/", api_views.Retrieve{model_name}APIView.as_view(), name="retrieve-{model_name.lower()}"),

]
                
                """)

##################################################################################################################################

                                                    # TEMPLATES

##################################################################################################################################

            # CARDS TEMPLATE

            template_name = f"{model_name.lower()}_serializers.py"
            template_path = join(serializers_directory, template_name)
            utils.validate_of_create_file(template_path, text=f"""
# created on {datetime.today().strftime("%d/%m/%Y à %H:%M:%S")}

# Function to add in models.py

from rest_framework import serializers
from {app_name}.models import {model_name}
import logging
logger = logging.getLogger(__name__)

""")
            with open(template_path, "a") as f:
                readser = f"{app_name}.serializers.{model_name.lower()}_serializers.{model_name}Serializer"
                createser = f"{app_name}.serializers.{model_name.lower()}_serializers.Create{model_name}Serializer"
                retrieveser = f"{app_name}.serializers.{model_name.lower()}_serializers.Retrieve{model_name}Serializer"
                updateser = f"{app_name}.serializers.{model_name.lower()}_serializers.Update{model_name}Serializer"


                if not utils.module_exist(readser):
                    f.write(f"""
class {model_name}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {model_name}
        fields = '__all__'

                    """)
                if not utils.module_exist(createser):
                    f.write(f"""
class Create{model_name}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {model_name}
        fields = '__all__'

                    """)
                if not utils.module_exist(retrieveser):
                    f.write(f"""
class Retrieve{model_name}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {model_name}
        fields = '__all__'

                    """)
                if not utils.module_exist(updateser):
                    f.write(f"""
class Update{model_name}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {model_name}
        fields = '__all__'

                    """)














        
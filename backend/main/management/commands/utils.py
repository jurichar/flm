from ast import expr_context
from django.utils.module_loading import import_string
import os
from pathlib import Path
from django.db import models
from django.apps import apps
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.forms.models import model_to_dict
from functools import wraps
from django.db.models import Q
def validate_of_create_path(path:Path, include_init=False) -> None:

    if not isinstance(path, Path):
        path = Path(path)

    if not path.exists():
        os.makedirs(path)
        if include_init:
            with open(os.path.join(path, "__init__.py"), "w") as f:
                f.write("""""")
def validate_of_create_file(path:Path, text="") -> None:

    if not isinstance(path, Path):
        path = Path(path)

    if not path.exists():
        with open(path, "w") as f:
            f.write(text)
            
def module_exist(mod:str) -> bool:

    try:
        return import_string(mod)
    except:
        return False

def float_or_none(x):

    return float(x.values[0]) if x.values[0] is not None else None


def get_annotate_from_tuple(t:tuple) -> dict:

    return {key:value("target", filter=Q(**{"variable":key})) for key, value in t}

def convert_timedelta(s, only_days=False):
        if (s < 86400) and not only_days:
            hours = s // 3600 
            s = s - (hours * 3600)
            minutes = s // 60
            seconds = s - (minutes * 60)

            return '{:02}:{:02}:{:02}'.format(int(hours), int(minutes), int(seconds))
        days = s // 86400
        s = s - (days * 86400)
        hours = s // 3600

        return '{:02} jours {:02} h'.format(int(days), int(hours)) if not only_days else '{:02} jours'.format(int(days))


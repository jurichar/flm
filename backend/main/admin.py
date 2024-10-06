from django.contrib import admin
from django.apps import apps

from .models import User

app_models = apps.get_app_config("main").get_models()
from django.contrib.auth.admin import UserAdmin


def create_model_admin(model):
    class MetaModelAdmin(admin.ModelAdmin):
        list_display = [field.name for field in model._meta.fields]

    return MetaModelAdmin


for model in app_models:
    if model.__name__ == "User":
        continue
    admin.site.register(model, create_model_admin(model))


class CustomUserAdmin(UserAdmin):
    list_display = ("login",)
    ordering = ("login",)

    fieldsets = (
        (None, {"fields": ("login", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "address",
                    "postal_code",
                    "city",
                    "siren",
                    "bic",
                    "iban",
                    "email",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("login", "password1", "password2"),
            },
        ),
    )

    search_fields = ("login", "email", "last_name", "first_name")
    list_filter = ()


admin.site.register(User, CustomUserAdmin)

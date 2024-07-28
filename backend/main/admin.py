from django.contrib import admin
from django.apps import apps

from .models import User

app_models = apps.get_app_config("main").get_models()
from django.contrib.auth.admin import UserAdmin


# Fonction pour créer une classe ModelAdmin pour chaque modèle
def create_model_admin(model):
    class MetaModelAdmin(admin.ModelAdmin):
        list_display = [field.name for field in model._meta.fields]

    return MetaModelAdmin


# Enregistrez chaque modèle avec sa classe ModelAdmin correspondante
for model in app_models:
    if model.__name__ == "User":
        continue
    admin.site.register(model, create_model_admin(model))


class CustomUserAdmin(UserAdmin):
    list_display = (
        "login",
        "is_staff",
    )
    ordering = ("login",)

    fieldsets = (
        (None, {"fields": ("login", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "name",
                    "first_name",
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
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
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

    search_fields = ("login", "email", "name", "first_name")


admin.site.register(User, CustomUserAdmin)

from django.urls import include, path

urlpatterns = [
    path("user/", include("main.crud_urls.urls_user")),
]

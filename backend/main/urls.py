from django.urls import include, path

urlpatterns = [
    path("user/", include("main.crud_urls.urls_user")),
    path("invoice/", include("main.crud_urls.urls_invoice")),
    path("client/", include("main.crud_urls.urls_client")),
]

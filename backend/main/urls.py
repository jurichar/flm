from django.urls import include, path

urlpatterns = [
    path("user/", include("main.crud_urls.urls_user")),
    path("invoice/", include("main.crud_urls.urls_invoice")),
    path("invoiceitem/", include("main.crud_urls.urls_invoiceitem")),
]

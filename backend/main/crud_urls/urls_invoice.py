from django.urls import path
import main.crud.crud_invoice as api_views

urlpatterns = [
    path("list/", api_views.ListInvoiceAPIView.as_view(), name="list-invoice"),
    path(
        "create/",
        api_views.CreateInvoiceAPIView.as_view(),
        name="create-invoice",
    ),
    path(
        "update/<uuid:invoice_uid>/",
        api_views.UpdateInvoiceAPIView.as_view(),
        name="update-invoice",
    ),
    path(
        "delete/<uuid:invoice_uid>/",
        api_views.DeleteInvoiceAPIView.as_view(),
        name="delete-invoice",
    ),
    path(
        "retrieve/<uuid:invoice_uid>/",
        api_views.RetrieveInvoiceAPIView.as_view(),
        name="retrieve-invoice",
    ),
]

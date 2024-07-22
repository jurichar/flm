from django.urls import path
import main.crud.crud_invoiceitem as api_views

urlpatterns = [
    path(
        "list/invoiceitem/",
        api_views.ListInvoiceItemAPIView.as_view(),
        name="list-invoiceitem",
    ),
    path(
        "create/invoiceitem/",
        api_views.CreateInvoiceItemAPIView.as_view(),
        name="create-invoiceitem",
    ),
    path(
        "update/invoiceitem/<uuid:invoiceitem_uid>/",
        api_views.UpdateInvoiceItemAPIView.as_view(),
        name="update-invoiceitem",
    ),
    path(
        "delete/invoiceitem/<uuid:invoiceitem_uid>/",
        api_views.DeleteInvoiceItemAPIView.as_view(),
        name="delete-invoiceitem",
    ),
    path(
        "retrieve/invoiceitem/<uuid:invoiceitem_uid>/",
        api_views.RetrieveInvoiceItemAPIView.as_view(),
        name="retrieve-invoiceitem",
    ),
]

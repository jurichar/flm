from django.urls import path
import main.crud.crud_client as api_views

urlpatterns = [
    path("list/", api_views.ListClientAPIView.as_view(), name="list-client"),
    path(
        "create/",
        api_views.CreateClientAPIView.as_view(),
        name="create-client",
    ),
    path(
        "update/<uuid:client_uid>/",
        api_views.UpdateClientAPIView.as_view(),
        name="update-client",
    ),
    path(
        "delete/<uuid:client_uid>/",
        api_views.DeleteClientAPIView.as_view(),
        name="delete-client",
    ),
    path(
        "retrieve/<uuid:client_uid>/",
        api_views.RetrieveClientAPIView.as_view(),
        name="retrieve-client",
    ),
]

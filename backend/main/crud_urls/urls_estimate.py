from django.urls import path
import main.crud.crud_estimate as api_views

urlpatterns = [
    path("list/", api_views.ListEstimateAPIView.as_view(), name="list-estimate"),
    path(
        "create/",
        api_views.CreateEstimateAPIView.as_view(),
        name="create-estimate",
    ),
    path(
        "update/<uuid:estimate_uid>/",
        api_views.UpdateEstimateAPIView.as_view(),
        name="update-estimate",
    ),
    path(
        "delete/<uuid:estimate_uid>/",
        api_views.DeleteEstimateAPIView.as_view(),
        name="delete-estimate",
    ),
    path(
        "retrieve/<uuid:estimate_uid>/",
        api_views.RetrieveEstimateAPIView.as_view(),
        name="retrieve-estimate",
    ),
    path(
        "pdf/<uuid:estimate_uid>/",
        api_views.GenerateEstimatePDFView.as_view(),
        name="generate-estimate-pdf",
    ),
]

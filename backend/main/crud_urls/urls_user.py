from django.urls import path
import main.crud.crud_user as api_views

urlpatterns = [
    path("list/", api_views.ListUserAPIView.as_view(), name="list-user"),
    path("create/", api_views.CreateUserAPIView.as_view(), name="create-user"),
    path(
        "update/<uuid:user_uid>/",
        api_views.UpdateUserAPIView.as_view(),
        name="update-user",
    ),
    path(
        "delete/<uuid:user_uid>/",
        api_views.DeleteUserAPIView.as_view(),
        name="delete-user",
    ),
    path(
        "retrieve/<uuid:user_uid>/",
        api_views.RetrieveUserAPIView.as_view(),
        name="retrieve-user",
    ),
]

from django.urls import path

from .views import CustomerViewSet

urlpatterns = [
    path('customers', CustomerViewSet.as_view({
      'get': 'list',
      'post': 'create'
    })),
    path('customers/<str:pk>', CustomerViewSet.as_view({
      'get': 'get',
      'put': 'update',
      'delete': 'delete',
    })),
]

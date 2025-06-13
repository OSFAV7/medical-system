# paciente/urls.py

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import DatosPacienteViewSet, HistorialClinicoViewSet

router = DefaultRouter()
router.register(r'pacientes', DatosPacienteViewSet, basename='paciente')
router.register(r'historiales', HistorialClinicoViewSet, basename='historial')

urlpatterns = [
    path('', include(router.urls)),
]

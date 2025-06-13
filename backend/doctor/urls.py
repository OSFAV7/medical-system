from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import DatosDoctorViewSet, CitaConsultaViewSet

router = DefaultRouter()
router.register(r'doctores', DatosDoctorViewSet, basename='doctor')
router.register(r'citas',    CitaConsultaViewSet, basename='cita')

urlpatterns = [
    path('', include(router.urls)),
]

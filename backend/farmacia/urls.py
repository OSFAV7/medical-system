from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    PerfilUsuarioViewSet,
    MedicamentoViewSet,
    RecetaEmitidaViewSet,
    MedicamentoVendidoViewSet,
    RegistroUsuarioView
)

router = DefaultRouter()
router.register(r'perfiles', PerfilUsuarioViewSet, basename='perfilusuario')
router.register(r'medicamentos', MedicamentoViewSet, basename='medicamento')
router.register(r'recetas', RecetaEmitidaViewSet, basename='recetaemitida')
router.register(r'ventas', MedicamentoVendidoViewSet, basename='medicamentovendido')

urlpatterns = [
    path('', include(router.urls)),
    path('registro/', RegistroUsuarioView.as_view(), name='registro-usuario'),
]

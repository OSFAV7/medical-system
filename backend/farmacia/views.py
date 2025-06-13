# farmacia/views.py

from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import PerfilUsuario, Medicamento, RecetaEmitida, MedicamentoVendido
from .serializers import (
    PerfilUsuarioSerializer,
    MedicamentoSerializer,
    RecetaEmitidaSerializer,
    MedicamentoVendidoSerializer,
    MyTokenObtainPairSerializer
)

class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para PerfilUsuario.
    """
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer


class MedicamentoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para Medicamento (inventario).
    """
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer


class RecetaEmitidaViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para RecetaEmitida.
    """
    queryset = RecetaEmitida.objects.all()
    serializer_class = RecetaEmitidaSerializer


class MedicamentoVendidoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para MedicamentoVendido.
    """
    queryset = MedicamentoVendido.objects.all()
    serializer_class = MedicamentoVendidoSerializer



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
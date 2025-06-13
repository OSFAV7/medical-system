# Create your views here.
# paciente/views.py

from rest_framework import viewsets
from .models import DatosPaciente, HistorialClinico
from .serializers import DatosPacienteSerializer, HistorialClinicoSerializer

class DatosPacienteViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para DatosPaciente.
    """
    queryset = DatosPaciente.objects.all()
    serializer_class = DatosPacienteSerializer


class HistorialClinicoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para HistorialClinico.
    """
    queryset = HistorialClinico.objects.all()
    serializer_class = HistorialClinicoSerializer

from rest_framework import viewsets
from .models import DatosDoctor, CitaConsulta
from .serializers import DatosDoctorSerializer, CitaConsultaSerializer

class DatosDoctorViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para DatosDoctor.
    """
    queryset = DatosDoctor.objects.all()
    serializer_class = DatosDoctorSerializer


class CitaConsultaViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para CitaConsulta.
    """
    queryset = CitaConsulta.objects.all()
    serializer_class = CitaConsultaSerializer

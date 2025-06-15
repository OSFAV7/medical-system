# farmacia/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import PerfilUsuario, Medicamento, RecetaEmitida, MedicamentoVendido
from .serializers import (
    PerfilUsuarioSerializer,
    MedicamentoSerializer,
    RecetaEmitidaSerializer,
    MedicamentoVendidoSerializer,
    MyTokenObtainPairSerializer,
    RegistroUsuarioSerializer
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
    
class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]
    """
    Registra un nuevo usuario y crea su perfil asociado (doctor o paciente).
    """
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
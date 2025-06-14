# paciente/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import DatosPaciente, HistorialClinico

class HistorialClinicoSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=DatosPaciente.objects.all()
    )

    class Meta:
        model = HistorialClinico
        fields = [
            'id',
            'paciente',
            'fecha_consulta',
            'motivo_consulta',
            'diagnostico',
            'tratamiento',
            'estadoactual',
            'peso',
            'altura',
            'notas_medicas',
        ]
        read_only_fields = ['fecha_consulta']


class DatosPacienteSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source="usuario.get_full_name", read_only=True)
    usuario_email = serializers.EmailField(source="usuario.email", read_only=True)
    # Puedes agregar más campos si lo necesitas, por ejemplo:
    # usuario_username = serializers.CharField(source="usuario.username", read_only=True)

    historiales = HistorialClinicoSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = DatosPaciente
        fields = [
            'id',
            'usuario',
            'usuario_nombre',   # <--- Añade aquí
            'usuario_email',    # <--- Y aquí
            'fecha_nacimiento',
            'sexo',
            'direccion',
            'telefono',
            'crup',
            'tipo_sangre',
            'alergias',
            'historiales',
        ]

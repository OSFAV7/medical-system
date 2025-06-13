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
    usuario = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    
    historiales = HistorialClinicoSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = DatosPaciente
        fields = [
            'id',
            'usuario',
            'fecha_nacimiento',
            'sexo',
            'direccion',
            'telefono',
            'crup',
            'tipo_sangre',
            'alergias',
            'historiales',
        ]

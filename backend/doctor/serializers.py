from rest_framework import serializers
from django.contrib.auth.models import User
from .models import DatosDoctor, CitaConsulta
from paciente.models import DatosPaciente

class DatosDoctorSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = DatosDoctor
        fields = [
            'id',
            'usuario',
            'especialidad',
            'cedula_profesional',
            'telefono',
            'direccion_consultorio',
        ]


class CitaConsultaSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(
        queryset=DatosDoctor.objects.all()
    )
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=DatosPaciente.objects.all()
    )

    class Meta:
        model = CitaConsulta
        fields = [
            'id',
            'doctor',
            'paciente',
            'fecha_hora',
            'motivo',
            'estado',
            'notas',
        ]

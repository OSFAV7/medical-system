from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PerfilUsuario, Medicamento, RecetaEmitida, MedicamentoVendido

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = PerfilUsuario
        fields = ['id', 'usuario', 'tipo_usuario']


class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = ['id', 'nombre', 'descripcion', 'cantidad', 'precio_unitario']


class RecetaEmitidaSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=PerfilUsuario.objects.filter(tipo_usuario='paciente').values_list('usuario', flat=True)
    )
    doctor = serializers.PrimaryKeyRelatedField(
        queryset=PerfilUsuario.objects.filter(tipo_usuario='doctor').values_list('usuario', flat=True)
    )

    class Meta:
        model = RecetaEmitida
        fields = ['id', 'paciente', 'doctor', 'fecha_emision', 'estado']
        read_only_fields = ['fecha_emision']


class MedicamentoVendidoSerializer(serializers.ModelSerializer):
    receta = serializers.PrimaryKeyRelatedField(
        queryset=RecetaEmitida.objects.all(),
        required=False,
        allow_null=True
    )
    medicamento = serializers.PrimaryKeyRelatedField(
        queryset=Medicamento.objects.all()
    )

    class Meta:
        model = MedicamentoVendido
        fields = [
            'id',
            'receta',
            'numero_receta_externa',
            'medicamento',
            'cantidad_vendida',
            'precio_unitario_vendido',
            'fecha_venta'
        ]
        read_only_fields = ['fecha_venta']

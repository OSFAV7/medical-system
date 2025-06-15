from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
        

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['tipo_usuario'] = user.perfil.tipo_usuario
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['username']     = self.user.username
        data['tipo_usuario'] = self.user.perfil.tipo_usuario
        return data

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    tipo_usuario = serializers.ChoiceField(choices=PerfilUsuario.TIPO_USUARIO_CHOICES, write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'password', 'tipo_usuario']

    def create(self, validated_data):
        tipo_usuario = validated_data.pop('tipo_usuario')
        password = validated_data.pop('password')
        user = User.objects.create(username=validated_data['username'])
        user.set_password(password)
        user.save()
        PerfilUsuario.objects.create(usuario=user, tipo_usuario=tipo_usuario)
        return user
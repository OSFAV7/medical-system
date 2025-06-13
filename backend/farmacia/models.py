# farmacia/models.py

from django.db import models
from django.contrib.auth.models import User
from paciente.models import DatosPaciente
from doctor.models import DatosDoctor

class PerfilUsuario(models.Model):
    TIPO_USUARIO_CHOICES = [
        ('paciente', 'Paciente'),
        ('doctor',   'Doctor'),
        ('farmacia', 'Farmacia'),
    ]
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_USUARIO_CHOICES)

    def __str__(self):
        return f"{self.usuario.username} ({self.get_tipo_usuario_display()})"


class Medicamento(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre


class RecetaEmitida(models.Model):
    ESTADO_CHOICES = [
        ('no_surtida',    'No surtida'),
        ('parcialmente',  'Parcialmente surtida'),
        ('completamente', 'Completamente surtida'),
    ]
    paciente = models.ForeignKey(DatosPaciente, on_delete=models.CASCADE, related_name='recetas')
    doctor  = models.ForeignKey(DatosDoctor,   on_delete=models.CASCADE, related_name='recetas_emitidas')
    fecha_emision = models.DateTimeField(auto_now_add=True)
    estado        = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='no_surtida')

    def __str__(self):
        return f"Receta #{self.id} — {self.paciente.usuario.get_full_name()} ({self.get_estado_display()})"


class MedicamentoVendido(models.Model):
    """
    Permitimos que receta sea opcional (ventas sin receta interna),
    y guardamos el número de receta externa si existe.
    """
    receta = models.ForeignKey(
        RecetaEmitida,
        on_delete=models.CASCADE,
        related_name='medicamentos_vendidos',
        null=True,
        blank=True
    )
    numero_receta_externa = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Número de receta física o externa (si no fue emitida en el sistema)"
    )
    medicamento = models.ForeignKey(
        Medicamento,
        on_delete=models.PROTECT,
        related_name='ventas'
    )
    cantidad_vendida         = models.PositiveIntegerField()
    precio_unitario_vendido  = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_venta              = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        return self.cantidad_vendida * self.precio_unitario_vendido

    def __str__(self):
        receta_info = (
            f"Receta #{self.receta.id}"
            if self.receta
            else f"Receta externa: {self.numero_receta_externa or '—'}"
        )
        return f"{self.cantidad_vendida}×{self.medicamento.nombre} — {receta_info}"

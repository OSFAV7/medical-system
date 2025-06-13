# doctor/models.py

from django.db import models
from django.contrib.auth.models import User
from paciente.models import DatosPaciente

class DatosDoctor(models.Model):
    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='datos_doctor'
    )
    especialidad = models.CharField(max_length=100)
    cedula_profesional = models.CharField(max_length=50, unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion_consultorio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Dr(a). {self.usuario.get_full_name()} – {self.especialidad}"

class CitaConsulta(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]

    doctor = models.ForeignKey(
        DatosDoctor,
        on_delete=models.CASCADE,
        related_name='citas'
    )
    paciente = models.ForeignKey(
        DatosPaciente,
        on_delete=models.CASCADE,
        related_name='citas'
    )
    fecha_hora = models.DateTimeField()
    motivo = models.TextField()
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='pendiente'
    )
    notas = models.TextField(blank=True, null=True)

    def __str__(self):
        fecha = self.fecha_hora.strftime('%Y-%m-%d %H:%M')
        return f"Cita {self.paciente.usuario.get_full_name()} con Dr(a). {self.doctor.usuario.get_full_name()} – {fecha}"

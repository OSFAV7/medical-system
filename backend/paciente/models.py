# paciente/models.py

from django.db import models
from django.contrib.auth.models import User

class DatosPaciente(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='datos_paciente')
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=10, choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')])
    direccion = models.TextField(blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    crup = models.CharField(max_length=20, blank=True, null=True)
    tipo_sangre = models.CharField(max_length=20, blank=True, null=True)
    alergias= models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.usuario.first_name

class HistorialClinico(models.Model):
    paciente = models.ForeignKey(DatosPaciente, on_delete=models.CASCADE, related_name='historiales')
    fecha_consulta = models.DateTimeField(auto_now_add=True)
    motivo_consulta = models.TextField()
    diagnostico = models.TextField()
    tratamiento = models.TextField()
    estadoactual = models.CharField(max_length=250, blank=True, null=True)
    peso = models.CharField(max_length=20, blank=True, null=True)
    altura = models.CharField(max_length=20, blank=True, null=True)
    notas_medicas = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Consulta de {self.paciente.usuario.first_name} - {self.fecha_consulta.date()}"

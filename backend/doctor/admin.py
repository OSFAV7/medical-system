from django.contrib import admin
from .models import DatosDoctor, CitaConsulta

@admin.register(DatosDoctor)
class DatosDoctorAdmin(admin.ModelAdmin):
    list_display = (
        'usuario',
        'especialidad',
        'cedula_profesional',
    )
    search_fields = (
        'usuario__username',
        'usuario__first_name',
        'usuario__last_name',
        'especialidad',
        'cedula_profesional',
    )
    list_filter = (
        'especialidad',
    )


@admin.register(CitaConsulta)
class CitaConsultaAdmin(admin.ModelAdmin):
    list_display = (
        'doctor',
        'paciente',
        'fecha_hora',
        'estado',
    )
    search_fields = (
        'doctor__usuario__username',
        'paciente__usuario__username',
        'motivo',
        'notas',
    )
    list_filter = (
        'estado',
        'fecha_hora',
    )

# paciente/admin.py

from django.contrib import admin
from .models import DatosPaciente, HistorialClinico

@admin.register(DatosPaciente)
class DatosPacienteAdmin(admin.ModelAdmin):
    list_display = (
        'usuario',
        'fecha_nacimiento',
        'sexo',
        'tipo_sangre',
        'crup',
    )
    search_fields = (
        'usuario__username',
        'usuario__first_name',
        'usuario__last_name',
        'crup',
    )
    list_filter = (
        'sexo',
        'tipo_sangre',
    )


@admin.register(HistorialClinico)
class HistorialClinicoAdmin(admin.ModelAdmin):
    list_display = (
        'paciente',
        'fecha_consulta',
        'diagnostico',
    )
    search_fields = (
        'paciente__usuario__username',
        'diagnostico',
    )
    list_filter = (
        'fecha_consulta',
    )


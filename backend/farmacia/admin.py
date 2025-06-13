from django.contrib import admin
from .models import PerfilUsuario, Medicamento, RecetaEmitida, MedicamentoVendido

@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display  = ('usuario', 'tipo_usuario')
    list_filter   = ('tipo_usuario',)
    search_fields = ('usuario__username', 'usuario__first_name', 'usuario__last_name')


@admin.register(Medicamento)
class MedicamentoAdmin(admin.ModelAdmin):
    list_display  = ('nombre', 'cantidad', 'precio_unitario')
    search_fields = ('nombre',)
    list_filter   = ('nombre',)


@admin.register(RecetaEmitida)
class RecetaEmitidaAdmin(admin.ModelAdmin):
    list_display  = ('id', 'paciente', 'doctor', 'fecha_emision', 'estado')
    list_filter   = ('estado', 'fecha_emision')
    search_fields = (
        'paciente__usuario__username',
        'doctor__usuario__username',
        'id'
    )


@admin.register(MedicamentoVendido)
class MedicamentoVendidoAdmin(admin.ModelAdmin):
    list_display  = ('medicamento', 'cantidad_vendida', 'receta', 'numero_receta_externa', 'fecha_venta')
    list_filter   = ('fecha_venta',)
    search_fields = (
        'medicamento__nombre',
        'numero_receta_externa',
        'receta__id'
    )

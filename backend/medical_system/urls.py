from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView,)
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


def index(request):
    return HttpResponse(
        "<h1>Medical Backend API</h1>"
        "<p>Visita <a href='/api/docs/swagger/'>/api/docs/swagger/</a> para la documentación</p>"
    )

urlpatterns = [
    path('', index, name='home'),
    path('admin/', admin.site.urls),
    path('api/paciente/', include('paciente.urls')),
    path('api/doctor/', include('doctor.urls')),
    path('api/farmacia/', include('farmacia.urls')),
    
    # Endpoints de JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # OpenAPI schema JSON/YAML
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI interactivo
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # ReDoc (alternativa más minimalista)
    path('api/docs/redoc/',    SpectacularRedocView.as_view(url_name='schema'),    name='redoc'),
]

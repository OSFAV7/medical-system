#!/bin/sh
# entrypoint.sh

# 1) Migraciones (crea auth_user, django_session, etc)
python manage.py migrate --noinput

# 2) Copia todos los staticfiles (incluido admin)
python manage.py collectstatic --noinput

# 3) Levanta Gunicorn
exec gunicorn medical_system.wsgi:application --bind 0.0.0.0:8000

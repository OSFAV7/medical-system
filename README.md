Desde la raiz del proyecto debes ejecutar el siguiente comado para crear los contenedores de docker y ponerlos en linea:

      docker-compose up -d

estaticos

      docker-compose exec backend python manage.py collectstatic --noinput

      
Ejecutar el siguinete comado para hacer las migraciones a la base de datos:

      docker-compose exec backend python manage.py migrate
  
Ejecutar el siguinte comado para crear el superusuario y poder acceder al admin y acceso a las apis:

      docker-compose exec backend python manage.py createsuperuser

usuario:
 
      medicalSystem


contraseña:

      System123456

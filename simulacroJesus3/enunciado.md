# Setup

Antes de empezar a realizar los problemas que aparecen a continuacion, siga los siguientes pasos en orden usando la consola:

1. Entre en la carpeta `setup` y ejecute el comando `sh setup.sh`. Este script se encarga de la instalacion de MongoDB en la maquina, incluyendo los comandos necesarios durante el examen (`mongosh`, `mongoimport`, etc.).
2. Entre en la carpeta `setup` y ejecute el comando `sh db.sh`. Este script carga los datasets que necesitara durante el examen.
3. Compruebe que todo se ha ejecutado correctamente ejecutando `mongosh`, seleccionando la base de datos `academy` y comprobando las colecciones cargadas.

# Problema 1

La carpeta `api` contiene un servidor web que arranca una API REST incompleta para gestionar cursos. La especificacion OpenAPI esta en `schema/course.schema.yaml`.

Tenga en cuenta las siguientes consideraciones:

* Vamos a dejar que MongoDB gestione las id, por lo que usaremos `_id` como id del recurso.
* No se permite editar un curso completo.
* Anadir un alumno debe modificar el array `students` del curso existente.
* Publicar un curso debe cambiar el campo `active` a `true`.
* Las rutas, codigos HTTP y cuerpos de respuesta deben coincidir con OpenAPI.

Complete los apartados que aparecen a continuacion.

## Apartado 1

El proyecto no se conecta correctamente usando la variable de entorno esperada por el resto del examen. Revise el codigo de conexion y configurelo para que use la variable `MONGODB_URI`.

## Apartado 2

Actualmente la API no se esta ejecutando en la ruta base definida en el documento OpenAPI. Modifique el servidor y los tests para que coincidan con la especificacion.

## Apartado 3

La ruta `GET /courses` debe devolver una respuesta paginada con la forma definida en OpenAPI. Ademas, cada curso debe incluir solamente `_id`, `title`, `teacher`, `level` y `enrolled`.

Tenga en cuenta que:

* `limit` debe limitar el numero de resultados.
* `skip` debe saltarse los primeros resultados.
* Si se indica `skill`, deben devolverse los cursos que contengan ese skill dentro del array `skills`.
* La respuesta debe incluir el numero de cursos devueltos en `count`.
* La respuesta debe incluir en `nextSkip` el valor que deberia usarse para obtener la siguiente pagina.

## Apartado 4

La ruta `GET /courses/featured` debe devolver los 3 cursos activos con mas alumnos matriculados. No debe incluir el array `students` en la respuesta.

## Apartado 5

La ruta `GET /courses/stats/levels` debe devolver, para cada nivel, el numero de cursos y el total de alumnos matriculados. La forma de cada elemento debe ser:

```json
{
  "level": "intermedio",
  "courses": 2,
  "totalEnrolled": 47
}
```

Modifique tambien OpenAPI si fuera necesario.

## Apartado 6

La ruta `POST /courses/{courseId}/students` debe anadir el alumno recibido al array `students` del curso correspondiente sin reemplazar los alumnos anteriores.

Gestione los siguientes casos:

* id invalido
* curso no encontrado
* cuerpo de peticion invalido
* alumno anadido correctamente

## Apartado 7

La ruta `PATCH /courses/{courseId}/publish` debe publicar el curso correspondiente. Gestione todos los codigos de respuesta definidos en OpenAPI.

## Apartado 8

En la ruta `DELETE /courses/{courseId}` no se estan aplicando todas las respuestas definidas en la especificacion OpenAPI. Modifique el servidor para que se tengan en cuenta todos los casos definidos.

# Problema 2

Haciendo uso de `mongosh`, complete el archivo `problema2.txt` con las operaciones que se piden en los siguientes apartados. Para cada una indique unicamente la instruccion realizada, no hace falta indicar la solucion.

Cada apartado se responde con una unica consulta y debe seguir siendo valida si se anaden o eliminan documentos.

## Apartado 1

En la coleccion `courses`, indique el/los titulo(s) del curso con mas alumnos en el array `students`.

## Apartado 2

En la coleccion `courses`, indique cuantos cursos contienen el skill `mongodb`.

## Apartado 3

En la coleccion `courses`, indique para cada nivel (`level`) el numero de cursos de ese nivel.

## Apartado 4

En la coleccion `courses`, indique el titulo, profesor y numero de matriculados de los 3 cursos activos con mas matriculados.

## Apartado 5

En la coleccion `teachers`, indique cuantos profesores activos hay por cada departamento.

# Problema 3

Analice el codigo del proyecto y responda en `problema3.txt` a las siguientes preguntas:

1. De que formas se puede arrancar el proyecto segun `package.json`?
2. En que puerto arranca por defecto?
3. Que base de datos y coleccion principal se usan?
4. Cual es la ruta completa que devuelve los cursos destacados?
5. Que operador de MongoDB deberia usarse para anadir un alumno sin perder los anteriores?

Tenga en cuenta las siguientes recomendaciones durante el examen:

* Asegurese de hacer push de forma periodica y no lo deje para el final.
* Gestione los errores y las excepciones de forma adecuada.
* Asegurese de que la version de la aplicacion que entrega compila y ejecuta.
* Antes de entregar el examen, asegurese de que ha hecho al menos un push.

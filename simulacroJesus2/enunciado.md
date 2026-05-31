# Setup

Antes de empezar a realizar los problemas que aparecen a continuacion, siga los siguientes pasos en orden usando la consola:

1. Entre en la carpeta `setup` y ejecute el comando `sh setup.sh`. Este script se encarga de la instalacion de MongoDB en la maquina, incluyendo los comandos necesarios durante el examen (`mongosh`, `mongoimport`, etc.).
2. Entre en la carpeta `setup` y ejecute el comando `sh db.sh`. Este script carga los datasets que necesitara durante el examen.
3. Compruebe que todo se ha ejecutado correctamente ejecutando `mongosh`, seleccionando la base de datos `blog` y comprobando las colecciones cargadas.

# Problema 1

La carpeta `api` contiene un servidor web que arranca una API REST incompleta para gestionar posts y comentarios. La especificacion OpenAPI esta en `schema/post.schema.yaml`.

Tenga en cuenta las siguientes consideraciones:

* Vamos a dejar que MongoDB gestione las id, por lo que usaremos `_id` como id del recurso.
* No se permite editar un post completo.
* Anadir un comentario debe modificar el array `comments` del post existente.
* Anadir un like debe incrementar el valor actual de `likes`.
* Las rutas, codigos HTTP y cuerpos de respuesta deben coincidir con OpenAPI.

Complete los apartados que aparecen a continuacion.

## Apartado 1

El proyecto no se conecta correctamente usando la variable de entorno esperada por el resto del examen. Revise el codigo de conexion y configurelo para que use la variable `MONGODB_URI`.

## Apartado 2

Actualmente la API no se esta ejecutando en la ruta base definida en el documento OpenAPI. Modifique el servidor para que coincidan.

## Apartado 3

La ruta `GET /posts` debe devolver una respuesta paginada con la forma definida en OpenAPI. Ademas, cada post debe incluir solamente `_id`, `title`, `author` y `createdAt`.

Tenga en cuenta que:

* `limit` debe limitar el numero de resultados.
* `skip` debe saltarse los primeros resultados.
* Si se indica `tag`, deben devolverse los posts que contengan ese tag dentro del array `tags`.
* La respuesta debe incluir el numero de posts devueltos en el campo `count`.

## Apartado 4

La ruta `GET /posts/latest` debe devolver los 3 posts mas recientes. No debe incluir el array `comments` en la respuesta.

## Apartado 5

La ruta `GET /posts/stats/authors` debe devolver, para cada autor, el numero de posts y el total de likes acumulados. La forma de cada elemento debe ser:

```json
{
  "author": "Ana",
  "posts": 2,
  "totalLikes": 33
}
```

Modifique tambien OpenAPI si fuera necesario.

## Apartado 6

La ruta `POST /posts/{postId}/comments` debe anadir el comentario recibido al array `comments` del post correspondiente sin reemplazar los comentarios anteriores.

Gestione los siguientes casos:

* id invalido
* post no encontrado
* cuerpo de peticion invalido
* comentario anadido correctamente

## Apartado 7

La ruta `PATCH /posts/{postId}/likes` debe incrementar en 1 el numero de likes del post correspondiente, no reemplazarlo por un valor fijo.

## Apartado 8

En la ruta `DELETE /posts/{postId}` no se estan aplicando todas las respuestas definidas en la especificacion OpenAPI. Modifique el servidor para que se tengan en cuenta todos los casos definidos.

# Problema 2

Haciendo uso de `mongosh`, complete el archivo `problema2.txt` con las operaciones que se piden en los siguientes apartados. Para cada una indique unicamente la instruccion realizada, no hace falta indicar la solucion.

Cada apartado se responde con una unica consulta y debe seguir siendo valida si se anaden o eliminan documentos.

## Apartado 1

En la coleccion `posts`, indique el/los titulo(s) del post con mas comentarios.

## Apartado 2

En la coleccion `posts`, indique cuantos posts contienen el tag `mongodb`.

## Apartado 3

En la coleccion `posts`, indique para cada autor el numero de posts publicados por ese autor.

## Apartado 4

En la coleccion `posts`, indique el titulo, autor y numero de likes de los 3 posts publicados con mas likes.

## Apartado 5

En la coleccion `users`, indique cuantos usuarios activos hay por cada rol.

# Problema 3

Analice el codigo del proyecto y responda en un archivo llamado `problema3.txt` a las siguientes preguntas:

1. De que formas se puede arrancar el proyecto segun `package.json`?
2. En que puerto arranca por defecto?
3. Que base de datos y coleccion principal se usan?
4. Cual es la ruta completa que devuelve los ultimos posts?
5. Que operador de MongoDB deberia usarse para anadir un comentario sin perder los anteriores?
6. Que operador de MongoDB deberia usarse para incrementar los likes?

Tenga en cuenta las siguientes recomendaciones durante el examen:

* Asegurese de hacer push de forma periodica y no lo deje para el final.
* Gestione los errores y las excepciones de forma adecuada.
* Asegurese de que la version de la aplicacion que entrega compila y ejecuta.
* Antes de entregar el examen, asegurese de que ha hecho al menos un push.

# Setup

Antes de empezar a realizar los problemas que aparecen a continuacion, siga los siguientes pasos en orden usando la consola:

1. Entre en la carpeta `setup` y ejecute el comando `sh setup.sh`. Este script se encarga de la instalacion de MongoDB en la maquina, incluyendo los comandos necesarios durante el examen (`mongosh`, `mongoimport`, etc.).
2. Entre en la carpeta `setup` y ejecute el comando `sh db.sh`. Este script se encarga de cargar unos datasets en MongoDB que necesitara durante el examen.
3. Compruebe que todo se ha ejecutado correctamente ejecutando `mongosh` y comprobando las colecciones cargadas.

# Problema 1

La carpeta `api` contiene un servidor web que arranca una API REST incompleta. La especificacion OpenAPI esta en `schema/restaurant.schema.yaml`.

Tenga en cuenta las siguientes consideraciones:

* Vamos a dejar que la base de datos gestione las id, con lo que usaremos `_id` como nuestras id tratandola como un string.
* Por simplicidad no se permite editar la informacion de los restaurantes.
* Las rutas deben coincidir con la especificacion OpenAPI.
* Debe gestionar los errores y excepciones de forma adecuada.

Complete los apartados que aparecen a continuacion.

## Apartado 1

Actualmente la API no se esta ejecutando en la ruta que esta especificada en el documento OpenAPI. Modifique el servidor para que coincidan.

## Apartado 2

Actualmente la ruta `GET /restaurant` esta devolviendo la informacion completa de cada restaurante, pero eso no deberia ser asi. Modifique el servidor para que de cada restaurante se devuelva solo la informacion especificada en el documento OpenAPI.

## Apartado 3

Queremos hacer nuestra API RESTful y para eso nos falta una parte muy importante, HATEOAS. Vamos a empezar a implementarlo en alguna de las rutas, pero no queremos modificar los datos que tenemos en la base de datos.

En `GET /restaurant` anada a cada restaurante del array `results` un atributo `link` que enlace a la ruta completa de ese restaurante: `/restaurant/{id}`.

De forma que por ejemplo se devuelva lo siguiente, por simplicidad solo se muestra un restaurante en los resultados:

```json
{
  "results": [
    {
      "_id": "646332b5b3767c0bcb5d4b3b",
      "name": "La Esquina Verde",
      "cuisine": "Mediterranea",
      "rating": 4.6,
      "link": "http://localhost:3000/api/v2/restaurant/646332b5b3767c0bcb5d4b3b"
    }
  ],
  "next": null
}
```

Modifique el archivo OpenAPI para tener en cuenta esta modificacion.

## Apartado 4

En la ruta `POST /restaurant` no se estan aplicando todas las respuestas definidas en la especificacion OpenAPI. Modifique el servidor para que tenga en cuenta el caso de exito y el caso de entrada invalida.

## Apartado 5

En la ruta `DELETE /restaurant/{id}` no se estan aplicando todas las respuestas definidas en la especificacion OpenAPI. Modifique el servidor para que se tengan en cuenta todos los casos definidos.

# Problema 2

Haciendo uso de `mongosh`, complete el archivo `problema2.txt` con las operaciones que se piden en los siguientes apartados. Para cada una indique unicamente la instruccion realizada, no hace falta indicar la solucion.

De forma que la respuesta del apartado 1 quede por ejemplo como se muestra a continuacion:

```text
## Apartado 1
Instruccion
```

Tenga en cuenta que cada apartado se responde con una unica consulta y que esta tiene que seguir siendo valida si se anaden o eliminan documentos de la coleccion.

## Apartado 1

En la coleccion `orders`, indique el/los nombre(s) del restaurante con mas pedidos.

## Apartado 2

En la coleccion `restaurants`, indique el/los nombre(s) del restaurante con mas platos en su carta.

## Apartado 3

En la coleccion `restaurants`, indique para cada tipo de `cuisine` el numero de restaurantes de ese tipo.

## Apartado 4

En la coleccion `orders`, indique el numero de pedidos que hay para cada estado (`status`).

Tenga en cuenta las siguientes recomendaciones durante el examen:

* Asegurese de hacer push de forma periodica y no lo deje para el final.
* Gestione los errores y las excepciones de forma adecuada.
* Asegurese de que la version de la aplicacion que entrega compila y ejecuta.
* Antes de entregar el examen, asegurese de que ha hecho al menos un push.

const fs = require ("fs/promises");
const Ajv= require("ajv/dist/2020");

async function main() {
    // 1) Leer los datos
    const contenido = await fs.readFile('datos2.json', 'utf8');
    console.log(contenido);

    // 2) Leer el schema
    const schemaTxt = await fs.readFile("schema.json", "utf8");

    // 3) Parseamos a texto
    const datos = JSON.parse(contenido);
    const schema = JSON.parse(schemaTxt);

    // 3) Validar
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);

    const ok = validate(datos);

    if (ok) {
        console.log("✅ Datos válidos según el schema");
    } else {
        console.log("❌ Datos NO válidos");
        console.log(validate.errors);
    }
}

main().catch(console.error);
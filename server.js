const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('static'));

app.get('/ejemplo', (req, res) => {

    console.log("Esta es una ruta de ejemplo");

    res.send('hola')
});

//CREAR
app.get('/crear', (req, res) => {
    console.log(req.query);
    const archivo = `archivos/${req.query.archivo}`;
    const contenido = req.query.contenido;
    fs.writeFile(archivo, contenido, 'utf8', function() {
        console.log('archivo creado ok');
    });
    res.send('Creando el archivo');
    res.end();

});

//LEER
app.get('/leer', (req, res) => {
    console.log(req.query);
    const archivo = `archivos/${req.query.archivo}`;
    fs.readFile(archivo, 'utf8', function(err, data) {
        console.log(data);
        res.send(data);
        res.end();
    });
});

//RENOMBRAR
app.get('/renombrar', (req, res) => {
    console.log(req.query);

    const nomArchivoViejo = `archivos/${req.query.nombre}`;
    const nomArchivoNuevo = `archivos/${req.query.nuevoNombre}`;

    fs.rename(nomArchivoViejo, nomArchivoNuevo, function() {
        console.log('archivo renombrado');
    });

    res.send('archivo renombrado');
});

//ELIMINAR
app.get('/eliminar', (req, res) => {
    console.log(req.query);
    const archivo = `archivos/${req.query.archivoEliminar}`;
    fs.unlink(archivo, (err) => {
        if (err) {
            console.error(err)
            return res.send(err);
        }

        res.send('El archivo fue eliminado correctamente');

    });
});


app.listen(3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


/* Para usar RSS en nuestra Web */
const axios = require('axios');
const xml2js = require('xml2js');


app.use(express.json());
app.use(express.static('public'));
app.use('/scripts', express.static('public/scripts', { 'Content-Type': 'application/javascript' }));


/* Devuelve la página principal */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');


});
app.get('/atom', async (req, res) => {
    try {
        const response = await axios.get('https://www.mujerhoy.com/rss/atom/portada');
        const xml = response.data;
        
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error al parsear XML:', err);
                res.status(500).send('Error al parsear el feed Atom');
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error('Error al obtener el feed Atom:', error.message);
        res.status(500).send('Error al obtener el feed atom');
    }
});
app.get('/productos', (req, res) => {
    fs.readFile('archivo.json', 'utf-8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo JSON:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }


        try {
            const productos = JSON.parse(data);
            res.json(productos);
        } catch (parseError) {
            console.error('Error al analizar el JSON:', parseError);
            res.status(500).send('Error interno del servidor');
        }
    });
});




/* Ruta GET del servidor que lee un fichero Json */
app.get('/json', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('perfumes.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }


    // Convierte el contenido del archivo a un objeto JavaScript
    const jsonData = JSON.parse(data);


    // Envía el objeto como respuesta
    res.json(jsonData);
  });
});




/* Convierte XML a JSON */
app.get('/rss', async(req, res) => {
  try{
    //Realiza la petición HTTP para obtener el XML
    const response = await axios.get('https://estaticos.marca.com/rss/portada.xml');
    const xml = response.data;
   
    xml2js.parseString(xml, {explicitArray: false}, (err, result) => {
      if (err) {
        throw err;
      }
      //Envía el JSON al cliente
      res.json(result);
    })
  }
  catch(error){
    res.status(500).send('Error al obtener el feed RSS');
  }
})


/* Puerto de escucha del servidor */
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en puerto 3000`);
});







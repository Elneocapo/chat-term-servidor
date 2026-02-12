//IMPORTAR LIBRERIA

import { WebSocketServer, WebSocket } from "ws";



//creamos servidor y le decimos que escuche al puerto 3000

const PORT = process.env.PORT || 3000;
const servidor = new WebSocketServer({ port: PORT });


//funcion que se ejecuta cuando el cliente se conecta

servidor.on("connection", (ws) => {

console.log("cliente conectado");


//el servidor manda mensaje SOLO al cliente que se acaba de conectar (no a todos)

ws.send("Bienvenido 👋");




//cuando este cliente me mande algo, avísame

    ws.on("message", (message) => {

 let mensajetexto = message.toString();

 let datos_recibidos = mensajetexto.split(",");



 //Miraver si el mensaje es para el servidor o no

 if(datos_recibidos.includes("ALLCLIENTS_LOG")){



 servidor.clients.forEach((client) => {

 if (client.readyState === 1) {

        //el JSON mierda ese es para que se mande como array

          client.send(JSON.stringify([datos_recibidos[0], datos_recibidos[1].toString().replace("ALLCLIENTS_LOG", "").trim()]));

       }

   });



  }else{
   console.log(datos_recibidos);
     console.log("no hubo readystate1");

  }


 });
});






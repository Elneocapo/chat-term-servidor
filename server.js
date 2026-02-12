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
console.log(message);
 let mensajetexto = message.toString();
console.log(mensajetexto);
 let datos_recibidos = mensajetexto;
console.log(datos_recibidos);


 //Miraver si el mensaje es para el servidor o no

 if(datos_recibidos.includes("ALLCLIENTS_LOG")){

let mensajefinal  = datos_recibidos.toString().replace("ALLCLIENTS_LOG", "").trim();
console.log("M1" + mensajefinal);
mensajefinal = mensajefinal.replace("[","").trim();
mensajefinal = mensajefinal.replace("]","").trim();
console.log("M2" + mensajefinal);

 servidor.clients.forEach((client) => {

 //if (client.readyState === 1) {

        //el JSON mierda ese es para que se mande como array

          client.send(mensajefinal);
         console.log(mensajefinal);

      // }

   });



  }//else{
   //console.log(datos_recibidos[0] + "yyy" + datos_recibidos[1]);
   //  console.log("no hubo readystate1");

  //}


 });
});















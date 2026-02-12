import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const servidor = new WebSocketServer({ port: PORT });

console.log(`Servidor escuchando en el puerto ${PORT}`);

servidor.on("connection", (ws) => {
  console.log("Cliente conectado");
  ws.send("Bienvenido 👋");

  ws.on("message", (data) => {
    // 1. Convertimos los datos a String (IMPORTANTE)
    const mensajeRecibido = data.toString();

    // 2. Verificamos si contiene la clave
    if (mensajeRecibido.includes("ALLCLIENTS_LOG")) {
      
      // Limpiamos el mensaje eliminando la etiqueta
      const contenidoLimpio = mensajeRecibido.replace("ALLCLIENTS_LOG", "").trim();

      // 3. Reenviamos a todos los clientes conectados
      servidor.clients.forEach((client) => {
        if (client.readyState === 1) {
          // Enviamos un JSON bien formado
          client.send(JSON.stringify(["Usuario", contenidoLimpio]));
        }
      });

    } else {
      console.log("Mensaje simple:", mensajeRecibido);
    }
  });
});



});


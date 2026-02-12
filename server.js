import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const servidor = new WebSocketServer({ port: PORT });

servidor.on("connection", (ws) => {
  console.log("cliente conectado");
  ws.send("Bienvenido 👋");

  ws.on("message", (message) => {
    // 1. Convertimos lo que llega a texto
    let rawData = message.toString();

    try {
      // 2. Intentamos convertir el texto en un Array real
      // Esto asume que el cliente envía algo como: ["Nombre", "Mensaje ALLCLIENTS_LOG"]
      let datos_recibidos = JSON.parse(rawData);

      // 3. Verificamos si en la parte del mensaje (índice 1) está la clave
      if (datos_recibidos[1] && datos_recibidos[1].includes("ALLCLIENTS_LOG")) {
        
        servidor.clients.forEach((client) => {
          if (client.readyState === 1) {
            // ENVIAMOS EXACTAMENTE LO QUE PEDISTE
            client.send(
              JSON.stringify([
                datos_recibidos[0], 
                datos_recibidos[1].replace("ALLCLIENTS_LOG", "").trim()
              ])
            );
          }
        });

      } else {
        console.log("Mensaje recibido sin comando:", datos_recibidos);
      }
    } catch (e) {
      // Si el mensaje no era un JSON (un array), saldrá por aquí
      console.log("El mensaje recibido no es un array válido:", rawData);
    }
  });
});

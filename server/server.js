// IMPORTAR LIBRERIA
import { WebSocketServer } from "ws";

// Definimos el puerto: Render usa process.env.PORT
const PORT = process.env.PORT || 3000;

// Creamos el servidor usando el puerto dinámico
const servidor = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket corriendo en el puerto ${PORT}`);

servidor.on("connection", (ws) => {
  console.log("Cliente conectado");

  // El servidor manda mensaje de bienvenida
  ws.send("Bienvenido 👋");

  ws.on("message", (data) => {
    // Importante: En versiones modernas de 'ws', message suele ser un Buffer.
    // Lo convertimos a String para poder usar .includes()
    let datos_recibidos = data.toString();

    // Lógica para enviar a todos los clientes
    if (datos_recibidos.includes("ALLCLIENTS_LOG")) {
      
      servidor.clients.forEach((client) => {
        // client.readyState === 1 significa que la conexión está OPEN
        if (client.readyState === 1) {
          // Limpiamos el mensaje y lo enviamos
          const mensajeLimpio = datos_recibidos.replace("ALLCLIENTS_LOG", "").trim();
          client.send(JSON.stringify(["Server", mensajeLimpio]));
        }
      });

    } else {
      console.log("Mensaje recibido:", datos_recibidos);
    }
  });

  ws.on("error", (error) => console.error("Error en socket:", error));
});

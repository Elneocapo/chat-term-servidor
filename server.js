import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const servidor = new WebSocketServer({ port: PORT });

console.log(`Servidor escuchando en el puerto ${PORT}`);

servidor.on("connection", (ws) => {
  console.log("Cliente conectado");
  ws.send("Bienvenido 👋");

  ws.on("message", (data) => {
    // Convertimos el Buffer a String
    const mensajeRecibido = data.toString();

    if (mensajeRecibido.includes("ALLCLIENTS_LOG")) {
      // Limpiamos el mensaje
      const contenidoLimpio = mensajeRecibido.replace("ALLCLIENTS_LOG", "").trim();

      // Enviamos a todos los clientes conectados
      servidor.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(["Server", contenidoLimpio]));
        }
      });
    } else {
      console.log("Mensaje recibido:", mensajeRecibido);
    }
  });

  // Manejo de errores para que el server no se caiga
  ws.on("error", (err) => console.error("Error en el socket:", err));
});

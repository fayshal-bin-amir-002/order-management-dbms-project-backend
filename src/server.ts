import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "socket.io";
import { createServer } from "http";

let io: Server;

async function main() {
  await mongoose.connect(config.database_url as string);
  const server = createServer(app);
  server.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

export { io };

main();

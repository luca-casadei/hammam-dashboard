import dotenv from "dotenv"
import Server from "./server/interfaces/server";
import ExpressServer from "./server/express-server";
dotenv.config();

const server: Server = ExpressServer.getInstance();
server.listen(parseInt(process.env.HISTORY_REST_PORT!));
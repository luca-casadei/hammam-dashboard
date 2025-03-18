import Server from "./entry-point/server/interfaces/server";
import ExpressServer from "./entry-point/server/express-server";

import dotenv from "dotenv"
dotenv.config();

const server: Server = ExpressServer.getInstance();
server.listen(parseInt(process.env.DETECTOR_PORT!));
import {httpServerForReact,httpServer} from "./server.js"
import dotenv from "dotenv"
dotenv.config()

const api_port = process.env.API_PORT || 5050
const frontend_port = process.env.FRONTEND_PORT || 3003

//start react
httpServerForReact.listen(frontend_port, () => console.log(`Server listening for static react app on port ${frontend_port}`))

//Start backend api server

httpServer.listen(api_port, () => console.log(`Server listening for backend api requests on port ${api_port}`))

// httpsServer.listen(443, () => console.log(`Server listening for https on port ${443}`))
import http from "http"
import https from "https"
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
import express from "express"
import cors from "cors"
import material from "./api/routes/main.route.js"

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const build_path = (() => fs.existsSync(path.join(__dirname, "..", "frontend", "build")) 
        ?   path.join(__dirname, "..", "frontend") 
        :   __dirname)()

const react_app = express()

react_app.use(express.static(path.join(build_path, 'build')))

react_app.get('/', function (req, res) {
    res.sendFile(path.join(build_path, 'build', 'index.html'))
})

export const httpServerForReact = http.createServer(react_app)

export const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/material", material)
app.use("*", (req, res) => res.status(404).json({error: "Invalid Request"}))

export const httpServer = http.createServer(app)
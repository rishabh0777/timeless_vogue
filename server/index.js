import app from './app.js';
import http from 'http';


const server = http.createServer(app);
const port = process.env.PORT || 7000;

server.listen(port,()=>{
    console.log("Server is Running!: ",`http://localhost:${port}`)
})
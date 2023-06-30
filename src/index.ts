import { PORT, ENDPOINT } from './constants';
import * as http from "http";
import {UserController} from "./controllers/UserController";


const server = http.createServer(async (req: http.IncomingMessage, res:http.ServerResponse) => {
    await onListenRequest(req,res)
}).listen(PORT, () =>{
    console.log(`server started on port: ${PORT}`)
});

process.on('SIGINT',  () => {
    process.exit();
});


export const onRequestType = (req: http.IncomingMessage) => {
    const url = req.url;
    const method = req.method
    if(url === ENDPOINT && method === 'GET'){
        return 'getUsers';
    }
}

export const onListenRequest = async (req: http.IncomingMessage, res:http.ServerResponse) => {
  const request = onRequestType(req);
  const userController = new UserController();
    switch (request) {
        case "getUsers": await userController.getUsers(res)
            break
    }
}

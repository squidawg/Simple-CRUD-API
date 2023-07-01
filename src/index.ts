import {PORT} from './constants';
import * as http from "http";
import * as userController from "./controllers/controller";
import {onRequestType} from "./utils/utils";

const server = http.createServer(async (req: http.IncomingMessage, res:http.ServerResponse) => {
    await onListenRequest(req,res)
}).listen(PORT, () =>{
    console.log(`server started on port: ${PORT}`)
});

process.on('SIGINT',  () => {
    process.exit();
});


export const onListenRequest = async (req: http.IncomingMessage, res:http.ServerResponse) => {
  const request = onRequestType(req);
    switch (request) {
        case "getUsers": await userController.onGetUsers(res);
            break;
        case "getUser": await userController.onGetUser(req, res);
            break;
        case "postUser": await userController.onPostUser(req, res);
            break;
        case "putUser": await userController.onPutUser(req, res);
            break;
        case "deleteUser": await userController.onDeleteUser(req, res);
            break;
    }
}

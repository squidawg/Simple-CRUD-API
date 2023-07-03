import {PORT} from './constants.js';
import * as http from "http";
import {onListenRequest} from "./onListenRequest.js";
import 'dotenv/config';
import {updateUsersRecords} from "./data/users.js";
import {User} from "./models/user.model.js";

const workerPort = process.env.workerPort;
const env = process.env.NODE_ENV;
const port = env === 'multi' ? workerPort : PORT;

const server = http.createServer(async (req: http.IncomingMessage, res:http.ServerResponse) => {
    await onListenRequest(req,res)
}).listen(port, () =>{
    if(env !== 'multi'){
        console.log(`Server started on http://localhost:${port}`)
    }

});


if (env === 'multi') {
    process.on('message', (message: { users: User[] }) => {
        updateUsersRecords(message.users);
    });
}
process.on('SIGINT',  () => {
    process.exit();
});

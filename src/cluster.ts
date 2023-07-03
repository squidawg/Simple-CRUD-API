import cluster from "cluster";
import {cpus} from 'os'
import {fileURLToPath} from "url";
import {dirname} from "path";
import {HTTP_STATUS_CODE, PORT} from "./constants.js";
import http, {IncomingMessage} from "http";
import {RequestOptions} from "node:https";

import {responseHandler} from "./controllers/dataHandler.js";
import {updateUsersRecords} from "./data/users.js";
import {User} from "./models/user.model.js";

let counter = 0;

const numCPUs = cpus().length;
const urlToPath = fileURLToPath(import.meta.url);
const dirName = dirname(urlToPath);

cluster.setupPrimary({exec: `${dirName}/index.js`});

if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ workerPort: Number(PORT) + i + 1 });
    }
    const servers = Object.values(cluster.workers || {}).map(
        (worker, index) => `http://localhost:${Number(PORT) + index + 1}`
    );
    http.createServer(async (req: http.IncomingMessage, res:http.ServerResponse)=> {
        console.log(`Master ${process.pid} is running`);
        const urlPath = new URL(`${servers[counter]}${String(req.url)}`).href;
        const options: RequestOptions = {
            method: req.method,
            headers: req.headers,
        };

        const requestForWorker = http
            .request(urlPath, options, (response:IncomingMessage) => {
                const respStatusCose = response.statusCode as number;
                res.writeHead(respStatusCose, {
                    'Content-Type': 'application/json',
                });
                response.pipe(res);
            })
            .on('error', (error) => {
                responseHandler(res, HTTP_STATUS_CODE.ERR_SERVER_SIDE, error.message);
            });

        req.pipe(requestForWorker);
        counter = (counter + 1) % servers.length;
    })
        .listen(PORT, () => {
            console.log(`Primary ${process.pid} started on ${PORT}`);
        });

    cluster.on('listening', (worker, address) =>{
        console.log(`Worker ${worker.id} connected to http://localhost${address.port}`)
    })
    cluster.on('message', (worker, message: { users: User[] }) => {
        updateUsersRecords(message.users);
        const workers = Object.values(cluster.workers || {});
        Object.values(workers).forEach((worker) => {
            worker!.send(message);
        });
    });

    cluster.on('exit', (worker, code) => {
        console.log(`Worker pid: ${worker.process.pid} died`);
        if (code !== 0 && !worker.exitedAfterDisconnect ) {
            console.log('New worker starts...');
            cluster.fork({ PORT: Number(PORT) + worker.id });
        }
    });



}
else {
    import('./index.js')
}

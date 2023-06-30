import * as http from "http";
import {Controller} from "./controller";

export class UserController {
    async getUsers(res:http.ServerResponse) {
        const controller = new Controller();
        const users = await controller.getUsers();
        onSendResponse(res,200, users);
    }
}

export function onSendResponse(
    res: http.ServerResponse,
    statCode: number,
    message: unknown
) {
    res.writeHead(statCode, {
        'Content-Type': 'application/json',
    });
    if (typeof message === 'string') {
        res.end(JSON.stringify({ message: message }));
    } else {
        res.end(JSON.stringify(message));
    }
}

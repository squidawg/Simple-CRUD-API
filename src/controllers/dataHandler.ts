import http from "http";

export function onSendResponse(
    res: http.ServerResponse,
    statCode: number,
    message: unknown
) {
    res.writeHead(statCode, {
        'Content-Type': 'application/json',
    });
    if (typeof message !== 'string') {
        res.end(JSON.stringify(message));
    } else {
        res.end(JSON.stringify({message: message}));
    }
}

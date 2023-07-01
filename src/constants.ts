export const PORT = process.env.PORT || 3000;
export const ENDPOINT = '/api/users';

export enum HTTP_METHOD {
    GET ='GET',
    POST ='POST',
    PUT ='PUT',
    DELETE ='DELETE'
}

export enum HTTP_STATUS_CODE {
    OK = 200
}

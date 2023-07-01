export const PORT = process.env.PORT || 3000;
export const ENDPOINT = '/api/users';

export enum HTTP_METHOD {
    GET ='GET',
    POST ='POST',
    PUT ='PUT',
    DELETE ='DELETE'
}

export enum HTTP_STATUS_CODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    ERR_SERVER_SIDE = 500
}

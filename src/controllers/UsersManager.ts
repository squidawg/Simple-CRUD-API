import {getUserRecords, updateData, userRecords} from "../data/users.js";
import * as uuid from 'uuid'
import {User} from "../models/user.model.js";
import {deleteUserInRecords, updateUserInRecords} from "../utils/utils.js";
import {checkRequestBody} from "./controller.js";

export const getUsers = async () => {
    return new Promise((resolve, _) => {
        resolve(getUserRecords());
    })
}

export const getUser = async (uId:string) => {
    return new Promise((resolve, reject) => {
        const isValidId = uuid.validate(uId);
        if(isValidId){
            const user = userRecords.find(user => user.id === uId);
            if(!user){
                reject(`User with ID:${uId} not found`);
            }
            else {
                resolve(user);
            }
        }
        else {
            reject(`User with ID:${uId} not valid`);
        }
    });
}

export const createUser = async (data: User) => {
    return new Promise((resolve, reject) => {
        const isBodyState = checkRequestBody(data);
        if(isBodyState){
            reject(isBodyState);
        }
        let user = {
            id: uuid.v4(),
            ...data,
        };
        userRecords.push(user);
        updateData(userRecords.slice());
        resolve(user);
    });
}

export const updateUser = async (uId: string, userData: User) => {
    return new Promise((resolve, reject) => {
        const isValidId = uuid.validate(uId);
        if(isValidId){
            const user = userRecords.find(user => user.id === uId);
            if (user) {
                const modifiedUser = {...user, ...userData};
                updateUserInRecords(userRecords, modifiedUser);
                resolve(modifiedUser);
            }
            reject(`User with ID:${uId} not found`);
        }
        else {
            reject(`User with ID:${uId} not valid`);
        }
    });
}

export const deleteUser = async (uId: string) => {
    return new Promise((resolve, reject) => {
        const isValidId = uuid.validate(uId);
        if(isValidId){
            const user = userRecords.find(user => user.id === uId);
            if(user){
                deleteUserInRecords(userRecords, uId)
                resolve(`User with ID:${uId} deleted successfully`)
            }
            reject(`User with ID:${uId} not found`);
        }
        else {
            reject(`User with ID:${uId} not valid`);
        }
    });
}

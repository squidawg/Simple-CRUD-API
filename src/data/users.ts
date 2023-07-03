import {User} from "../models/user.model.js";

export let userRecords: User[] = [

]

export const updateData = (value: User[]) =>{
    userRecords = value
}

export const getUserRecords = () => {
    return userRecords.slice()
}

import {User} from "../models/user.model";

export let userRecords: User[] = [
    {
        id: 'e561cbef-687a-489c-8b3e-4a15e54ff2c1',
        username: 'Alex',
        age: 32,
        hobbies: ['drinking']
    },
    {
        id: '9650e277-1bc6-41cc-a6c2-b5d4292e9128',
        username: 'Rachel',
        age: 4,
        hobbies: ['sleeping']
    }
]

export const updateUsersRecords = (value: User[]) =>{
    userRecords = value
}

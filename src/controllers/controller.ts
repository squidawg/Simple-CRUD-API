import {userDara} from "../data/users";

export class Controller {
    async getUsers() {
        return new Promise((resolve, _) => {
            resolve(userDara)
        })
    }
}

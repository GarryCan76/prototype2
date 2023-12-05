const {User, Browser} = require('../models/user.js');

class Main{
    constructor(socket) {
        this.socket = socket;
        this.user_auth = undefined;
    }
    core(user_auth){
        this.user_auth = user_auth;
        User.findById(user_auth[this.socket.id])
            .then((result) => {
                console.log(result)
            })
            .catch((err)=>{})
        console.log('log')
    }
}

module.exports.Main = Main;
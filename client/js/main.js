const socket = io();
import Login from './login.js';
const login = new Login(socket);

import HomePage from './homePage.js';
const home = new HomePage();
socket.on('connect', ()=> {
    socket.on('homePage', name=>{
        console.log(name)
        home.homepage()
    })
    socket.on('userAuthFailed', auth=>{
        login.loginPage(auth)
    })
    if (!(localStorage.getItem('token'))){
        login.loginPage()
    }else {
        socket.emit('userAuth', localStorage.getItem('token'))
    }
})

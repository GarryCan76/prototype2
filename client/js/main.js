const socket = io();
import Login from './login.js';
const login = new Login(socket);
import Mainframe from './mainframe.js';
socket.on('connect', ()=> {
    socket.on('mainframe', name=>{
        const mainPage = new Mainframe(socket);
        mainPage.core(name)
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

import Jsml from './jsml.js';
const jsml = new Jsml();


export default class {
    constructor(socket) {
        this.socket = socket;
        jsml.deleteChildren(document.body)
        this.content = document.body;
        this.validChars = /^[A-Za-z0-9]+$/;
    }
    loginPage(message){
        //remove children
        if (document.getElementById('login-div')){
            document.getElementById('login-div').remove()
        }

        //create page layout
        let login = jsml.elementFromHtml(`
        <div id="login-div">
        <div class="form-group">
        <label for="inputUsername">User name</label>
        <input type="text" class="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username">
        </div>
        <div class="form-group">
        <label for="inputPassword1">Password</label>
        <input type="password" class="form-control" id="inputPassword1" placeholder="Password">
        </div>
        <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="showPassword">
        <label class="form-check-label" for="exampleCheck1">Show password</label>
        </div>
        <small id="errorHelp" class="form-text"></small>
        <small id="LoginStatus" class="form-text"></small>
        </div>
        `);
        this.content.appendChild(login)

        //tell user registration is successful
        if (message){
            let errorHelp = document.getElementById('LoginStatus');
            errorHelp.innerText = message;
        }

        //
        this.socket.on('userLoginError', errorData=>{
            let errorHelp = document.getElementById('errorHelp');
            errorHelp.innerText = errorData;
        })

        this.socket.on('userLoginSucces', loginToken=>{
            console.log(loginToken)
            let LoginStatus = document.getElementById('LoginStatus');
            LoginStatus.innerText = 'login succes';
            localStorage.setItem('token', loginToken)
            this.socket.emit('userAuth', loginToken)
        })

        this.showPassword(['inputPassword1'])

        let loginDiv = document.getElementById('login-div');
        let submit = jsml.createHTMLElement('button', document.getElementById('login-div'), '',{
            'type':'submit',
            'classList':'btn btn-primary',
            'innerText':'Login',
            'addEventListener':['click', ()=>{
                let errorHelp = document.getElementById('errorHelp');
                let errors = [];
                let inputUsername = document.getElementById('inputUsername');
                let inputPassword1 = document.getElementById('inputPassword1');
                let inputList = [inputUsername,inputPassword1];

                if (!(this.filledInputs(inputList))){
                    errors.push(' Username and password does not match ')
                }
                if (!(inputUsername.value.match(this.validChars))){
                    errors.push(' Username and password does not match ')
                }
                //if no errors send data
                if (errors.length === 0){
                    this.socket.emit('userLogin', {'inputUsername':inputUsername.value,'inputPassword1':inputPassword1.value})
                }else {
                    let errorHelp = document.getElementById('errorHelp');
                    errorHelp.innerText = errors;
                }


            }]
        });
        let register = jsml.createHTMLElement('button', document.getElementById('login-div'), '',{
            'type':'button',
            'classList':'btn',
            'innerText':'Or register',
            'addEventListener':['click', ()=>{
                this.registerPage()
            }]
        });
    }
    registerPage(){
        //remove children
        if (document.getElementById('login-div')){
            document.getElementById('login-div').remove()
        }

        //create page layout
        let register = jsml.elementFromHtml(`
        <div id="login-div">
        <div class="form-group">
        <label for="inputUsername">User name</label>
        <input type="text" class="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username" maxlength="15" minlength="3">
        </div>
        <div class="form-group">
        <label for="inputPassword1">Password</label>
        <input type="password" class="form-control" id="inputPassword1" placeholder="Password" maxlength="25" minlength="8">
        </div>
        <div class="form-group">
        <label for="inputPassword2">Repeat password</label>
        <input type="password" class="form-control" id="inputPassword2" placeholder="Repeat password" maxlength="25">
        </div>
        <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="showPassword">
        <label class="form-check-label" for="exampleCheck1">Show password</label>
        </div>
        <small id="errorHelp" class="form-text"></small>
        </div>
        `);
        this.content.appendChild(register)

        //get errors from server
        this.socket.on('userRegisterError', errorData=>{
            let errorHelp = document.getElementById('errorHelp');
            errorHelp.innerText = errorData;
        })
        this.socket.on('userRegisterSucces', message=>{
            this.loginPage(message)
        })


        //show password when checkbox clicked
        this.showPassword(['inputPassword1', 'inputPassword2'])

        //submit button for sending input to server
        let submit = jsml.createHTMLElement('button', document.getElementById('login-div'), '',{
            'type':'submit',
            'classList':'btn btn-primary',
            'innerText':'Register',
            'addEventListener':['click', ()=>{
                //get all the html inputs
                let errorHelp = document.getElementById('errorHelp');
                let errors = [];
                let inputUsername = document.getElementById('inputUsername');
                let inputPassword1 = document.getElementById('inputPassword1');
                let inputPassword2 = document.getElementById('inputPassword2');
                let inputList = [inputUsername,inputPassword1,inputPassword2];

                //check if all inputs are filled in
                if (!(this.filledInputs(inputList))){
                    errors.push(' Not everything is filled in ')
                }else {
                    // check if input has more characters than minimum length
                    inputList.forEach(input =>{
                        if (input.getAttribute('minlength')){
                            if (input.value.length <= input.getAttribute('minlength')){
                                errors.push(' ' + input.placeholder + ' too short ')
                            }
                        }
                    })
                }

                //check if there are special characters
                if (!(inputUsername.value.match(this.validChars))){
                    errors.push(' No special characters allowed ')
                }

                //check if passwords match
                if (inputPassword1.value !== inputPassword2.value){
                    errors.push(' Password does not match ');
                }
                errorHelp.innerText = errors;

                //if no errors send data
                if (errors.length === 0){
                    this.socket.emit('userRegister', {'inputUsername':inputUsername.value,'inputPassword1':inputPassword1.value,'inputPassword2':inputPassword2.value,})
                }
            }]
        });

        //button to go to login page
        let login = jsml.createHTMLElement('button', document.getElementById('login-div'), '',{
            'type':'button',
            'classList':'btn',
            'innerText':'Login',
            'addEventListener':['click', ()=>{
                this.loginPage()
            }]
        });
    }


    filledInputs(inputs){
        let filled = true;
        inputs.forEach(input =>{
            if (input.value === ''){
                filled = false;
            }
        })
        return filled;
    }
    showPassword(inputs){
        let showPassword = document.getElementById('showPassword')
        showPassword.addEventListener('click',()=>{
            inputs.forEach(input =>{
                let i = document.getElementById(input)
                if (showPassword.checked){
                    i.type = 'text';
                }else {
                    i.type = 'password';
                }
            })
        })
    }
}
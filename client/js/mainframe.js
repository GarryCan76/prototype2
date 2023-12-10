import Jsml from './jsml.js';
const jsml = new Jsml();
import SideWindows from './windows.js'

export default class Mainframe {
    constructor(socket) {
        document.getElementById('main-style').href = 'css/main.css';
        this.socket = socket;
        jsml.deleteChildren(document.body)
        this.content = document.body;
    }
    core(name){
        jsml.createHTMLElement('p', document.body, {'innerText':name})
        const windows =  new SideWindows(jsml);
    }
}
import Jsml from './jsml.js';
const jsml = new Jsml();

export default class Mainframe {
    constructor(socket) {
        this.socket = socket;
        jsml.deleteChildren(document.body)
        this.content = document.body;
    }
    core(name){
        jsml.createHTMLElement('p', document.body, {'innerText':name})
    }
}
import Jsml from './jsml.js';
const jsml = new Jsml();

export default class Home{
    constructor() {
        jsml.deleteChildren(document.body)

    }

    homepage(){
        let ok = jsml.elementFromHtml(`<div>



</div>`)
        document.body.appendChild(ok)
    }


}
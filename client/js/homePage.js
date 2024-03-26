import Jsml from './jsml.js';
const jsml = new Jsml();

export default class Home{
    constructor() {
        jsml.deleteChildren(document.body)

    }

    homepage(name){
        jsml.deleteChildren(document.body)
        let ok = jsml.elementFromHtml(`<div>
`+ name +`


</div>`)
        document.body.appendChild(ok)
    }


}
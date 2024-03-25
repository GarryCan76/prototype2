export default class Jsml {
    constructor() {
    }

    deleteChildren(victim) {
        let e = victim;
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

    createHTMLElement(elementType, parent, text, attributes, childrenArray) {
        let e = document.createElement(elementType);
        let tags = false;
        if (text){
            if (tags === 'inside'){
                e.classList.add('tags')
                let tagOpen = document.createElement('strong');
                tagOpen.innerText = '<'+ elementType +'>';
                let tagClose = document.createElement('strong');
                tagClose.innerText = '</'+ elementType +'>';
                e.appendChild(tagOpen)
                e.innerHTML += text;
                e.appendChild(tagClose)
            }else {
                e.innerHTML = text;
            }
        //     give it color
            let textValue = e.innerHTML;
            let coloredText = textValue.replace(/\b\d+\b/g, function(match) {
                return '<span class="number">' + match + '</span>';
            });
            e.innerHTML = coloredText;
        }

        // add attributes to element
        if (attributes) {
            const keys = Object.keys(attributes);
            keys.forEach(key => {
                if (key === 'classList') {
                    const classList = attributes[key].split(" ")
                    classList.forEach(classItem => {
                        e[key].add(classItem)
                    })
                } else if (key === 'addEventListener') {
                    e[key](attributes[key][0], attributes[key][1]);
                } else {
                    e[key] = attributes[key];
                }
            })
        }

        //append children
        if (childrenArray) {
            childrenArray.forEach(child => {
                if (Object.keys(child).length > 0) {
                    let at = child[Object.keys(child)]['attributes'];
                    console.log(at)
                    this.createHTMLElement(Object.keys(child), e, false, false, at, child[Object.keys(child)]['children'])
                } else {
                    e.appendChild(child)
                }
            })
        }
        if (parent) {
            if (tags === 'around'){
                let tagOpen = document.createElement('strong');
                tagOpen.innerText = '<'+ elementType +'>';
                let tagClose = document.createElement('strong');
                tagClose.innerText = '</'+ elementType +'>';
                let tagDiv = document.createElement('div');
                tagDiv.appendChild(tagOpen)
                tagDiv.appendChild(e)
                tagDiv.appendChild(tagClose)
                parent.appendChild(tagDiv)
                tagDiv.classList.add('tags-around')
                return tagDiv
            }else {
                parent.appendChild(e)
                return e
            }
        }else {
            if (tags === 'around'){
                let tagOpen = document.createElement('strong');
                tagOpen.innerText = '<'+ elementType +'>';
                let tagClose = document.createElement('strong');
                tagClose.innerText = '</'+ elementType +'>';
                let tagDiv = document.createElement('div');
                tagDiv.appendChild(tagOpen)
                tagDiv.appendChild(e)
                tagDiv.appendChild(tagClose)
                tagDiv.classList.add('tags-around')
                return tagDiv
            }else {
                return e
            }
        }
    }
    elementFromHtml(html) {
        const template = document.createElement("template");

        template.innerHTML = html.trim();

        return template.content.firstElementChild;
    }
}
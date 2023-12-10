export default class SideWindows{
    constructor(jsml) {
        this.top_z = 1;
        this.jsml = jsml;

        let style = jsml.elementFromHtml(`<link rel="stylesheet" href="css/sideBar.css">`);
        let sideBar = jsml.elementFromHtml(`<div class="side-bar"></div>`);
        document.body.appendChild(style);
        let sideBarArray = [];
        for (let i = 0; i < 3;i++){
            let window = this.createSideWindow(i);
            sideBarArray.push(window)
        }
        console.log(sideBarArray)
        sideBarArray.forEach(sideWindow=>{
            let sideBarWindow = jsml.elementFromHtml(`<div class="side-bar-window">`+ sideWindow.id +`</div>`);
            sideBarWindow.addEventListener('click', ()=>{
                let windowPin = document.getElementsByClassName('pin')
                for (let i = 0; i < windowPin.length;i++){
                    if (windowPin[i] !== sideWindow){
                        windowPin[i].style.display = 'none';
                    }
                }
                if (sideWindow.style.display === 'none'){
                    sideWindow.style.display = 'inline';
                }else {
                    sideWindow.style.display = 'none';
                }
            })
            document.body.appendChild(sideBarWindow)
        })
    }
    moveWindow(element, window){
        let offsetX, offsetY;
        window.addEventListener('mousedown', (e)=>{
            if (parseInt(window.style.zIndex) !== this.top_z){
                window.style.zIndex = ++this.top_z;
            }
        })
        const move = (e) =>{
            window.style.left = `${e.clientX - offsetX}px`;
            window.style.top = `${e.clientY - offsetY}px`;
        }
        element.addEventListener('mousedown', (e)=>{
            offsetX = e.clientX - window.offsetLeft;
            offsetY = e.clientY - window.offsetTop;
            document.addEventListener('mousemove', move);
        })
        document.addEventListener('mouseup', ()=>{
            document.removeEventListener('mousemove', move)
        })
    }
    createSideWindow(title){
        let window = this.jsml.elementFromHtml(`<div id="`+ title +`" class="window pin"></div>`);
        let windowTop = this.jsml.elementFromHtml(`<div class="window-top"></div>`);
        let dragBar = this.jsml.elementFromHtml(`<div class="drag-bar"></div>`);
        dragBar.innerHTML = title;
        let closeWindow = this.jsml.elementFromHtml(`<div class="close-window"></div>`);
        let pinWindow = this.jsml.elementFromHtml(`<div class="pin-window"></div>`);
        windowTop.appendChild(dragBar)
        windowTop.appendChild(pinWindow)
        pinWindow.addEventListener('click', ()=>{
            if(window.classList.contains('pin')){
                window.classList.remove('pin')
                pinWindow.style.backgroundColor = '#51c051';
            }else {
                window.classList.add('pin')
                pinWindow.style.backgroundColor = '#ff244d';
            }
        })

        windowTop.appendChild(closeWindow)
        closeWindow.addEventListener('click', ()=>{
            window.style.display = 'none';
        })

        this.moveWindow(dragBar, window)


        window.appendChild(windowTop)
        document.body.appendChild(window)
        return window;
    }
}
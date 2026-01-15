class Message {
    static flag = false;

    constructor({ 
        text = "", 
        time = 3000, 
        success = null, 
        closable = true,
        autoInit = true
    } = {}) {
        this.text = text;
        this.time = time;
        this.success = success;
        this.closable = closable;

        this.substrate = document.createElement("div");
        this.substrate.classList.add("substrate");

        if (autoInit) {
            this.init();
        }
    }

    destroy() {
        if (this.substrate.parentNode) {
            this.substrate.remove();
        }
    }

    init() {
        if(Message.flag){
            console.error("error \ncode 2");
            return;
        }
        this.render();
        this.show(); 

        if (this.time > 0) {
            setTimeout(() => this.close(), this.time);
        }
        Message.flag = true;
    }

    render() {
        this.mess = document.createElement("div");
        this.mess.classList.add("message-box");

        this.mess.addEventListener("click", (e) => {
            e.stopPropagation(); 
        });

        if (this.success === true) {
            this.mess.classList.add("success");
            this.mess.innerHTML = `
                <h1>Успешно</h1> 
                <img class='check-mark' src="/Pic/check.png">
                <div id='textMessage'>${this.text}</div>
            `;
        } else if (this.success === false) {
            this.mess.classList.add("error");
            this.mess.innerHTML = `
                <h1>Ошибка</h1> 
                <img class='cross-mark' src="/Pic/cross.jpg">
                <div id='textMessage'>${this.text}</div>
            `;
        } else {
            this.mess.classList.add("standard");
            this.mess.innerHTML = `<div id='textMessage'>${this.text}</div>`;
        }

        if (this.closable) {
            this.substrate.addEventListener("click", () => this.close());
        }

        this.substrate.appendChild(this.mess);
    }

    close() {
        this.mess.classList.add('fade-out');
        this.mess.addEventListener('animationend', () => {
            this.destroy();
            Message.flag = false;
        }, { once: true }); 
    }

    show() {
        document.body.appendChild(this.substrate);
    }
}

function isRootDirectory() {

    const path = window.location.pathname;

    const pathParts = path.split('/').filter(part => part.length > 0);
    
    return pathParts.length <= 1;
}
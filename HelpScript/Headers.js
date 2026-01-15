document.addEventListener('DOMContentLoaded', () => {
    var helpBTN = document.getElementById("btnHelp");
    var contactBTN = document.getElementById("btnContact");
    var offerBTN = document.getElementById("btnOffer");
    var backBTN = document.getElementById("BackMain");

    if(!helpBTN || !contactBTN || !offerBTN || !backBTN){
        new Message({
            text : `Не все элементы интерфейса найденны \n код : 3 <br>${i}`, 
            cross : false, 
            time : 0, 
            success : false, 
            closable : true,
            autoInit : true
        }).show();
    }else{
        offerBTN.addEventListener("click",async function(){commingSoonOffer();});
        helpBTN.addEventListener("click",async function(){getHelp();});
        contactBTN.addEventListener("click",async function(){getContacts();});
        backBTN.addEventListener("click",function(){window.history.back();});
    }

    async function commingSoonOffer() {
        new Message({
            text: `Можете предложить функции здесь:<br>
                <h1>Здесь пока ничего нет:(<h1>`, 
            time: 0,
            success: null, 
            closable: true
        });
    }

    async function getHelp() {
        new Message({
            text: `Вам помогут здесь<br>
                <h1>Здесь пока ничего нет:(<h1>`, 
            time: 0,
            success: null, 
            closable: true
        });
    }

    async function getContacts() {
        new Message({
            text: `Контакты<br>
                <h1>Здесь пока ничего нет:(<h1>`, 
            time: 0,
            success: null, 
            closable: true
        });
    }
});

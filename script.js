document.addEventListener('DOMContentLoaded', () => {
    var helpBTN = document.getElementById("btnHelp");
    var contactBTN = document.getElementById("btnContact");
    var offerBTN = document.getElementById("btnOffer");
    var commingSoon = document.getElementById("commingSoon");


    // var for matrix
    var listForCheck = [];

    var pdf_jpg = document.getElementById("PDF-JPG");
    var picture = document.getElementById("Picture");
    var pdf_unite = document.getElementById("PDF-unite");
    var pdf_split = document.getElementById("PDF-split");
    var pdf_word = document.getElementById("PDF-WORD");
    var word_pdf = document.getElementById("WORD-PDF");
    var pdf_powerPoint = document.getElementById("PDF-PP");

    listForCheck.push(pdf_jpg,picture, pdf_unite, pdf_split, pdf_word, word_pdf, pdf_powerPoint);

    for(var i = 0; i < listForCheck.length; i++){
        if(!listForCheck[i]){
            new Message({
                text : `Не все элементы интерфейса найденны \n код : 3 <br>${i}`, 
                cross : false, 
                time : 0, 
                success : false, 
                closable : true,
                autoInit : true
            }).show();
            break;
        }
    }

    if(!helpBTN || !contactBTN || !offerBTN || !commingSoon){
        new Message({
            text : "Не все элементы интерфейса найденны \n код : 1", 
            cross : false, 
            time : 0, 
            success : false, 
            closable : true,
            autoInit : true
        }).show();
    }else
    {

        commingSoon.addEventListener("click",async function(){commingSoonOffer();});
        offerBTN.addEventListener("click",async function(){commingSoonOffer();});
        helpBTN.addEventListener("click",async function(){getHelp();});
        contactBTN.addEventListener("click",async function(){getContacts();});

        //Event for matrix
        pdf_jpg.addEventListener("click",function(){
            directOnPage("pdf_jpg");
        });
        picture.addEventListener("click",function(){
            directOnPage("picture");
        });
        pdf_unite.addEventListener("click",function(){
            directOnComingSoon();
        });
        pdf_split.addEventListener("click",function(){
            directOnComingSoon();
        });
        pdf_word.addEventListener("click",function(){
            directOnComingSoon();
        });
        word_pdf.addEventListener("click",function(){
            directOnComingSoon();
        });
        pdf_powerPoint.addEventListener("click",function(){
            directOnComingSoon();
        });
        

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

    function directOnComingSoon(){
        window.location.href = "ComingSoon.html";
    }
    
    function directOnPage(dir){
        window.location.href = `${dir}/index.html`;
    }
});


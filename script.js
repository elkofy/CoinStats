$(document).ready(function () {

    //VARIABLES
    let skip = 0;
    let limit = 10;
    let page = 1;
    let nbDecimals = 4;
    let monney = "EUR";

//
   //Attribution des actions sur les boutons
    $("#page-next").on("click", function () {
        if (skip >= 0) {
            changePage("+");
            buttonswitcher("page-next");
        }
    });

    $("#page-before").on("click", function () {
        if (skip - limit >= 0) {
            changePage("-");
            buttonswitcher("page-before");
        }
    });

    $("#page-reset").on("click", function () {
        resetPage();
    });


    //Déclaration des fonctions
    function changePage(operation) {
        if (operation == "+") {
            skip += limit;
            page++;
        } else if (operation == "-") {
            skip -= limit;
            page--;
        }

        animationAjax();
    }

    function resetPage() {
        skip = 0;
        page = 1;

        animationAjax();
    }

    function buttonswitcher(id) {
        console.log(id);
        $("#" + id).toggleClass("pager-elements-active");
        setTimeout(() => {
            $("#" + id).toggleClass("pager-elements-active");
        }, 100);
    }

    function animationAjax(){
        $("#liste-crypto").fadeOut();

        setTimeout(() => {
            $("#liste-crypto").empty();
            ajax();

            $("#liste-crypto").fadeIn();
        }, 800);
    }

    function classVariation(variation) {
        let classColor;

        if(variation > 0){
            classColor = "variationPlus";
        }else if(variation < 0){
            classColor = "variationMoins";
        }else{
            classColor = "variationZero";
        }

        return classColor;
    }

    // Appel Ajax
    function ajax() {
        $.ajax({
            url: "https://api.coinstats.app/public/v1/coins?skip=" + skip + "&limit=" + limit + "&currency="+monney,
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            let data = response.coins;
            let size = 50;
            let miniSize = 15;

            for (let crypto of data) {
                let price = (crypto.price).toFixed(nbDecimals);
                let variation = crypto.priceChange1h; //variation dans l'heure

                let tdTwitter = '<a href=' + crypto.twitterUrl + ' target="_blank" title="Lien du twitter de la Crypto"><img src="Twitter_Bird.png" width =' + miniSize + ' height =' +
                miniSize + '></a>';

                let tdSigle = '<a href=' + crypto.websiteUrl + ' target="_blank" title="Lien du site de la Crypto"><img src=' + crypto.icon + ' width =' + size + ' height =' +
                size + '></a> <span>'+tdTwitter+'</span>';


                $("#liste-crypto").append('<tr> <td>' + crypto.rank + '.</td> <td>'+tdSigle+'</td> <td>' + crypto.name + 
                '</td> <td>' + price + ' €</td> <td class=' + classVariation(variation) + '>' + variation + '%</td> <td>' + crypto.symbol +
                '</td> </tr>');
            }
        }).catch(function error() {
            let errordiv = document.createElement('div');
            $(errordiv).css('text-align', 'center');
            $(errordiv).text('La connexion n\'as pas pu etre etabli essayer de rafraichir votre navigateur 😥');
            $("#coins-table").append(errordiv);
        });
        
        $("#page-viewer p").html("PAGE " + page);
        console.log(page);
    }


    function getAjax() {
        $.ajax({
            url: "https://api.coinstats.app/public/v1/fiats",
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            let data = response.slice(0,11);
             for (let fiat of data) {
                 let name = fiat.name;
                 let rate = fiat.rate.toFixed(2);
                 let symbol = fiat.symbol;
                 let imageUrl = fiat.imageUrl;
                 let image = document.createElement('img');
                 image.src = imageUrl;
                 image.style.width = "25px"
                 image.style.height = "25px"

                 $("#liste-fiats").append('<tr> <td>' + name + '.</td> <td>'+rate+'</td> <td>' + symbol + 
                 '</td> <td>' + image.outerHTML + '</td>');


                 console.log(name,rate,symbol,imageUrl)
             }
        }).catch(function error() {
            let errordiv = document.createElement('div')
            $(errordiv).css('text-align', 'center');
            $(errordiv).text('La connexion n\'as pas pu etre etabli essayer de rafraichir votre navigateur 😥');
            $("#fiats-table").append(errordiv)
                });
        
    
    }

    //Premier appel Ajax
    ajax();
    getAjax();



});

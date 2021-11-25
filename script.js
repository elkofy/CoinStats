$(document).ready(function () {

    //VARIABLES
    let skip = 0;
    let limit = 5;
    let page = 1;

    
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
        $("#listeCrypto").fadeOut();

        setTimeout(() => {
            $("#listeCrypto").empty();
            ajax();

            $("#listeCrypto").fadeIn();
        }, 800);
    }

    function classVariation(variation) {
        return (variation > 0) ? "variationPlus" : "variationMoins";
    }

    // Appel Ajax
    function ajax() {
        $.ajax({
            url: "https://api.coinstats.app/public/v1/coins?skip=" + skip + "&limit=" + limit + "&currency=EUR",
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            let data = response.coins;
            let size = 50;

            for (let crypto of data) {
                let price = (crypto.price).toFixed(3);
                let variation = crypto.priceChange1h; //variation dans l'heure

                $("#listeCrypto").append('<tr> <td>' + crypto.rank + '</td>  <td> <img src=' + crypto.icon + ' width =' + size + ' height =' +
                    size + '> </td> <td>' + crypto.name + '</td> <td>' + price + ' €</td> <td class=' + classVariation(variation) + '>' + variation + '%</td> <td>' + crypto.symbol + '</td> </tr>');
            }
        });

        $("#page-viewer p").html("PAGE " + page);
        console.log(page);
    }


    //Premier appel Ajax
    ajax();


});

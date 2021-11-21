$(document).ready(function () {
    let limit = 5;

    // Appel Ajax
    function ajax() {
        $.ajax({
            url: "https://api.coinstats.app/public/v1/coins?skip=0&limit="+limit+"&currency=EUR",
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            let data = response.coins;
            let size = 50;

            for (let crypto of data) {
                let price = (crypto.price).toFixed(3);

                $("#listeCrypto").append('<tr> <td>' + crypto.rank + '</td>  <td> <img src='+ crypto.icon +' width ='+size+' height ='+
                size+'> </td> <td>' + crypto.name + '</td> <td>' + price + ' €</td> <td>' + crypto.priceChange1d + '</td> <td>' + crypto.symbol + '</td> </tr>');
            }
        });
    }

    ajax();


});
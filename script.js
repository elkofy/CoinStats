$(document).ready(function () {

    // Appel Ajax
    function ajax() {
        $.ajax({
            url: "https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=EUR",
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            let data = response.coins;

            for (let crypto of data) {
                $("#listeCrypto").append('<tr> <td>' + crypto.rank + '</td>  <td> <img src='+ crypto.icon +'> </td> <td>' + crypto.name + '</td> <td>' + crypto.price + ' €</td></tr>');
                console.log(crypto.name);
            }
        });
    }

    ajax();


});
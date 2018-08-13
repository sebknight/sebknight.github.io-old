$(document).ready(function(){
    function getDog() {
        $("#loader").show();
        $.getJSON("https://dog.ceo/api/breeds/image/random", function (data) {
            $("#picture").html(JSON.stringify(data, null, 4));
            $("#picture").html("<img src='" + data.message + "'>");
            $("#loader").hide();
        });
    }

    $('#fetch').click(function () {
        getDog();
    });

    $('#about').click(function(){
        $('.dropdown').not(this).hide();
        $('.dropdown__about').toggle();
    })

    $('#contact').click(function () {
        $('.dropdown').not(this).hide();
        $('.dropdown__contact').toggle();



    })
})

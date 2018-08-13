$(document).ready(function(){
    var contactDropdown = $('.dropdown__contact');
    var aboutDropdown = $('.dropdown__about');

    function showHide(buttonDropdown, opposingDropdown) {
        $(buttonDropdown).toggle();
        $(opposingDropdown).hide();
    }

    $('#about').click(function () {
        showHide(aboutDropdown, contactDropdown);
    })

    $('#contact').click(function () {
        showHide(contactDropdown, aboutDropdown);
    })

    function getDog() {
        $.getJSON("https://dog.ceo/api/breeds/image/random", function (data) {
            $("#picture").html(JSON.stringify(data, null, 4));
            $("#picture").html("<img src='" + data.message + "'>");
        });
    }

    $('#fetch').click(function () {
        getDog();
    })

})

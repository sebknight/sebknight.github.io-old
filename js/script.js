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

    $('.gallery').slick({
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        centerMode: true,
        adaptiveHeight: true
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    });


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

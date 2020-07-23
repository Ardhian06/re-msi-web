// Header Image Carousel
// $(".carousel").on("touchstart", function (event) {
//     var xClick = event.originalEvent.touches[0].pageX;
//     $(this).one("touchmove", function (event) {
//         var xMove = event.originalEvent.touches[0].pageX;
//         if (Math.floor(xClick - xMove) > 5) {
//             $(this).carousel('next');
//         } else if (Math.floor(xClick - xMove) < -5) {
//             $(this).carousel('prev');
//         }
//     });
//     $(".carousel").on("touchend", function () {
//         $(this).off("touchmove");
//     });
// });

//Carousel Swap
// $(document).ready(function () {
//     $("#carousel-header-indicators").swiperight(function () {
//         $(this).carousel('prev');
//     });
//     $("#carousel-header-indicators").swipeleft(function () {
//         $(this).carousel('next');
//     });
// });

// Latest Product
$(document).ready(function () {

    $(".filter-button").click(function () {
        var value = $(this).attr('data-filter');

        if (value == "all") {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        } else {
            //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
            //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');

        }
    });

    if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

});
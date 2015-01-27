// ---- Sample slidy ------
// ---- Author: Prashant Hedaoo
// ---- client code
var port = 3700;

// main code
window.onload = function() {

    // connect to server
    socket = io.connect(':' + port);

    // Set 'deals_list' message handler
    socket.on('deals_list', function (jData) {

        if (jData) {
            var data = JSON.parse(jData);
            // console.log("data= " + data[0].ImgURL);
            if(data)
                handleResponse(data);
        }
        else
            console.log("No data");
    });

function handleResponse(response) {
        console.log("inside handleResponse");

        var arrayOfImageUrls = response.map(function(item) {
            return item.ImgURL;
        }),
            $buddiesContainer = $('.buddies-container');

        arrayOfImageUrls.forEach(function(url) {
            var newBuddy = $('<div>', {
                class: 'buddy'
            });

            $('<div>', {
                class: 'avatar',
                css: {
                    'background-image': 'url(' + url + ')'
                }
            }).appendTo(newBuddy);

            $buddiesContainer.append(newBuddy);
        });

        $buddiesContainer.find('.buddy:first').show();

        $buddiesContainer.on("swiperight", '.buddy', function () {
            $(this).addClass('rotate-left').delay(700).fadeOut(1);
           
            $('.buddy').find('.status').remove();
           
            $(this).append('<div class="status like">Like!</div>');
           
            if ($(this).is(':last-child')) {
                $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
            } else {
                $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            }
        });

        $buddiesContainer.on("swipeleft", '.buddy', function () {
            $(this).addClass('rotate-right').delay(700).fadeOut(1);
           
            $('.buddy').find('.status').remove();
           
            $(this).append('<div class="status dislike">Dislike!</div>');

            if ($(this).is(':last-child')) {
                $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
                // alert('Na-na!');
            } else {
                $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            }
        });
    }
}

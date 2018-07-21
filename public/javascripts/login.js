// DOM Ready

$(document).ready(function() {

    err_message = $('#err').text();
    console.log(err_message);
    if(err_message == ''){
        $('#err_box').hide();
    }

    $('#register').click(function(e){
        window.location.replace('/register');
    });
});


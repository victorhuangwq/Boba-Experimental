// DOM Ready
$(document).ready(function() {

    $('#logout').click(function(e){
        window.location.replace('/logout');
    });

    $('#editSection').trumbowyg();
    console.log('abc');
});


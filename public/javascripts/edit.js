// DOM Ready


$(document).ready(function() {

    $('#logout').click(function(e){
        window.location.replace('/logout');
    });

    //new EasyEditor('#editSection');

    $('#description').easyEditor({
        css:({minHeight:'200px',maxHeight:'300px'
        }),
        buttons: ['bold', 'italic', 'link', 'h2', 'h3', 'h4', 'quote', 'code', 'list', 'x']
      });
      
    $('.menu').append('<a href="/logout" class="warning"> Logout </a>');
});


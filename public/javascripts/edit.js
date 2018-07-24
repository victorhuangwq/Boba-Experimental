// DOM Ready


$(document).ready(function() {

    $('#logout').click(function(e){
        window.location.replace('/logout');
    });


    $('#description').easyEditor({
        css:({minHeight:'200px',maxHeight:'300px'
        }),
        buttons: ['bold', 'italic', 'link', 'h2', 'h3', 'h4', 'quote', 'code', 'list', 'x']
      });
      
    $('.menu').append('<a href="/logout" class="warning"> Logout </a>');

    $('#add_form').focusout(function(e){
        checkComplete();
    });
});


function checkComplete(){
    console.log($('#description').text());
    if($('#i').val()!='' && $('#t').val()!='' && $('#description').val()!=''){
        $('#post_submit').prop('disabled',false);
    }
}

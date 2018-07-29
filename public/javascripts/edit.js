// DOM Ready

var localreviews = {};

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

    $('input[type="radio"]').click(function(e){
        if(!$('#tab-3').prop('checked')){
            $("label[for='tab-3']").css('visibility','hidden');
        }
    });

    $(document).ajaxStart(function(){
        $(".wait").css("background-image", 'url("https://upload.wikimedia.org/wikipedia/en/1/13/Parabolic_dish_motion_circle.gif")');
    });
    
    $(document).ajaxComplete(function(){
        $(".wait").css("background-image", "none");
    });

    populatePosts();
});


function upload(){
    
    if($('input[type="radio"]:checked').val() == '1')
        var filesSelected = $('#add_form input[name="image"]')[0].files;
    else if($('input[type="radio"]:checked').val() =='3')
        var filesSelected = $('#edit_form input[name="image"]')[0].files;

    if (filesSelected.length > 0){    
            
        var r = confirm('File will be uploaded onto Imgur');

        if(r == true){
            
            var formData = new FormData();
            formData.append('image',filesSelected[0]);

            var settings = {
                url: 'https://api.imgur.com/3/image',
                type: 'POST',
                headers: { "Authorization": "Client-ID 0a4bc22df468258" },
                processData: false,
                contentType: false
            };

            settings.data = formData;

            $.ajax(settings).done(function(response) {
                console.log(response);
                $('input[name="imagelink"]').val(response.data.link);
                $('input[name="imgur"]').val(JSON.stringify(response));
                console.log(JSON.parse($('input[name="imgur"]').val()));
            });
            
        }
    }
}
    

function checkComplete(){

    if($('#add_form input[name="title"]').val()!='' && $('#add_form input[name="imagelink"]').val()!='' && $('#description').val()!=''){
        $('#post_submit').prop('disabled',false);
    }
    else{
        $('#post_submit').prop('disabled',true);
    }

    if($('#edit_form input[name="title"]').val()!='' && $('#edit_form input[name="imagelink"]').val()!='' && $('#d').val()!=''){
        $('#edit_submit').prop('disabled',false);
    }
    else{
        $('#edit_submit').prop('disabled',true);
    }
}

function populatePosts(){

    var reviewCards = '';

    $.getJSON('reviews/userreviews',function(data){


        $.each(data,function(){

            reviewCards += '<div class="flex five">';
            reviewCards += "<div>"
            reviewCards += "<img src='" + this.image + "'>";
            reviewCards += "</div>";
            reviewCards += "<div class='four-fifth'>"          
            reviewCards += '<h3>' + this.title + "<hr></h3>";
            reviewCards += '<p><div class="dots">' + this.review + "</div></p>";
            reviewCards += '<p>'+this.date+''
            reviewCards += '<button onclick="editPost(this.value)" value="' + this.num + '" style="float:right"> Edit </button></p>'
            reviewCards += '</div></div>';
        
            localreviews[this.num]=this;
        });

        $('#userposts').html(reviewCards);
    });
}

function editPost(value){
    $('#tab-3').prop('checked',true);
    $("label[for='tab-3']").css('visibility','visible');
    
    var form = $('#postcard').clone();

    form.prop('id','#editcard');

    var review = localreviews[value];

    console.log(review);

    $('h2',form).text('Edit Post');
    $('form',form).prop('action','reviews/editpost');
    $('form',form).prop('id','edit_form');
    $('#t',form).val(review.title);
    $('#i',form).val(review.image);

    $('#description',form).prop("id","d");
    $('.easyeditor-wrapper',form).remove();
    $('#d',form).text(review.review);

    $('select[name="ms"]',form).val(review.milk_stars);
    $('select[name="ts"]',form).val(review.tea_stars);
    $('select[name="as"]',form).val(review.aftertaste_stars);
    $('select[name="os"]',form).val(review.overall_stars);

    $('#post_submit',form).prop('id','edit_submit');


    var input_num = $("<input>")
                .attr("type", "hidden")
                .attr('name',"num")
                .val(value);

    $('#edit_form',form).append($(input_num));

    $('#editpost').html(form); 

    $('#d').easyEditor({
        css:({minHeight:'200px',maxHeight:'300px'
        }),
        buttons: ['bold', 'italic', 'link', 'h2', 'h3', 'h4', 'quote', 'code', 'list', 'x'],
      });


    checkComplete();

    $('#edit_form').focusout(function(e){
        checkComplete();
    });

}


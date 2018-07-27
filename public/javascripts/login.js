// DOM Ready

$(document).ready(function() {

    hideErrBox();

    $('#register').click(function(e){
        window.location.replace('/register');
    });

    $('#reg_user').keyup(function(e){
        checkUser();
    });

    $('#reg_email').focusout(function(e){
        checkEmail();
    });

    $('#reg_retry').focusout(function(e){
        checkPass();
    });

});

function hideErrBox(){

    err_message = $('#err').text();
    console.log(err_message);
    if(err_message == ''){
        $('#err_box').hide();
    }
    else{
        $('#err_box').show();
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

var unique_user = false;
var valid_email = false;
var valid_pass = false;
var e_messages = ['','',''];

//check if user exists
function checkUser(){

    var user = $('#reg_user').val();
    if(user != ''){
        console.log('here');

        $.getJSON('users/userlist',function(data){
            var exist = false;
            console.log('here2');

            $.each(data,function(){
                if(this.username == user ){
                    exist = true;
                }
                console.log('here3');
            });
            
            if(exist){
                unique_user = false;
                e_messages[0] = 'Username Already Exist';
            }
            else{
                unique_user = true;
                e_messages[0] = '';
            }
            updateForm();
        });
    }
    else {
        console.log('b');
        unique_user = false;
        e_messages[0] = '';
        updateForm();
    }
}

function checkEmail(){
        //check if email is valid
    if($('#reg_email').val()!=''){
        if(isEmail($('#reg_email').val())){
            valid_email = true;
            e_messages[1] = '';
        }
        else{
            valid_email = false;
            e_messages[1] = 'Email is invalid';
        }
    }
    else{
        valid_email = false;
        e_messages[1] = '';
    }

    updateForm();
}

function checkPass(){
    pass = $('#reg_pass').val();
    retry = $('#reg_retry').val();

    if(pass == "" || retry == ""){
        valid_pass = false;
        e_messages[2] = '';
    }
    else if(pass == retry){
        valid_pass = true;
        e_messages[2] = '';
    }
    else{
        valid_pass = false;
        e_messages[2] = 'Retry is not the same';
    }

    updateForm();
}

function updateForm(){
    var str = '';

    if(!unique_user){
        console.log('a');
        if(e_messages[0]!=''){
            str += "<p><h4>" + e_messages[0] + "</h4></p>";
        }
    }
    if(!valid_email){
        console.log(valid_email);
        if(e_messages[1]!=''){
            str += "<p><h4>" + e_messages[1] + "</h4></p>";
        }
    }
    if(!valid_pass){
        console.log(valid_pass);
        if(e_messages[2]!=''){
            str += '<p><h4>' + e_messages[2] + '</h4></p>';
        }
    }
    
    $('#err').html(str);
    hideErrBox();
    console.log(unique_user);
    console.log(valid_email);
    console.log(valid_pass);
    

    if(unique_user&&valid_email&&valid_pass){
        $('#reg_submit').prop('disabled',false);
    }
}
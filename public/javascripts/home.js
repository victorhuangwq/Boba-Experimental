
// DOM Ready

$(document).ready(function() {

    populateReviewCards();

});


// Functions

// Populate Review Cards
function populateReviewCards(){
    
    var reviewCards = '';

    $.getJSON('reviews/reviewlist',function(data){

        $.each(data,function(){
        
            reviewCards += '<article class="card">';
            reviewCards += '<header><h3>' + this.title + "</h3></header>";
            reviewCards += '<body><p>' + this.review + "</p></body>";
            reviewCards += '<footer><h4>' + this.stars + '/5</h4></footer>';
            reviewCards += '</article>';
        
        });

        $('#cards').html(reviewCards);
    });
};
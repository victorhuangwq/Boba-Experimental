
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
            reviewCards += '<img src='+ this.image + "><hr>";
            reviewCards += '<body><p>' + this.review + "</p></body><footer>";
            reviewCards += '<div class="flex full four-500">';
            reviewCards += '<div><h4>Milk: '+ this.milk_stars +'/5</h4></div>';
            reviewCards += '<div><h4>Tea: '+ this.tea_stars +'/5</h4></div>';
            reviewCards += '<div><h4>Aftertaste: '+ this.aftertaste_stars +'/5</h4></div>';
            reviewCards += '<div><h4>Overall: '+ this.overall_stars +'/5</h4></div>';
            reviewCards += '<p>'+this.date+'</p></footer>';
            reviewCards += '</article>';
        
        });

        $('#cards').html(reviewCards);
    });
};
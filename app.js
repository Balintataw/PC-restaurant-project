$(document).ready(function() {

    
    var slideIndex = 0;
    showSlides();
    
    function showSlides() {
        
        var slides = $(".mySlides");
        
        $.each(slides, function(i, item) {
            item.style.display = "none";
        })
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 3000); 
    }
})
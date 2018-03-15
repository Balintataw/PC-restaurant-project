$(document).ready(function() {

    // carousel stuff
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
        // setTimeout(showSlides, 3000); 
    }

    $.get("https://json-data.herokuapp.com/restaurant/news/1", function(data){
        var news = `
        <div id="news">
                <h3 class="title">${data.title}</h3>
                <span class="date">${data.date_published}</span>
                <p class="post">${data.post}</p>
            </div>
            `
            $(".news").append(news)
    })
})
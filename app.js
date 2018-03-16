$(document).ready(function() {

    // carousel 

    $(function(){   
    $('.fadein img:gt(0)').hide();
    setInterval(function(){
      $('.fadein :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.fadein');}, 
      3000);
    });

    // news section
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
    $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(data){
        $.each(data.appetizers, function(i,item) {
            console.log(item)
            var apps = `
        <span class="menutitle">${data.appetizers[i].item}</span>
            <p class="desc">${data.appetizers[i].description}</p>
            <span class="price">${data.appetizers[i].price}</span>
            </div>
        `
        $(".appsleft").append(apps)
        })
        $.each(data.entrees, function(i,item) {
            console.log(item)
            var apps = `
        <span class="menutitle">${data.entrees[i].item}</span>
            <p class="desc">${data.entrees[i].description}</p>
            <span class="price">${data.entrees[i].price}</span>
            </div>
        `
        $(".entreeleft").append(apps)
        })
        $.each(data.sides, function(i,item) {
            console.log(item)
            var apps = `
        <span class="menutitle">${data.sides[i].item}</span>
            <p class="desc">${data.sides[i].description}</p>
            <span class="price">${data.sides[i].price}</span>
            </div>
        `
        $(".sidesleft").append(apps)
        })



    })
})

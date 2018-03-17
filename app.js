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

    
    //gets and sets special data
    $.get("https://json-data.herokuapp.com/restaurant/special/1", function(data) {
        $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(menuApiData) {
            var specialID = data.menu_item_id;
            $.each(menuApiData, function(i, items) {
                $.each(items, function(j, item) {
                    if (item.id === specialID) {
                        var special = `
                        <span class="menu-item-title">${item.item}</span>
                        <p class="desc">${item.description}</p>
                        <span class="price">${item.price}</span>
                        <div class="special-cases">
                            <div class="special-case-favorite case">
                                <img src="./resources/favorite.png" class="ico favorite" />
                            </div>
                            <div class="special-case-allergy case">
                                <img src="./resources/allergy.png" class="ico allergy" />
                            </div>
                            <div class="special-case-spicy case">
                                <img src="./resources/spicy.png" class="ico spicy" />
                            </div>
                            <div class="special-case-vegan case">                        
                                <img src="./resources/vegan.png" class="ico vegan" />
                            </div>
                        </div>
                        `
                        $(".menu-special").append(special)
                    }
                    setCase(item)
                })
            })
        })
    })
    //gets and sets menu items
    $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(data){
        $.each(data.appetizers, function(i,itemObj) {
            var apps = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                    </div>
                </div>
                `
        $(".menu-apps").append(apps)
        setCase(itemObj);
        })
        $.each(data.entrees, function(i,itemObj) {
            var apps = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                    </div>
                </div>
                `
        $(".menu-entrees").append(apps)
        setCase(itemObj);
        })
        $.each(data.sides, function(i,itemObj) {
            var apps = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                    </div>
                </div>
                `
        $(".menu-sides").append(apps)
        setCase(itemObj);
        })
    });

    // tabs section
    $('ul.tabs').each(function() {
        // set and track properties on each tab
        var $active, $content, $links = $(this).find('a');
        // location.hash returns #anchor part of a url
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active')

        $content = $($active[0].hash);
        // for each of the other links not $active, hide them
        $links.not($active).each(function() {
                $(this.hash).hide();
        })

        $(this).on('click', 'a', function(e) {
            // e.preventDefault();
            //remove class from clicked and hide
            $active.removeClass('active');
            $content.hide();
            //set variables to new clicked on tab
            $active = $(this);
            $content = $(this.hash);
            //make clicked on tab active
            $active.addClass('active');
            $content.show();
        })
    });

    //change background color of tabs on selected
    $('.tabs a').click(function (event) {
        $('.tabs a').removeClass('selected');
        $(this).addClass('selected');
    });

    //sets special case tool tips
    function setCase(item) {
        var fa, al, sp, ve = '';
        //if item has a special case then add correct tooltip
        if(item.favorite === 1) {fa = `<span class="ico-tip-text">Kevins' favorite</span>`} 
        if(item.allergies === 1) {al = `<span class="ico-tip-text">May contain allergens</span>`} 
        if(item.spicy === 1) {sp = `<span class="ico-tip-text">Can be spicy</span>`} 
        if(item.vegan === 1) {ve = `<span class="ico-tip-text">Vegan item</span>`} 

        $(".special-case-favorite").append(fa)
        $(".special-case-allergy").append(al)
        $(".special-case-spicy").append(sp)
        $(".special-case-vegan").append(ve)
    }

    //zooms image on hover 
    $(".food-image").width(150);
    $(".food-image").mouseover(function() {
        $(this).css("cursor","pointer");
        $(this).animate({width: "300px", height: "300px"}, 'slow');
    });
    
    $(".food-image").mouseout(function() {   
        $(this).animate({width: "150px", height: "150px"}, 'slow');
    });
})

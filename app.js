$(document).ready(function() {

    // carousel 
    $(function(){   
        $('.fadein img:gt(0)').hide();
        setInterval(function(){
        $('.fadein :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.fadein');
        }, 3000);
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

    //sets vars for setCase() when creating menu template
    var fa, al, sp, ve = '';
    
    //gets and sets special data
    $.get("https://json-data.herokuapp.com/restaurant/special/1", function(data) {
        $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(menuApiData) {
            var specialID = data.menu_item_id;
            $.each(menuApiData, function(i, items) {
                $.each(items, function(j, item) {
                    setCase(item)
                    if (item.id === specialID) {
                        var special = `
                        <span class="menu-item-title">${item.item}</span>
                        <p class="desc">${item.description}</p>
                        <span class="price">${item.price}</span>
                        <div class="special-cases">
                            <div class="special-case-favorite case">
                                <img src="./resources/favorite.png" class="ico favorite" />
                                ${fa}
                            </div>
                            <div class="special-case-allergy case">
                                <img src="./resources/allergy.png" class="ico allergy" />
                                ${al}
                            </div>
                            <div class="special-case-spicy case">
                                <img src="./resources/spicy.png" class="ico spicy" />
                                ${sp}
                            </div>
                            <div class="special-case-vegan case">                        
                                <img src="./resources/vegan.png" class="ico vegan" />
                                ${ve}
                            </div>
                        </div>
                        `
                        $(".menu-special").append(special)
                    }
                })
            })
        })
    })
    //gets and sets menu items
    $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(data){
        $.each(data.appetizers, function(i,itemObj) {
            setCase(itemObj);
            var apps = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                        ${fa}
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                        ${al}
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                        ${sp}
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                        ${ve}
                    </div>
                </div>
                `
        $(".menu-apps").append(apps)
        })
        $.each(data.entrees, function(i,itemObj) {
            setCase(itemObj);
            var apps1 = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                        ${fa}
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                        ${al}
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                        ${sp}
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                        ${ve}
                    </div>
                </div>
                `
        $(".menu-entrees").append(apps1)
        })
        $.each(data.sides, function(i,itemObj) {
            setCase(itemObj);
            var apps2 = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div class="special-cases">
                    <div class="special-case-favorite case">
                        <img src="./resources/favorite.png" class="ico favorite" />
                        ${fa}
                    </div>
                    <div class="special-case-allergy case">
                        <img src="./resources/allergy.png" class="ico allergy" />
                        ${al}
                    </div>
                    <div class="special-case-spicy case">
                        <img src="./resources/spicy.png" class="ico spicy" />
                        ${sp}
                    </div>
                    <div class="special-case-vegan case">                        
                        <img src="./resources/vegan.png" class="ico vegan" />
                        ${ve}
                    </div>
                </div>
                `
        $(".menu-sides").append(apps2)
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
        //if item has a special case then add correct tooltip
        if(item.favorite === 1) {fa = `<span class="ico-tip-text green">Kevins' favorite</span>`} else {fa = `<span class="ico-tip-text">Terrible item</span>`}
        if(item.allergies === 1) {al = `<span class="ico-tip-text green">May contain allergens</span>`} else {al = `<span class="ico-tip-text">Contains no known allergens</span>`}
        if(item.spicy === 1) {sp = `<span class="ico-tip-text green">Can be made spicy</span>`} else {sp = `<span class="ico-tip-text">Is not spicy</span>`}
        if(item.vegan === 1) {ve = `<span class="ico-tip-text green">Vegan item</span>`} else {ve = `<span class="ico-tip-text">Non vegan item</span>`}
    }

    //zooms image on click/hover 
    $(".food-image").click(function() {
        $(this).animate({width: "350px", height: "225px"}, {duration: 1000, queue: false});
    });
    
    $(".food-image").mouseout(function() {   
        $(this).animate({width: "100px", height: "100px"}, {duration: 1000, queue: false});
    });
    //animates right aligned images to animate towards the left
    $(".right").click(function() {
        $(this).animate({width: "350px", height: "225px", marginLeft: "0px"}, {duration: 1000, queue: false});
    });

    $(".right").mouseout(function() {   
        $(this).animate({width: "100px", height: "100px", marginLeft: "100px"}, {duration: 1000, queue: false});
    });
})

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
                        <div="special-cases">
                        <img src="./resources/allergy.png" class="allergy" />
                        <img src="./resources/favorite.png" class="favorite" />
                        <img src="./resources/spicy.png" class="spicy" />
                        <img src="./resources/vegan.png" class="vegan" />
                        </div>
                        </div>
                        `
                        $(".menu-special").append(special)
                    }
                })
            })
        })
    })

    $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(data){
        $.each(data.appetizers, function(i,itemObj) {
            console.log(itemObj)
            var apps = `
                <span class="menu-item-title">${itemObj.item}</span>
                <p class="desc">${itemObj.description}</p>
                <span class="price">${itemObj.price}</span>
                <div="special-cases">
                <img src="./resources/allergy.png" class="allergy" />
                <img src="./resources/favorite.png" class="favorite" />
                <img src="./resources/spicy.png" class="spicy" />
                <img src="./resources/vegan.png" class="vegan" />
                </div>
                </div>
            `
        $(".menu-apps").append(apps)
        })
        $.each(data.entrees, function(i,item) {
            var apps = `
        <span class="menu-item-title">${data.entrees[i].item}</span>
            <p class="desc">${data.entrees[i].description}</p>
            <span class="price">${data.entrees[i].price}</span>
            <div="special-cases">
            <img src="./resources/allergy.png" class="allergy" />
            <img src="./resources/favorite.png" class="favorite" />
            <img src="./resources/spicy.png" class="spicy" />
            <img src="./resources/vegan.png" class="vegan" />
            </div>
            </div>
        `
        $(".menu-entrees").append(apps)
        })
        $.each(data.sides, function(i,item) {
            var apps = `
        <span class="menu-item-title">${data.sides[i].item}</span>
            <p class="desc">${data.sides[i].description}</p>
            <span class="price">${data.sides[i].price}</span>
            <div="special-cases">
            <img src="./resources/allergy.png" class="allergy" />
            <img src="./resources/favorite.png" class="favorite" />
            <img src="./resources/spicy.png" class="spicy" />
            <img src="./resources/vegan.png" class="vegan" />
            </div>
            </div>
        `
        $(".menu-sides").append(apps)
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
        $(event.currentTarget).addClass('selected');
    });

})

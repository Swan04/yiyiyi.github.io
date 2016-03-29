(function($) {
	var containterWd = $('#imagesCarousel').width();
	var cloneList = $("#imagesCarousel-list li");
	$(function(){
       imagesCarouselList()
       bindEvent();
	});
	function imagesCarouselList() {
       var $imageList = $("#imagesCarousel-list");
       var $imageListLis = $("#imagesCarousel-list li");
       var totalWidth = 0;

       $imageListLis.each(function(i,item){
       	    totalWidth += $(item).outerWidth(true);
       });
       var cloneList = $imageListLis.clone();
       $(cloneList[0]).addClass('currentItem');
       $imageList.append(cloneList);
       $imageList.width(totalWidth * 2);
       $imageList.css({left:-totalWidth});

       var currentItemWd = $("#imagesCarousel-list li.currentItem").outerWidth(true);
       $imageList.css({left:-totalWidth + (containterWd - currentItemWd) / 2});
       
	}

	function bindEvent() {
		$("#left-pre-btn").on('click',prevClick);
		$("#right-next-btn").on('click',nextClick);
	}

	function prevClick() {
		var $imageList = $("#imagesCarousel-list");
		var $currentItem = $("#imagesCarousel-list li.currentItem");
		var $prevItem = $currentItem.prev();
		var left = parseInt($imageList.css("left"));
		var prevWd = $prevItem.outerWidth(true);
		var currentWd = $currentItem.outerWidth(true);
		var offsetCurrentWd = (containterWd- currentWd) / 2;
		var prevOffset = (containterWd- prevWd) / 2;

		var newLeft = left +  prevWd - offsetCurrentWd + prevOffset;
		if(newLeft > 0) {
			var $lastLi = $("#imagesCarousel-list").children(":last");
        	var lastLiWd = $lastLi.outerWidth(true);
        	newLeft -= lastLiWd;
        	$imageList.prepend($lastLi);
		}

		$currentItem.removeClass("currentItem");
		$prevItem.addClass("currentItem");
		$imageList.css({left:newLeft});

       
	}
	function nextClick() {
		var $imageList = $("#imagesCarousel-list");
		var totalListWd = $imageList.outerWidth(true);
		var $currentItem = $("#imagesCarousel-list li.currentItem");
		var $nextItem = $currentItem.next();
		var left = parseInt($imageList.css("left"));
		var nextWd = $nextItem.outerWidth(true);
		var currentWd = $currentItem.outerWidth(true);
		var offsetCurrentWd = (containterWd- currentWd) / 2;
		var nextOffset = (containterWd- nextWd) / 2;
        
        var newLeft = left  - offsetCurrentWd - currentWd + nextOffset;
        if(newLeft - containterWd < - totalListWd) {
        	var $firstLi = $("#imagesCarousel-list").children(":first");
        	var firstLiWd = $firstLi.outerWidth(true);
        	newLeft += firstLiWd;
        	$imageList.append($firstLi);
        }

		$currentItem.removeClass("currentItem");
		$nextItem.addClass("currentItem");
		$imageList.css({left:newLeft});
       		
	}

})($)

  var containterWd = $('#imagesCarousel').width();
  var totalWidth = 0;
  $(function() {
     imgLoadComplate();
       bindEvent();
  });

  function imgLoadComplate() {//判断轮播图片是否加载完
       var imgsUrlArr = [];
       $(".imagesCarousel-list li img").each(function(){
          imgsUrlArr.push($(this).attr('src'));
      });
       var loadImgCount = 0;

        function imgLoad(url) {
            if(loadImgCount == imgsUrlArr.length){
              imagesCarouselList()
              return;
            }
            var img = new Image();
            img.src = url;
            img.onload = function() {
               loadImgCount ++;   
               imgLoad(imgsUrlArr[loadImgCount]);
            }
        }
       imgLoad(imgsUrlArr[loadImgCount]);
  }

  function imagesCarouselList() {
       var $imageList = $(".imagesCarousel-list");
       var $imageListLis = $(".imagesCarousel-list li");
 
       $imageListLis.each(function(i,item) { //计算一个UL的宽度
            totalWidth += $(item).outerWidth(true);
       });

       $imageList.width(totalWidth);

       var cloneListCenter = $imageList.clone();//中间的UL
       $(cloneListCenter.children("li")[0]).addClass('currentItem');
       $('#imagesCarousel').append(cloneListCenter);

       var cloneListRight = $imageList.clone();//右边的UL
       $('#imagesCarousel').append(cloneListRight);

       var currentItemWd = $(".imagesCarousel-list li.currentItem").outerWidth(true);

       cloneListCenter.css({left:(containterWd - currentItemWd) / 2});
       $imageList.css({left:-totalWidth + (containterWd - currentItemWd) / 2});
       cloneListRight.css({left:totalWidth + (containterWd - currentItemWd) / 2})
  }

  function bindEvent() {
    $("#left-pre-btn").on('click',prevClick);
    $("#right-next-btn").on('click',nextClick);
  }

  function prevClick() { 
    var $currentItem = $(".imagesCarousel-list li.currentItem");
    var $imageList = $currentItem.parent();
    var $prevItem = $currentItem.prev();

    if(!$prevItem[0]) {
      var $prevList = $currentItem.parent().prev();
      var prevCloneList = $prevList.clone();

      $prevItem = $prevList.children("li:last");
      prevListLeft = parseInt($prevList.css("left"));
      prevCloneList.css({left:prevListLeft-totalWidth});
      $('#imagesCarousel').prepend(prevCloneList);
      $currentItem.parent().next().remove();
    }
    
    var prevWd = $prevItem.outerWidth(true);
    var currentWd = $currentItem.outerWidth(true);//当前节点宽度
    var offsetCurrentWd = (containterWd- currentWd) / 2;
    var prevOffset = (containterWd- prevWd) / 2;

    var newLeft = Math.ceil(prevWd - offsetCurrentWd + prevOffset);
    $(".imagesCarousel-list").each(function(i,item) {
        var leftWd = parseInt($(item).css("left"));
        $(item).animate({left:(leftWd + newLeft)});

    })

    $currentItem.removeClass("currentItem");
    $prevItem.addClass("currentItem");

       
  }
  function nextClick() {
    var $currentItem = $(".imagesCarousel-list li.currentItem");
    var $imageList = $currentItem.parent();
    var $nextItem = $currentItem.next();
    
    if(!$nextItem[0]) {
      var $nextList = $currentItem.parent().next();
      var nextCloneList = $nextList.clone();

      $nextItem = $nextList.children("li:first");
      nextListLeftWd = parseInt($nextList.css("left"));
      nextCloneList.css({left:nextListLeftWd + totalWidth});
      $('#imagesCarousel').append(nextCloneList);
      $currentItem.parent().prev().remove();
    }

    var left = parseInt($imageList.css("left"));
    var nextWd = $nextItem.outerWidth(true);
    var currentWd = $currentItem.outerWidth(true);
    var offsetCurrentWd = (containterWd- currentWd) / 2;
    var nextOffset = (containterWd- nextWd) / 2;
        
    var newLeft =  Math.ceil(-offsetCurrentWd - currentWd + nextOffset);
    $(".imagesCarousel-list").each(function(i,item) {
        var leftWd = parseInt($(item).css("left"));
        $(item).animate({left:(leftWd + newLeft)});
    })

    $currentItem.removeClass("currentItem");
    $nextItem.addClass("currentItem");    
  }

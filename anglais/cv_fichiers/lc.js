$(document).ready(function () {
	menuBtnLeft = -130;
	menuBtnZ = 21;

    $('div#menu a').each(function () {
	//alert('hi');
		menuBtnLeft = menuBtnLeft + 130;
		menuBtnLeftStr = menuBtnLeft + 'px';
		menuBtnZ = menuBtnZ - 1;
		$(this).css('left', menuBtnLeftStr);
		$(this).css('z-index', menuBtnZ);
	});

	$('div#menu a.active').css('z-index', '25');

    $('div#menu a').hover(function () {
		thisZ = $(this).css('z-index');
  		$(this).addClass('hover');
  		$(this).css('z-index', '30');
    }, function () {
  		$(this).removeClass('hover');
  		$(this).css('z-index', thisZ);
	});

    subMenuLeft = $('div#menu a.active').css('left');
	subMenuLeft = parseInt(subMenuLeft);
    if (subMenuLeft < 499) {
		padSubMenuLeft = subMenuLeft + 25;
		padSubMenuLeftStr = padSubMenuLeft + 'px';
	  	$('div#submenu').css('padding-left', padSubMenuLeftStr);
	}
	else {
		padSubMenuRight = 999 - 130 - 28 - 12 - subMenuLeft;
		padSubMenuRightStr = padSubMenuRight + 'px';
		$('div#submenu ul').css('float', 'right');
	  	$('div#submenu').css('padding-right', padSubMenuRightStr);
	}
});
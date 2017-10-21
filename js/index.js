//
// Situación en el documento ************************************************************************************
//
var section = 1;
var page = 1;
var lastPage = 7;
var pageLang = "EN";
$(function () {
	//
	// Tratar parámetros GET ************************************************************************************
	//
	var parameters = location.search.substring(1);
	if(parameters.length>0){
		parameters = location.search.substring(1).split("&");
		var temp = parameters[0].split("=");
		if(temp[0]==="CV"){
			if(temp.length>1 && temp[1]==="Mensa"){
				$("section:nth-of-type(3) object:first-of-type").css("display", "none");
				$("section:nth-of-type(3) iframe:first-of-type").css("display", "none");
				$("section:nth-of-type(3) object:last-of-type").css("display", "block");
				$("section:nth-of-type(3) iframe:last-of-type").css("display", "inline");
			}
			$("#nav_hor li:nth-of-type(3)").css("display", "list-item");
			$("div.menu_hor a:nth-of-type(3)").css("display", "block");
		}
	}
	//
	// Ocultar control siguiente última página ******************************************************************
	//
	$("section:nth-of-type(1) article:nth-of-type("+lastPage+") div.paginar p:last-of-type").css("display", "none");
	$("section:nth-of-type(1) article:nth-of-type("+lastPage+") div.paginar img.siguiente").css("display", "none");
	//
	// Eventos menús horizontales (pestañas y minimizado) *******************************************************
	//
	$("#nav_hor a").click(function(){
		if(!$(this).hasClass("selected")){
			section=$(this).parent().index()+1;
			$("section").eq($("#nav_hor").find(".selected").parent().index()).css("display", "none");
			$("#nav_hor").find(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("section").eq(section-1).css("display", "inline-block");
			// Cambio menú minimizado
			$("div.menu_hor").find(".selected").removeClass("selected");
			$("div.menu_hor a").eq(section-1).addClass("selected");
			// Fin cambio
			if(section===1){
				if($("header>img.menu_ver").css("display")==="none"){
					$("#nav_ver").css("display", "inline-block");
					$("section").css("border-left", "20px solid");
				}
			}else{
				$("#nav_ver").css("display", "none");
				$("section").css("border-left", 0);
			}
		}
	});
	$("div.menu_hor a").click(function(){
		if(!$(this).hasClass("selected")){
			section=$(this).index()+1;
			$("section").eq($("div.menu_hor").find(".selected").index()).css("display", "none");
			$("div.menu_hor").find(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("section").eq(section-1).css("display", "inline-block");
			// Cambio menú pestañas
			$("#nav_hor").find(".selected").removeClass("selected");
			$("#nav_hor li").eq(section-1).find("a").addClass("selected");
			// Fin cambio
			if(section===1){
				if($("header>img.menu_ver").css("display")==="none"){
					$("#nav_ver").css("display", "inline-block");
					$("section").css("border-left", "20px solid");
				}
			}else{
				$("#nav_ver").css("display", "none");
				$("section").css("border-left", 0);
			}
		}
	});
	//
	// Eventos iconos menús minimizados *************************************************************************
	//
	$("header div.menu_ver").animate({ // Minimiza el menú al cargar el DOM
		width: "toggle",
		padding: "toggle"
	}, 0);
	$("header>img.menu_ver").click(function(){
		event.stopPropagation();
		if($("header div.menu_hor").css("display")!=="none")
			$("header div.menu_hor").animate({
				height: "toggle",
				padding: "toggle"
			}, 300);
		$("header div.menu_ver").animate({
			width: "toggle",
			padding: "toggle"
		}, 300);
	});
	$("header div.menu_hor").animate({ // Minimiza el menú al cargar el DOM
		height: "toggle",
		padding: "toggle"
	}, 0);
	$("header>img.menu_hor").click(function(){
		event.stopPropagation();
		if($("header div.menu_ver").css("display")!=="none")
			$("header div.menu_ver").animate({
				width: "toggle",
				padding: "toggle"
			}, 300);
		$("header div.menu_hor").animate({
			height: "toggle",
			padding: "toggle"
		}, 300);
	});
	//
	// Evento click de la ventana (Cerrar menús abiertos) *******************************************************
	//
	$(window).click(function(){
		if($("header div.menu_ver").css("display")!=="none")
			$("header div.menu_ver").animate({
				width: "toggle",
				padding: "toggle"
			}, 300);
		if($("header div.menu_hor").css("display")!=="none")
			$("header div.menu_hor").animate({
				height: "toggle",
				padding: "toggle"
			}, 300);
	});
	//
	// Evento resize de la ventana (adaptar carrusel, form, boton llamada a form y menú horizontal) *************
	//
	$(window).resize(function(){
		actualizar_controles();
	});
	function actualizar_controles(){
		if($(window).width()<=768){
			$("#nav_ver").css("display", "none");
			$("section").css("border-left", 0);
			$('header a.language').appendTo($("header div.menu_hor"));
			$("header div.menu_hor a.language").languagepicker("option", "listBackgroundColor", "lightsteelblue");
		}else{
			$("header div.menu_hor a.language").appendTo($("header"));
			$('header a.language').languagepicker("option", "listBackgroundColor", "rgba(255, 255, 255, .5)");
			if(section===1){
				$("#nav_ver").css("display", "inline-block");
				$("section").css("border-left", "20px solid");
			}
			if($("header div.menu_hor").css("display")!=="none")
				$("header div.menu_hor").css("display", "none");
			if($("header div.menu_ver").css("display")!=="none")
				$("header div.menu_ver").css("display", "none");
		}
		if($(window).height()<=576){
			$("#art_posic form").css("display", "none");
			$("#art_posic>.btn_animation").css("display", "block").removeClass("close");
			_traducir("#art_posic>.btn_animation", 13, 0); // Animar
			$("#art_anim  div.panel form").css("display", "none");
			$("#art_anim div.panel>.btn_animation").css("display", "block").removeClass("close");
			if($("#art_anim div.panel>.btn_animation").hasClass("terminate"))
				_traducir("#art_anim div.panel>.btn_animation", 18, 0); // Terminar
			else
				_traducir("#art_anim div.panel>.btn_animation", 13, 0); // Animar
			$("#art_videos form").css("display", "none");
			$("#art_videos div#div_parentvideos>.btn_animation").css("display", "block").removeClass("close");
			if($("#art_videos div#div_parentvideos>.btn_animation").hasClass("terminate"))
				_traducir("#art_videos div#div_parentvideos>.btn_animation", 18, 0); // Terminar
			else
				_traducir("#art_videos div#div_parentvideos>.btn_animation", 13, 0); // Animar
			if($(this).width()<=576){
				$('#art_posic .carrusel').slider3d("option", {width: "80vw", height: "30vh"});
				$('#art_anim .carrusel').slider3d("option", {width: "60vw", height: "30vh"});
				$('#art_videos .carrusel').slider3d("option", {width: "80vw", height: "30vh"});
			}else{
				$('#art_posic .carrusel').slider3d("option", {width: "40vw", height: "30vh"});
				$('#art_anim .carrusel').slider3d("option", {width: "40vw", height: "30vh"});
				$('#art_videos .carrusel').slider3d("option", {width: "55vw", height: "45vh"});
			}
		}else 
			if($(this).width()<=576){
				$('#art_posic .carrusel').slider3d("option", {width: "80vw", height: "30vh"});
				$("#art_posic form").css("display", "none");
				$("#art_posic>.btn_animation").css("display", "block").removeClass("close");
				_traducir("#art_posic>.btn_animation", 13, 0); // Animar
				$('#art_anim .carrusel').slider3d("option", {width: "60vw", height: "30vh"});
				$("#art_anim div.panel form").css("display", "none");
				$("#art_anim div.panel>.btn_animation").css("display", "block").removeClass("close");
				if($("#art_anim div.panel>.btn_animation").hasClass("terminate"))
					_traducir("#art_anim div.panel>.btn_animation", 18, 0);
				else
					_traducir("#art_anim div.panel>.btn_animation", 13, 0);
				$('#art_videos .carrusel').slider3d("option", {width: "70vw", height: "30vh"});
				$("#art_videos form").css("display", "none");
				$("#art_videos div#div_parentvideos>.btn_animation").css("display", "block").removeClass("close");
				if($("#art_videos div#div_parentvideos>.btn_animation").hasClass("terminate"))
					_traducir("#art_videos div#div_parentvideos>.btn_animation", 18, 0);
				else
					_traducir("#art_videos div#div_parentvideos>.btn_animation", 13, 0);
			}else{
				$('#art_posic .carrusel').slider3d("option", {width: "40vw", height: "30vh"});
				$("#art_posic form").css("display", "block");
				$("#art_posic>.btn_animation").css("display", "none");
				$('#art_anim .carrusel').slider3d("option", {width: "40vw", height: "30vh"});
				$("#art_anim form").css("display", "block");
				$("#art_anim div.panel>.btn_animation").css("display", "none");
				$('#art_videos .carrusel').slider3d("option", {width: "40vw", height: "30vh"});
				$("#art_videos form").css("display", "block");
				$("#art_videos div#div_parentvideos>.btn_animation").css("display", "none");
			}
	}
	//
	// Inicialización del plugin demo de posicionamiento ********************************************************
	//
    var items = [{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": false, "data-videoLoop": false, controls: "controls"}, 
        {src: "img/lorempixel2.jpg", title: "lorempixel2.jpg", alt: "2/lorempixel.com"},
        {src: "img/lorempixel3.jpg", title: "lorempixel3.jpg", alt: "3/lorempixel.com"},
        {src: "img/lorempixel4.jpg", title: "lorempixel4.jpg", alt: "4/lorempixel.com"},
        {src: "img/lorempixel5.jpg", title: "lorempixel5.jpg", alt: "5/lorempixel.com"},
        {src: "img/lorempixel6.jpg", title: "lorempixel6.jpg", alt: "6/lorempixel.com"},
        {src: "img/lorempixel7.jpg", title: "lorempixel7.jpg", alt: "7/lorempixel.com"},
        {src: "img/lorempixel8.jpg", title: "lorempixel8.jpg", alt: "8/lorempixel.com"},
        {src: "img/lorempixel9.jpg", title: "lorempixel9.jpg", alt: "9/lorempixel.com"},
		{src: "img/lorempixel10.jpg", title: "lorempixel10.jpg", alt: "10/lorempixel.com"}];
	if($(window).width()<=576)
		var w="80vw";
	else
		var w="40vw";
    $('#art_posic .carrusel').slider3d({
		items: items,
        width: w,
        height: "30vh",
        maxheight: 300,
        responsive: true
    });
	//
	// Eventos del formulario de manipulación de la demo de posicionamiento *************************************
	//
	$("#btn_der").click(function(){
		$('#art_posic .carrusel').slider3d("move", 1, 600);
	});
	$("#btn_izq").click(function(){
		$('#art_posic .carrusel').slider3d("move", -1, 600);
	});
	$("#btn_moveto").click(function(){
		var v=parseInt($("#art_posic form input").val());
		$('#art_posic .carrusel').slider3d("moveTo", v, 600);
	});
	$("#btn_showcontrols").click(function(){
		$('#art_posic .carrusel').slider3d("showControls", 600, null, null, "3em");
	});
	$("#btn_hidecontrols").click(function(){
		$('#art_posic .carrusel').slider3d("hideControls");
	});
	$("#btn_showindicators").click(function(){
		$('#art_posic .carrusel').slider3d("showIndicators", 1000, "lightgray", "blue", null, "-10%");
	});
	$("#btn_hideindicators").click(function(){
		$('#art_posic .carrusel').slider3d("hideIndicators");
	});
	$("#btn_random").click(function(){
		$('#art_posic .carrusel').slider3d("random", 600);
	});
	$("#art_posic>.btn_animation").click(function(){
		event.stopPropagation();
		if(!$('#art_posic .carrusel').slider3d("animating")){
			if($("#art_posic form").css("display")==="none"){
				$("#art_posic form").css("display", "block");
				if($("#art_posic form").css("left")!=="0px"){
					$("#art_posic .carrusel").css("position", "absolute");
					$("#art_posic .carrusel").css("left", "auto");
					$("#art_posic .carrusel").css("right", "8vw");
				}
				$("#art_posic .btn_animation").addClass("close");
				_traducir("#art_posic .btn_animation", 19, 0); // Cerrar
			}else{
				$("#art_posic form").css("display", "none");
				if($("#art_posic form").css("left")!=="0px"){
					$("#art_posic .carrusel").css("position", "static");
					$("#art_posic .carrusel").css("right", "0");
					$("#art_posic .carrusel").css("right", "0");
				}
				$("#art_posic .btn_animation").removeClass("close");
				_traducir("#art_posic .btn_animation", 13, 0); // Animar
			}
		}
	});
	
	//
	// Inicialización del plugin demo de animación **************************************************************
	//
    var items = [{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": false, "data-videoLoop": false,
		"data-txt1": "3D Acting animation - The Shining",
		"data-txt1css": "bottom: 26%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.3vw;", 
		"data-txt2": "por Ferran Lavado",
		"data-txt2css": "bottom: 19%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.2vw;"}, 
        {src: "img/lorempixel2.jpg", title: "lorempixel2.jpg", alt: "2/lorempixel.com"},
        {src: "img/lorempixel3.jpg", title: "lorempixel3.jpg", alt: "3/lorempixel.com"},
        {src: "img/lorempixel4.jpg", title: "lorempixel4.jpg", alt: "4/lorempixel.com"},
        {src: "img/lorempixel5.jpg", title: "lorempixel5.jpg", alt: "5/lorempixel.com"},
        {src: "img/lorempixel6.jpg", title: "lorempixel6.jpg", alt: "6/lorempixel.com"},
        {src: "img/lorempixel7.jpg", title: "lorempixel7.jpg", alt: "7/lorempixel.com"},
        {src: "img/lorempixel8.jpg", title: "lorempixel8.jpg", alt: "8/lorempixel.com"},
        {src: "img/lorempixel9.jpg", title: "lorempixel9.jpg", alt: "9/lorempixel.com"},
		{src: "img/lorempixel10.jpg", title: "lorempixel10.jpg", alt: "10/lorempixel.com"}];
	if($(window).width()<=576)
		var w="60vw";
	else
		var w="40vw";
    $('#art_anim .carrusel').slider3d({
		items: items,
        width: w,
        height: "30vh",
        maxheight: 300,
        responsive: true,
		scaleElementPaused: function(){
			_traducir("#art_anim div.panel button.btn_animation", 18, 0); // Terminar
			$("#art_anim div.panel button.btn_animation").addClass("terminate");
		},
		scaleElementComplete: function(){
			_traducir("#art_anim div.panel button.btn_animation", 13, 0); // Animar
			$("#art_anim div.panel button.btn_animation").removeClass("terminate");
		},
		scaleParentPaused: function(){
			_traducir("#art_anim div.panel button.btn_animation", 18, 0); // Terminar
			$("#art_anim div.panel button.btn_animation").addClass("terminate");
		},
		scaleParentComplete: function(){
			_traducir("#art_anim div.panel button.btn_animation", 13, 0); // Animar
			$("#art_anim div.panel button.btn_animation").removeClass("terminate");
		},
		scaleWidthPaused: function(){
			_traducir("#art_anim div.panel button.btn_animation", 18, 0); // Terminar
			$("#art_anim div.panel button.btn_animation").addClass("terminate");
		},
		scaleWidthComplete: function(){
			_traducir("#art_anim div.panel button.btn_animation", 13, 0); // Animar
			$("#art_anim div.panel button.btn_animation").removeClass("terminate");
		}
    });
    $('#art_anim .carrusel').slider3d("showControls", null, null, null, "3em");
    $('#art_anim .carrusel').slider3d("showIndicators");
	//
	// Eventos del formulario de manipulación de la demo de animación *******************************************
	//
	$('#art_anim .cls_5').css("display","none");
	$('#art_anim .cls_6').css("display","none");
	$('#art_anim select').on('change', function() {
		if(this.value==="Element"){
			$('#art_anim .carrusel').slider3d("scaleParentTerminate");
			$('#art_anim .carrusel').slider3d("scaleWidthTerminate");
			$('#art_anim .cls_1').css("display","inline-block");
			$('#art_anim .cls_4').css("display","inline-block");
			$('#art_anim .cls_5').css("display","none");
			$('#art_anim .cls_6').css("display","none");
		}else if(this.value==="Parent"){
			$('#art_anim .carrusel').slider3d("scaleElementTerminate");
			$('#art_anim .carrusel').slider3d("scaleWidthTerminate");
			$('#art_anim .cls_1').css("display","none");
			$('#art_anim .cls_4').css("display","inline-block");
			$('#art_anim .cls_5').css("display","inline-block");
			$('#art_anim .cls_6').css("display","none");
		}else if(this.value==="Width"){
			$('#art_anim .carrusel').slider3d("scaleElementTerminate");
			$('#art_anim .carrusel').slider3d("scaleParentTerminate");
			$('#art_anim .cls_1').css("display","none");
			$('#art_anim .cls_4').css("display","none");
			$('#art_anim .cls_5').css("display","inline-block");
			$('#art_anim .cls_6').css("display","none");
		}
	});
	$("#art_anim form button.btn_animation").click(function(){
		if($(window).height()<=576 || $(window).width()<=576){
			$("#art_anim form").css("display", "none");
			$("#art_anim div.panel>.btn_animation").removeClass("close");
		}
		if($('#art_anim form select').val()==="Element"){
			if($("#art_anim form button.btn_animation").hasClass("terminate"))
				$('#art_anim .carrusel').slider3d("scaleElementTerminate");
			else
				$('#art_anim .carrusel').slider3d("scaleElement", 
					$('#div_'+$('#art_anim .cls_1 input:checked').val()),
					$('#art_anim .cls_2 input').val(),
					$('#art_anim .cls_3 input').val(),
					$('#art_anim .cls_4 input:checked').val());
		}else if($('#art_anim form select').val()==="Parent"){
			if($("#art_anim form button.btn_animation").hasClass("terminate"))
				$('#art_anim .carrusel').slider3d("scaleParentTerminate");
			else
				$('#art_anim .carrusel').slider3d("scaleParent", 
					$('#art_anim .cls_2 input').val(),
					$('#art_anim .cls_3 input').val(),
					$('#art_anim .cls_4 input:checked').val(),
					$('#art_anim .cls_5 input:checked').val());
		}else if($('#art_anim form select').val()==="Width"){
			if($("#art_anim form button.btn_animation").hasClass("terminate"))
				$('#art_anim .carrusel').slider3d("scaleWidthTerminate");
			else
				$('#art_anim .carrusel').slider3d("scaleWidth", 
					$('#art_anim .cls_2 input').val(),
					$('#art_anim .cls_3 input').val(),
					$('#art_anim .cls_5 input:checked').val(),
					$('#art_anim .cls_6 input:checked').val());
		}
	});
	$("#art_anim div.panel>.btn_animation").click(function(){
		event.stopPropagation();
		if($("#art_anim div.panel>.btn_animation").hasClass("terminate")){
			$('#art_anim .carrusel').slider3d("scaleElementTerminate");
			$('#art_anim .carrusel').slider3d("scaleParentTerminate");
			$('#art_anim .carrusel').slider3d("scaleWidthTerminate");
		}else{
			if(!$('#art_anim .carrusel').slider3d("animating")){
console.log($("#art_anim div.panel form"));
				if($("#art_anim div.panel form").css("display")==="none"){
					$("#art_anim form").css("display", "block");
					$("#art_anim div.panel>.btn_animation").addClass("close");
					_traducir("#art_anim div.panel>.btn_animation", 19, 0); // Cerrar
				}else{
					$("#art_anim form").css("display", "none");
					$("#art_anim div.panel>.btn_animation").removeClass("close");
					_traducir("#art_anim div.panel>.btn_animation", 13, 0); // Animar
				}
			}
		}
	});
	
	//
	// Inicialización del plugin demo de vídeos *****************************************************************
	//
    var items = [
		{src: "vid/3dacting2.mp4", title: "Video",
			"data-txt1": "Demo 1: Sin atributos especiales",
			"data-txt1css": "top: 74%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "Se trata como una imagen fija, a no ser que se establezca la opción \n\
				\"videoAutoPlay\" del plugin a true.",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}, 
		{src: "vid/3dacting2.mp4", title: "Video", controls: "controls",
			"data-txt1": 'Demo 2: controls: "controls"',
			"data-txt1css": "top: 67%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "Siempre se puede añadir al video la propiedad CSS controls.",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}, 
		{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true,
			"data-txt1": 'Demo 3: "data-videoAutoPlay": true',
			"data-txt1css": "top: 74%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "Con videoAutoPlay a true la grabación tras el escalado se reproduce \n\
				automáticamente hasta el final, no se tiene en cuenta el valor de \"t2\". Esta \n\
				opción se puede establecer de forma general en el plugin o individualmente \n\
				en cada video con el atributo especial \"data-videoAutoPlay\". Estos últimos prevalecen \n\
				sobre las opciones generales.",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}, 
		{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true,
			"data-txt1": 'Demo 4: "data-videoAutoPlay": true, <br/>"data-videoLoop": true',
			"data-txt1css": "top: 74%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "Con videoLoop a true y \"t2\" a cero el vídeo se repetirá indefinidamente.",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}, 
		{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-time": 11500,
			"data-txt1": 'Demo 5: "data-videoAutoPlay": true, <br/>"data-time": 11500',
			"data-txt1css": "top: 74%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "Con el atributo especial \"data-time\" > 0 la reproducción del vídeo \n\
				se truncará transcurridos los milisegundos especificados. Esta opción no puede asignarse de forma\n\
				general en el plugin.",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}, 
		{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true, 
				"data-time": 11500,
			"data-txt1": 'Demo 6: "data-videoAutoPlay": true, <br/>"data-videoLoop": true, data-time": 11500',
			"data-txt1css": "top: 74%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.3vw;", 
			"data-txt2": "",
			"data-txt2css": "position: absolute; margin: 0 auto; left: 0; right: 0; "+
				"color: white; font-weight: bold; font-size: 1.2vw;"}];
	
	var	h="30vh";
	if($(window).height()<=576){
		if($(this).width()<=576){
			w="80vw";
		}else{
			w="55vw";
			h="45vh";
		}
	}else{
		if($(window).width()<=576)
			var w="70vw";
		else
			var w="40vw";
	}
	$('#art_videos .carrusel').slider3d({
		items: items,
        width: w,
        height: h,
        maxheight: 300,
        responsive: true,
		scaleParentPaused: function(){
			_traducir("#art_videos .btn_animation", 18, 0); // Terminar
			$("#art_videos .btn_animation").addClass("terminate");
		},
		scaleParentComplete: function(){
			_traducir("#art_videos .btn_animation", 13, 0); // Animar
			$("#art_videos .btn_animation").removeClass("terminate");
			$('#art_videos .carrusel').slider3d("showControls", null, null, null, "3em", null, "-10%");
		}
    });
	
    $('#art_videos .carrusel').slider3d("showControls", null, null, null, "3em", null, "-10%");
	//
	// Eventos del formulario de manipulación de la demo de vídeos **********************************************
	//
	$("#art_videos form button.btn_animation").click(function(){
		if($(window).height()<=576 || $(window).width()<=576){
			$("#art_videos form").css("display", "none");
			$("#art_videos div#div_parentvideos>.btn_animation").removeClass("close");
		}
		if($("#art_videos form button.btn_animation").hasClass("terminate"))
			$('#art_videos .carrusel').slider3d("scaleParentTerminate");
		else{
			if(!$('#art_anim .carrusel').slider3d("animating")){
				$('#art_videos .carrusel').slider3d("hideControls");
				$('#art_videos .carrusel').slider3d("option", {
					videoAutoPlay: ($('#art_videos .cls_2 input:checked').val()==="true")
				});
				$('#art_videos .carrusel').slider3d("option", {
					videoLoop: ($('#art_videos .cls_3 input:checked').val()==="true")
				});
				$('#art_videos .carrusel').slider3d("scaleParent", 
					600,
					$('#art_videos .cls_1 input').val());
			}
		}
	});
	$("#art_videos div#div_parentvideos>.btn_animation").click(function(){
		event.stopPropagation();
		if($("#art_videos div#div_parentvideos>.btn_animation").hasClass("terminate"))
			$('#art_videos .carrusel').slider3d("scaleParentTerminate");
		else{
			if(!$('#art_videos .carrusel').slider3d("animating")){
				if($("#art_videos form").css("display")==="none"){
					$("#art_videos form").css("display", "block");
					$("#art_videos div#div_parentvideos>.btn_animation").addClass("close");
					_traducir("#art_videos div#div_parentvideos>.btn_animation", 19, 0); // Cerrar
				}else{
					$("#art_videos form").css("display", "none");
					$("#art_videos div#div_parentvideos>.btn_animation").removeClass("close");
					_traducir("#art_videos div#div_parentvideos>.btn_animation", 13, 0); // Animar
				}
			}
		}
	});
	//
	// Languagepicker se coloca al final para que los carruseles se encuentren **********************************
	// ya inicializados y poder ejecutar cargarItems()
	//
	$('header a.language').languagepicker({
		locale:"en",
		items: [{flag: "img/catalonia.png", locale: "ca", text: "Català"},
			{flag: "img/english.png", locale: "en", text: "English"},
			{flag: "img/spain.png", locale: "es", text: "Español"}],
		optionChanged: function(a, b){
			if(b.option==="locale"){
				pageLang=$('header a.language').languagepicker("option", "language");
				traducir(pageLang);
				cargarItems();
			}
		}
	});
	actualizar_controles();
	//
	// Eventos para la paginación *******************************************************************************
	//
    $("article .paginar .siguiente").click(function(){
		paginar(page+1);
    });
    $("article .paginar .anterior").click(function(){
		paginar(page-1);
    });
	$("#nav_ver li a").click(function(){
		paginar($(this).parent().index()+1);
	});
	$("header div.menu_ver>a").click(function(){
		paginar($(this).index()+1);
	});
});
//
// Función para la paginación ***********************************************************************************
// 
function paginar(n){
	if(n>lastPage)
		return;
	$("section:nth-of-type("+section+") article:nth-of-type("+page+")").css("display", "none");
	$("#nav_ver li:nth-of-type("+page+")").removeClass("selected");
	$("header div.menu_ver>a:nth-of-type("+page+")").removeClass("selected");
	$("section:nth-of-type("+section+") article:nth-of-type("+(page=n)+")").css("display", "flex");
	$("#nav_ver li:nth-of-type("+page+")").addClass("selected");
	$("header div.menu_ver>a:nth-of-type("+page+")").addClass("selected");
}
//
// Función para la traducción de los textos de los vídeos *******************************************************
//
function cargarItems(){
	$('#art_anim .carrusel').slider3d("removeItems", 0);
	if(pageLang==="EN"){
		$('#art_anim .carrusel').slider3d("insertItems", 0, {src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": false, "data-videoLoop": false,
		"data-txt1": "3D Acting animation - The Shining",
		"data-txt1css": "bottom: 26%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.3vw;", 
		"data-txt2": "by Ferran Lavado",
		"data-txt2css": "bottom: 19%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.2vw;"});
	}else if(pageLang==="ES"){
		$('#art_anim .carrusel').slider3d("insertItems", 0, {src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": false, "data-videoLoop": false,
		"data-txt1": "3D Acting animation - The Shining",
		"data-txt1css": "bottom: 26%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.3vw;", 
		"data-txt2": "por Ferran Lavado",
		"data-txt2css": "bottom: 19%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.2vw;"});
	}else if(pageLang==="CA"){
		$('#art_anim .carrusel').slider3d("insertItems", 0, {src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": false, "data-videoLoop": false,
		"data-txt1": "3D Acting animation - The Shining",
		"data-txt1css": "bottom: 26%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.3vw;", 
		"data-txt2": "per Ferran Lavado",
		"data-txt2css": "bottom: 19%; position: absolute; margin: 0 auto; left: 0; right: 0; "+
			"color: white; font-weight: bold; font-size: 1.2vw;"});
	}
	if(pageLang==="EN"){
		$('#art_videos .carrusel').slider3d("replaceItems", 0, 
			[{src: "vid/3dacting2.mp4", title: "Video",
				"data-txt1": "Demo 1: No special attributes",
				"data-txt2": "It is treated as a fixed image, unless you set the \"videoAutoPlay\" \n\
					option of the plugin to true."}, 
			{src: "vid/3dacting2.mp4", title: "Video", controls: "controls",
				"data-txt1": 'Demo 2: controls: "controls"',
				"data-txt2": "CSS controls can always be added to the video."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true,
				"data-txt1": 'Demo 3: "data-videoAutoPlay": true',
				"data-txt2": "With videoAutoPlay to true the recording after the scaling is \n\
					automatically played until the end, the value of \"t2\" is not taken into account. \n\
					This option can be set generally in the plugin or individually in each video with \n\
					the special attribute \"data-videoAutoPlay\". The latter prevail over the general \n\
					options."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true,
				"data-txt1": 'Demo 4: "data-videoAutoPlay": true, <br/>"data-videoLoop": true',
				"data-txt2": "With videoLoop to true and \"t2\" to zero the video will be repeated \n\
					indefinitely."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-time": 11500,
				"data-txt1": 'Demo 5: "data-videoAutoPlay": true, <br/>"data-time": 11500',
				"data-txt2": "With the special attribute \"data-time\">0 the video will be truncated \n\
					after the specified milliseconds. This option can not be assigned generally in \n\
					the plugin."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true, 
					"data-time": 11500,
				"data-txt1": 'Demo 6: "data-videoAutoPlay": true, <br/>"data-videoLoop": true, data-time": 11500',
				"data-txt2": ""}
			]);
	}else if(pageLang==="ES"){
		$('#art_videos .carrusel').slider3d("replaceItems", 0, 
			[{src: "vid/3dacting2.mp4", title: "Video",
				"data-txt1": "Demo 1: Sin atributos especiales",
				"data-txt2": "Se trata como una imagen fija, a no ser que se establezca la opción \n\
					\"videoAutoPlay\" del plugin a true."}, 
			{src: "vid/3dacting2.mp4", title: "Video", controls: "controls",
				"data-txt1": 'Demo 2: controls: "controls"',
				"data-txt2": "Siempre se puede añadir al video la propiedad CSS controls."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true,
				"data-txt1": 'Demo 3: "data-videoAutoPlay": true',
				"data-txt2": "Con videoAutoPlay a true la grabación tras el escalado se reproduce \n\
					automáticamente hasta el final, no se tiene en cuenta el valor de \"t2\". Esta \n\
					opción se puede establecer de forma general en el plugin o individualmente \n\
					en cada video con el atributo especial \"data-videoAutoPlay\". Estos últimos prevalecen \n\
					sobre las opciones generales."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true,
				"data-txt1": 'Demo 4: "data-videoAutoPlay": true, <br/>"data-videoLoop": true',
				"data-txt2": "Con videoLoop a true y \"t2\" a cero el vídeo se repetirá indefinidamente."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-time": 11500,
				"data-txt1": 'Demo 5: "data-videoAutoPlay": true, <br/>"data-time": 11500',
				"data-txt2": "Con el atributo especial \"data-time\" > 0 la reproducción del vídeo \n\
					se truncará transcurridos los milisegundos especificados. Esta opción no puede asignarse de forma\n\
					general en el plugin."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true, 
					"data-time": 11500,
				"data-txt1": 'Demo 6: "data-videoAutoPlay": true, <br/>"data-videoLoop": true, data-time": 11500',
				"data-txt2": ""}
			]);
	}else if(pageLang==="CA"){
		$('#art_videos .carrusel').slider3d("replaceItems", 0, 
			[{src: "vid/3dacting2.mp4", title: "Video",
				"data-txt1": "Demo 1: Sense atributs especials",
				"data-txt2": "Es tracta com una imatge fixa, llevat que s'estableixi l'opció \n\
					\"videoAutoPlay\" del plugin a true."}, 
			{src: "vid/3dacting2.mp4", title: "Video", controls: "controls",
				"data-txt1": 'Demo 2: controls: "controls"',
				"data-txt2": "Sempre es pot afegir al vídeo la propietat CSS controls."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true,
				"data-txt1": 'Demo 3: "data-videoAutoPlay": true',
				"data-txt2": "Amb videoAutoPlay a true la grabació després de l'escalat es reprodueix \n\
					automàticament fins al final, no es té en compte el valor de \"t2\". Aquesta opció \n\
					es pot establir de forma general en el plugin o individualment en cada vídeo amb \n\
					l'atribut especial \"data-videoAutoPlay\". Aquests últims prevalen sobre les opcions \n\
					generals."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true,
				"data-txt1": 'Demo 4: "data-videoAutoPlay": true, <br/>"data-videoLoop": true',
				"data-txt2": "Amb videoLoop a true i \"t2\" a zero el vídeo es repetirà indefinidament."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-time": 11500,
				"data-txt1": 'Demo 5: "data-videoAutoPlay": true, <br/>"data-time": 11500',
				"data-txt2": "Amb l'atribut especial \"data-time\">0 la reproducció del vídeo es truncarà \n\
					transcorreguts els mil·lisegons especificats. Aquesta opció no pot assignar-de forma \n\
					general en el plugin."}, 
			{src: "vid/3dacting2.mp4", title: "Video", "data-videoAutoPlay": true, "data-videoLoop": true, 
					"data-time": 11500,
				"data-txt1": 'Demo 6: "data-videoAutoPlay": true, <br/>"data-videoLoop": true, data-time": 11500',
				"data-txt2": ""}
			]);
	}
}


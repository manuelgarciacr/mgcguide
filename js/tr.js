var col="", ntxt=0, lang="";
var txt=[
	[ // 0
		[
			"Positioning Demo",
			"Installing the plugin",
			"Plugin Initialization",
			"Positioning Functions",
			"Animation Demo",
			"Animation Functions",
			"Videos Demo"
		], 
		[
			"Demo Posicionament",
			"Instal·lació del plugin",
			"Inicialització del plugin",
			"Funcions Posicionament",
			"Demo Animació",
			"Funcions Animació",
			"Demo Vídeos"
		], 
		[
			"Demo Posicionamiento",
			"Instalación del plugin",
			"Inicialización del plugin",
			"Funciones Posicionamiento",
			"Demo Animación",
			"Funciones Animación",
			"Demo Vídeos"
		]
	],
	[ // 1
		[
			"MGC.Slider3d is a carousel oriented to the execution of presentations \n\
				that support both images and videos in its content.",
			"From JavaScript we can tell it in different ways on what element we want \n\
				positioning to. The plugin in this example contains 9 images and a video."
		], 
		[
			"MGC.Slider3d és un carrusel orientat a l'execució de presentacions \n\
				que admet tant imatges com vídeos al seu contingut.",
			"Desde JavaScript podem indicar-li de formes diferents en què element volem \n\
				posicionar-nos. El plugin d'aquest exemple conté 9 imatges i un vídeo."
		], 
		[
			"MGC.Slider3d es un carrusel orientado a la ejecución de presentaciones \n\
				que admite tanto imágenes como vídeos en su contenido.",
			"Desde JavaScript podemos indicarle de formas diferentes en que elemento queremos \n\
				posicionarnos. El plugin de este ejemplo contiene 9 imágenes y un video."
		]
	],
	[ // 2
		[
			"MOVING THE CAROUSEL"
		], 
		[
			"MOVENT EL CARRUSEL"
		], 
		[
			"MOVIENDO EL CARRUSEL"
		]
	],
	[ // 3
		[
			""
		], 
		[
			""
		], 
		[
			""
		]
	],
	[ // 4 
		[
			""
		], 
		[
			""
		], 
		[
			""
		]
	],
	[ // 5
		[
			"The installation of the plugin requires the following:"
		],
		[
			"La instal·lació del plugin requereix el següent:"
		],
		[
			"La instalación del plugin requiere lo siguiente:"
		]
	],
	[ // 6
		[
			"Copy the license files together with the js files on your website:<br/>ex:",
			"Copy and/or link the following files in your website in the following order:<br/>ex:",
			"Initialize the plugin once read the DOM:<br/>ex:"
		],
		[
			"Copiar els arxius de les llicències juntament amb els fitxers js en el vostre lloc web:<br/>ex:",
			"Copiar i/o enllaçar els següents arxius en el vostre lloc web respectant l'ordre següent:<br/>ex:",
			"Inicialitzar el plugin un cop llegit el DOM:<br/>ex:"
		],
		[
			"Copiar los archivos de las licencias junto con los ficheros js en vuestro sitio web:<br/>ej:",
			"Copiar y/o enlazar los siguientes archivos en vuestro sitio web respetando el orden siguiente:<br/>ej:",
			"Inicializar el plugin una vez leido el DOM:<br/>ej:"
		]
	],
	[ // 7
		[
			"The initialization of the plugin of the example, with a minimum configuration would be as follows:"
		],
		[
			"La inicialització del plugin de l'exemple, amb una configuració mínima seria com segueix:"
		],
		[
			"La inicialización del plugin del ejemplo, con una configuración mínima sería como sigue:"
		]
	],
	[ // 8
		[
			"The functions javascript used to move the carousel are as follows:"
		],
		[
			"Les funcions javascript utilitzades per moure el carrusel són les següents:"
		],
		[
			"Las funciones javascript utilizadas para mover el carrusel son las siguientes:"
		]
	],
	[ // 9
		[
			"Move right and left. \"n\" indicates the number of items to move and its direction \n\
				(depending on whether it is positive or negative). \"t1\" is the time in milliseconds \n\
				that it will use in the scrolling (def: 600):",
			"Move to a particular item. \"idx\" is the index of the item and \"t1\" the time of the scrolling:",
			"Show and hide controls for scrolling to right and left. The parameters are the scrolling time, \n\
				color (def: rgba(255, 255, 255, .5), highlighted color (def: rgb(255, 255, \n\
				255), size (def: 1em) height (def: 5%) and position (def: right-left 5%):",
			"Show and hide position indicators/selectors:",
			"Random positioning. Similar to moveTo but substituting \"n\" for an internally calculated number at random:"
		],
		[
			"Moure a dreta i esquerra. \"n\" indica el nombre d'items a desplaçar i la seva direcció \n\
				(segons sigui positiu o negatiu). \"t1\" és el temps en milisegons que emprarà en el \n\
				desplaçament (def: 600):",
			"Moure a un ítem determinat. \"idx\" és l'índex de l'ítem i \"t1\" el temps de desplaçament:",
			"Mostrar i amagar controls per al desplaçament a dreta i esquerra. Els paràmetres són el temps \n\
				de desplaçament, color (def: rgba(255, 255, 255, 5), color ressaltat (def: rgb(255, 255, \n\
				255), mida (def: 1em), alçada (def: 5%) i posició (def: right-left 5%):",
			"Mostrar i amagar indicadors/selectors de posició:",
			"Posicionament aleatori. Similar a moveTo però substituint \"n\" per un nombre calculat internament a l'atzar:"
		],
		[
			"Mover a derecha e izquierda. \"n\" indica el número de items a desplazar y su dirección \n\
				(según sea positivo o negativo). \"t1\" es el tiempo en milisegundos que empleará en \n\
				el desplazamiento (def: 600):",
			"Mover a un item determinado. \"idx\" es el índice del item y \"t1\" el tiempo de desplazamiento:",
			"Mostrar y ocultar controles para el desplazamiento a derecha e izquierda. \n\
				Los parámetros son el tiempo de desplazamiento, color (def: rgba(255, 255, \n\
				255, .5), color resaltado (def: rgb(255, 255, 255), tamaño (def: 1em), \n\
				altura (def: 5%) y posición (def: right-left 5%):",
			"Mostrar y ocultar indicadores/selectores de posición:",
			"Posicionamiento aleatorio. Similar a moveTo pero sustituyendo \"n\" por un número \n\
				calculado internamente al azar:"
		]
	],
	[ // 10
		[
			"ANIMATING THE CAROUSEL"
		], 
		[
			"ANIMANT EL CARRUSEL"
		], 
		[
			"ANIMANDO EL CARRUSEL"
		]
	],
	[ // 11
		[
			"element: "
		], 
		[
			"element: "
		], 
		[
			"elemento: "
		]
	],
	[ // 12
		[
			"Parent"
		], 
		[
			"Pare"
		], 
		[
			"Padre"
		]
	],
	[ // 13
		[
			"Animate"
		], 
		[
			"Animar"
		], 
		[
			"Animar"
		]
	],
	[ // 14
		[
			"The javascript functions used to animate the carousel items are as follows:"
		], 
		[
			"Les funcions javascript utilitzades per animar els ítems del carrusel són les següents:"
		], 
		[
			"Las funciones javascript utilizadas para animar los items del carrusel son las siguientes:"
		]
	],
	[ // 15
		[
			'Move the selected item to another DOM item. "ele" is the element where the item \n\
				will be positioned, "t1" the displacement time, "t2" the time that will \n\
				remain in the new location (def: 3000) and "dim" the dimension to which \n\
				the element size ("both", "width" or "Height", default "BOTH") will be adjusted.',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If the permanence time \n\
				at the new location is zero, you will have to call "scaleElementTerminate" to \n\
				return the item to the carousel:',
			'Move the selected item to the parent element of the carousel. "t1" is the displacement \n\
				time, "t2" the permanence time, "dim" the dimension to which the size \n\
				of the element will be adjusted and "overflow" the value of this property for the \n\
				parent element:',
			'Scale the selected item to the width of the carousel. The parameters are "t1", "t2" and "overflow":'
		], 
		[
			'Desplaçar l\'ítem seleccionat fins a un altre element del DOM. "ele" és \n\
				l\'element on es posicionarà l\'ítem, "t1" el temps de desplaçament \n\
				(def: 600), "t2" el temps que romandrà en la nova ubicació (def: 3000) i "dim" \n\
				la dimensió a la qual s\'ajustarà la mida de l\'element ("both", \n\
				"width" o "Height", per defecte "BOTH").',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Si el temps de \n\
				permanència en la nova ubicació és zero, s\'haurà de trucar a \n\
				"scaleElementTerminate" perquè l\'ítem torni al carrusel:',
			'Desplaçar l\'ítem seleccionat fins l\'element pare del carrusel. "t1" és el temps \n\
				de desplaçament, "t2" el de permanencia, "dim" la dimensió a la qual s\'ajustarà \n\
				l\'element i "overflow" el valor d\'aquesta propietat per a l\'element pare:',
			'Escalar l\'ítem seleccionat fins l\'ample del carrusel. Els paràmetres són \n\
				"t1", "t2" y "overflow":'
		], 
		[
			'Desplazar el ítem seleccionado hasta otro elemento del DOM. "ele" es el \n\
				elemento donde se posicionará el ítem, "t1" el tiempo de desplazamiento \n\
				(def: 600), "t2" el tiempo que permanecerá en la nueva ubicación (def: \n\
				3000) y "dim" la dimensión a la que se ajustará el tamaño del elemento  \n\
				("both", "width" o "Height", por defecto "BOTH").',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Si el tiempo de \n\
				permanencia en la nueva ubicación es cero, se tendrá que llamar \n\
				a "scaleElementTerminate" para que el ítem regrese al carrusel:',
			'Desplazar el ítem seleccionado hasta el elemento padre del carrusel. "t1" es el \n\
				tiempo de desplazamiento, "t2" el de permanencia, "dim" la dimensión a la que \n\
				se ajustará el elemento y "overflow" el valor de esta propiedad para el \n\
				elemento padre:',
			'Escalar el ítem seleccionado hasta el ancho del carrusel. Los parámetros son "t1", \n\
				"t2" y "overflow":'
		]
	],
	[ // 16
		[
			"ANIMATING VIDEOS"
		], 
		[
			"ANIMANT VÍDEOS"
		], 
		[
			"ANIMANDO VÍDEOS"
		]
	],
	[ // 17
		[
			"scaleParent parameter",
			"plugin options"
		], 
		[
			"Paràmetre de scaleParent",
			"Opcions del plugin"
		], 
		[
			"Parámetro de scaleParent",
			"Opciones del plugin"
		]
	],
	[ // 18
		[
			"Terminate"
		], 
		[
			"Acabar"
		], 
		[
			"Terminar"
		]
	],
	[ // 19
		[
			"Close"
		], 
		[
			"Tancar"
		], 
		[
			"Cerrar"
		]
	] 
];
function _traducir(c, nt, n, l){
	if(arguments.length===1){
		n=c;
	}else if(arguments.length===3){
		col=c;
		ntxt=nt;
	}else{
		col=c;
		ntxt=nt;
		switch(l) {
			case "CA":
				lang=1;
				break;
			case "ES":
				lang=2;
				break;
			default: /* EN */
				lang=0;
		}
	}
	$.each($(col), function(idx, e){
		if(n<0){
			$(e).html(txt[ntxt][lang][idx]);
		}else
			$(e).html(txt[ntxt][lang][n]);
	});
}
function traducir(l){
	_traducir("#nav_ver li>a", 0, -1, l);
	_traducir("#art_posic>div>p", 1, -1);
	_traducir("#art_posic div.panel legend", 2, 0);
	if($("#art_posic .btn_animation").hasClass("close")){
		_traducir("#art_posic .btn_animation", 19, 0);
	}else
		_traducir("#art_posic .btn_animation", 13, 0);
	
	_traducir("#art_inst>p", 5, 0);
	_traducir("#art_inst div.edit p.comment", 6, -1);
	_traducir("#art_inic>p", 7, 0);
	_traducir("#art_posicfn>p", 8, 0);
	_traducir("#art_posicfn div.edit p.comment", 9, -1);
	_traducir("#art_anim div.panel legend", 10, 0);
	_traducir("#art_anim div.panel div.cls_1>p", 11, 0);
	_traducir("#art_anim div.panel div.cls_1>label:last-of-type>span", 12, 0);
	_traducir("#art_anim div#div_parent h3", 12, 0);
	if($("#art_anim .btn_animation").hasClass("terminate"))
		_traducir("#art_anim button.btn_animation", 18, 0);
	else if($("#art_anim .btn_animation").hasClass("close")){
		_traducir("#art_anim div.panel>.btn_animation", 19, 0);
		_traducir("#art_anim form .btn_animation", 13, 0);
	}else
		_traducir("#art_anim .btn_animation", 13, 0);
	_traducir("#art_animfn>p", 14, 0);
	_traducir("#art_animfn div.edit p.comment", 15, -1);
	_traducir("#art_videos div.panel legend", 16, 0);
	_traducir("#art_videos div.panel fieldset>p", 17, -1);
	if($("#art_videos .btn_animation").hasClass("terminate"))
		_traducir("#art_videos button.btn_animation", 18, 0);
	else if($("#art_videos .btn_animation").hasClass("close")){
		_traducir("#art_videos div#div_parentvideos>.btn_animation", 19, 0);
		_traducir("#art_videos form button.btn_animation", 13, 0);
	}else
		_traducir("#art_videos button.btn_animation", 13, 0);
}
	
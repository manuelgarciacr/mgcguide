/* 
 * The MIT License
 *
 * Copyright (c) 2017 Manuel García Criado.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function($, undefined) {
	// cantidad + unidad
	var re_magnitud = /\s*(\d+\.?\d*|\.\d+)\s*([^\d\s]*)\s*/; 
	// entero
	var re_entero = /\s*(\d+)\.?(\d*).*/; 
	"use strict";
	$.widget("mgc.slider3d", {
		options: {
			items: [],
			videoExtensions: ['WEBM', 'MP4', 'OGG'],
			maxwidth: 0,
			maxheight: 0,
			minwidth: 0,
			minheight: 0,
			width: "",
			height: "",
			perspective: 0,
			responsive: false,
			itemsZindex: "1",
			scaledZindex: "2",
			videoLoop: false,
			videoAutoPlay: true,
			moveComplete: $.noop,
			moveToComplete: $.noop,
			randomComplete: $.noop,
			scaleParentComplete: $.noop,
			scaleElementComplete: $.noop,
			scaleWidthComplete: $.noop,
			scaleParentPaused: $.noop,
			scaleWidthPaused: $.noop,
			scaleElementPaused: $.noop,
			itemClick: $.noop,
			slideClick: $.noop,
			click: $.noop
		}, // options
		wc: 300,
		wu: 'px',
		cntt:  0,
		dif: 0,
		animando: false,
		controls: false,
		indicators: false,
		tIndi: 0,
		colorIndi: "",
		color2Indi: "",
		sizeIndi: 0,
		hIndi: "",
		colorCtrl: 0,
		color2Ctrl: 0,
		valor: 0,
		removingLastItem: 0,
		ap: 0,
		_action: "",
		_action2: "",
		_lastAction: "",
		_dump: function(){
			var d="\n********************************************************\n"+this.element.prop("id")+"\n\n";
			d+=JSON.stringify(this.options, null, 2)+"\n";
			d+="scaleMap: "+JSON.stringify(this.scaleMap, null, 2)+"\n";
			d+="wc: "+this.wc+"\n";
			d+="wu: "+this.wu+"\n";
			d+="cntt: "+this.cntt+"\n";
			d+="dif: "+this.dif+"\n";
			d+="animando: "+this.animando+"\n";
			d+="controls: "+this.controls+"\n";
			d+="indicators: "+this.indicators+"\n";
			d+="tIndi: "+this.tIndi+"\n";
			d+="colorIndi: "+this.colorIndi+"\n";
			d+="color2Indi: "+this.color2Indi+"\n";
			d+="sizeIndi: "+this.sizeIndi+"\n";
			d+="hIndi: "+this.hIndi+"\n";
			d+="colorCtrl: "+this.colorCtrl+"\n";
			d+="color2Ctrl: "+this.color2Ctrl+"\n";
			d+="valor: "+this.valor+"\n";
			d+="newItems: "+JSON.stringify(this.newItems, null, 2)+"\n";
			d+="newInsertedItems: "+JSON.stringify(this.newInsertedItems, null, 2)+"\n";
			d+="removingItems: "+JSON.stringify(this.removingItems, null, 2)+"\n";
			d+="removingLastItem: "+this.removingLastItem+"\n";
			d+="ap: "+this.ap+"\n";
			d+="_action: "+this._action+"\n";
			d+="_action2: "+this._action2+"\n";
			d+="_lastAction: "+this._lastAction+"\n";
			$(document).find("#txt_dump").append(d).select();
		},
		_create: function() {
			var that = this;
			// unstatic properties
			this.scaleMap=new WeakMap(),
			this.newItems=[],
			this.newInsertedItems=[],
			this.removingItems=[],
			this.newReplacedItems=[],
			// End unstatic properties
			this._setOptions({
				'maxheight': this.options.maxheight || 0,
				'maxwidth': this.options.maxwidth || 0,
				'minheight': this.options.minheight || 0,
				'minwidth': this.options.minwidth || 0,
				'responsive': this.options.responsive || false,
				'width': this.options.width || this.element.width() || 700,
				'height': this.options.height || this.element.height() || 300,
				'perspective': this.options.perspective || 1200,
				'itemsZindex': this.options.itemsZindex || "auto",
				'scaledZindex': this.options.scaledZindex || "auto",
				'videoLoop': this.options.videoLoop,
				'videoAutoPlay': this.options.videoAutoPlay
			});
			this.element.css("width", this.wc + "px")
				.css("height", this.hc + "px")
				.css("perspective", this.p + "px")
				.css("-moz-perspective", this.p + "px")
				.css("-webkit-perspective", this.p + "px")
//				.css("display", "inline-block")
				.css("vertical-align", "middle")
				.css("text-align", "center")
				.css("vertical-align", "middle")
				.css("font-size", "inherit");
			this.element.html("<div></div>");
			this.element.children().eq(0)
				.css("margin-top", this.ms + "px")
				.css("width", this.wi + "px")
				.css("height", this.hi + "px")
				.css("display", "inline-block")
				.css("transform-origin", "center center")
				.css("-o-transform-origin", "center center")
				.css("-ms-transform-origin", "center center")
				.css("-moz-transform-origin", "center center")
				.css("-webkit-transform-origin", "center center")
				.css("transform-style", "preserve-3d")
				.css("-moz-transform-style", "preserve-3d")
				.css("-webkit-transform-style", "preserve-3d");
			this.element.append("<p class='mgcslider3dtxt1'></p>");
			this.element.append("<p class='mgcslider3dtxt2'></p>");
			this._setOptions({
				'items': this.options.items
			});
			$(window).resize(function(){
				var resize1 = false;
				var w=that.element.parent().width();
				var h=that.element.parent().height();
				if(!that.element.parent().is(':visible'))
					if(that.element.parent().css('display')==="none"){
						that.element.parent().show();
						w=that.element.parent().width();
						h=that.element.parent().height();
						that.element.parent().hide();
					}else if(that.element.parent().parent().css('display')==="none"){
						that.element.parent().parent().show();
						w=that.element.parent().width();
						h=that.element.parent().height();
						that.element.parent().parent().hide();
					}else if(that.element.parent().parent().parent().css('display')==="none"){
						that.element.parent().parent().parent().show();
						w=that.element.parent().width();
						h=that.element.parent().height();
						that.element.parent().parent().parent().hide();
					}
				if (that.wu === '%' || that.options.responsive)
					if (that.wc !== parseInt(w * that.wp / 100)){
						that.wc = parseInt(w * that.wp / 100);
						resize1 = true;
					}
				if (that.options.responsive)
					if (that.hc !== parseInt(w * that.hp / 100)){
						that.hc = parseInt(w * that.hp / 100);
						resize1 = true;
					}
				if (that.hu === '%')
					if (that.hc !== parseInt(h * that.hp / 100)){
						that.hc = parseInt(h * that.hp / 100);
						resize1 = true;
					}
				if (resize1 && !that.animando){
					that.animando = true;
					resize(that);
					that.animando = false;
				}else{
					that.resize = true;
				}
			});
		}, // _create
		ver: function(){
			console.log(this);
		}, // ver
		_setOptions: function(options) {
			var that = this, resize1 = false;
			$.each(options, function(key, value) {
				that._setOption(key, value);
				if (key === "responsive" || key === "height"
					|| key === "width" || key === "perspective"
					|| key === "maxwidth" || key === "maxheight"
					|| key === "minwidth" || key === "minheight")
					resize1 = true;
			});
			if (resize1 && !that.animando){
				that.animando = true;
				resize(that);
				that.animando = false;
			}else{
				that.resize = true;
			}
		}, // _setOptions
		_setOption: function (key, value) {
			var that = this,
			prev = this.options[key],
			m = [],
			fnMap = {
				'width': function () {
					if ((m = re_magnitud.exec(value)) !== null) {
						that.wc = parseInt(m[1]); 
						that.wu = m[2] || 'px';
					}
					that.wu.toLowerCase();
					var w=that.element.parent().width();
					if(!that.element.parent().is(':visible'))
						if(that.element.parent().css('display')==="none"){
							that.element.parent().show();
							w=that.element.parent().width();
							that.element.parent().hide();
						}else if(that.element.parent().parent().css('display')==="none"){
							that.element.parent().parent().show();
							w=that.element.parent().width();
							that.element.parent().parent().hide();
						}else if(that.element.parent().parent().parent().css('display')==="none"){
							that.element.parent().parent().parent().show();
							w=that.element.parent().width();
							that.element.parent().parent().parent().hide();
						}
					if (that.wu === '%'){
						that.wp = that.wc;
						that.wc = parseInt(w * that.wc / 100);
					} else if (that.wu !== 'px'){
						var e=$("<div>DIV</div>").css("position", "absolute").css("height", "50px").css("width", value).show();
						//that.element.append(e);
						$("html").append(e);
						that.wc = e.width();
						e.remove();
					}
					if (that.options.responsive && that.wu !== '%')
						that.wp = parseInt(that.wc * 100 / w);
					// wu: Unidad del ancho
					// wc: Ancho en pixeles
					// wp: Ancho en % del ancho del padre si wu=% o responsive
				}, // width
				'height': function () {
					if ((m = re_magnitud.exec(value)) !== null) {
						that.hc = parseInt(m[1]);
						that.hu = m[2] || 'px';
					}
					that.hu.toLowerCase();
					var w=that.element.parent().width();
					var h=that.element.parent().height();
					if(!that.element.parent().is(':visible'))
						if(that.element.parent().css('display')==="none"){
							that.element.parent().show();
							w=that.element.parent().width();
							h=that.element.parent().height();
							that.element.parent().hide();
						}else if(that.element.parent().parent().css('display')==="none"){
							that.element.parent().parent().show();
							w=that.element.parent().width();
							h=that.element.parent().height();
							that.element.parent().parent().hide();
						}else if(that.element.parent().parent().parent().css('display')==="none"){
							that.element.parent().parent().parent().show();
							w=that.element.parent().width();
							h=that.element.parent().height();
							that.element.parent().parent().parent().hide();
						}
					if (that.hu === '%'){
						that.hp = that.hc;
						that.hc = parseInt(h * that.hc / 100);
					} else if (that.hu !== 'px'){
						var e=$("<div>DIV</div>").css("position", "absolute").css("width", "50px").css("height", value).show();
						that.element.append(e);
						that.hc = e.height();
						e.remove();
					}
					if (that.options.responsive) // Se redimensiona por la anchura del elemento padre
						that.hp = parseInt(that.hc * 100 / w);
					// hu: Unidad del alto
					// hc: Alto en pixeles
					// hp: Alto en % del ancho del padre si responsive o en % del alto del padre si hu=%
				}, // height
				'responsive': function() {
					if(value===true || (typeof value==='string' && value.toUpperCase()==="TRUE"))
						value=true;
					else
						value=false;
					if (value && that.wu !== '%')
						that.wp = parseInt(that.wc * 100 / that.element.parent().width());
					if (value) // Se redimensiona por la anchura del elemento padre
						that.hp = parseInt(that.hc * 100 / that.element.parent().width());
					else
						if(that.hu === '%')
							that.hp=parseInt(that.hc * 100 / that.element.parent().height());
				}, // responsive
				'perspective': function () {
					if ((m = re_entero.exec(value)) !== null)
						that.p = parseInt(m[1] + m[2]);
				}, // perspective
				'items': function () {
					createItems(value, that);
				}, // items
				'videoLoop': function () {
					if(value===true || (typeof value==='string' && value.toUpperCase()==="TRUE"))
						value=true;
					else
						value=false;
					that.options.videoLoop=value;
				}, // videoLoop
				'videoAutoPlay': function () {
					if(value===true || (typeof value==='string' && value.toUpperCase()==="TRUE"))
						value=true;
					else
						value=false;
					that.options.videoAutoPlay=value;
				} // videoAutoPlay
			};
			this._super(key, value);
			if (key in fnMap) {
				fnMap[key]();
				this._trigger('optionChanged', {type: 'optionChanged'}, {
					option: key,
					previous: prev,
					current: value
				});
			}
		}, // _setOption
		_toRadianes: function (angle) {
			return angle * (Math.PI / 180);
		}, // _toRadianes
		_desbloqueo: function(){
			this.animando = false;
			if (this.replaceitems){
				this.animando = true;
				this._replaceItems();
				this.animando = false;
			}
			if (this.insertitems){
				this.animando = true;
				this._insertItems();
				this.animando = false;
			}
			if (this.additems){
				this.animando = true;
				this._addItems();
				this.animando = false;
			}
			if (this.removeitems){
				this.animando = true;
				this._removeItems();
				this.animando = false;
			}
			if (this.removelastitem){
				this.animando = true;
				this._removeLastItem();
				this.animando = false;
			}
			if (this.resize){
				this.animando = true;
				resize(this);
				this.animando = false;
			}
			if (this._action === "move"){
				this._action = "";
				this._trigger("moveComplete");
			} else if (this._action === "moveTo"){
				this._action = "";
				this._trigger("moveToComplete");
			} else if (this._action === "random"){
				this._action = "";
				this._trigger("randomComplete");
			} else if (this._action === "scaleElement"){
				this._action = "";
				this._trigger("scaleElementComplete");
			} else if (this._action === "scaleParent"){
				this._action = "";
				this._trigger("scaleParentComplete");
			} else if (this._action === "scaleWidth"){
				this._action = "";
				this._trigger("scaleWidthComplete");
			}
		}, // _desbloqueo
		showIndicators: function(t, color, color2, size, h){
			if(this.indicators)
				return;
			if ((typeof t === 'undefined') || (t === null) || isNaN(t))
				t = 600;
			if ((typeof color === 'undefined') || (color === null))
				color = "rgba(255, 255, 255, .5)";
			if ((typeof color2 === 'undefined') || (color2 === null))
				color2 = "rgb(255, 255, 255)";
			if ((typeof size === 'undefined') || (size === null))
				size = ".8em";
			if ((typeof h === 'undefined') || (h === null))
				h = "5%";
			this.tIndi=t;
			this.colorIndi=color;
			this.color2Indi=color2;
			this.sizeIndi=size;
			this.hIndi=h;
			this._showIndicators();
			this.indicators=true;
		}, // showIndicators
		_showIndicators: function(){
			if(this.indicators)
				this.element.find("span.mgcslider3dIndi").remove();
			var ind="";
			for(i=0; i<this.c; i++)
				ind+="<input type='radio' name='indicators' value='"+i+"'/>";
			ind = $("<span class='mgcslider3dIndi'>"+ind+"</span>");
			this.element.append(ind);
			ind.css("margin", '0 auto').css("position", "absolute")
				.css("bottom", this.hIndi).css("left", 0).css("right", 0)
				.css("z-index", "1");
			ind.find("input").css("-ms-appearance", "none").css("-moz-appearance", "none")
				.css("-webkit-appearance", "none").css("appearance", "none")
				.css("border-radius", "50%").css("width", this.sizeIndi).css("height", this.sizeIndi)
				.css("border", "3px transparent").css("outline", "none")
				.css("border-color", this.colorIndi).css("background-color", this.colorIndi)
				.css("cursor", "pointer").css("font-size", "inherit");
			this.element.css("text-align", 'center');
			ind.find("input:nth-of-type("+(this.valor+1)+")").prop("checked", true)
				.css("border", "solid "+this.colorIndi).css("background-color", "black");
			var that=this;
			ind.find('input').change(function() {
				if(that.animando){
					if(ind.find("input:checked").index() !== that.valor)
						ind.find("input:nth-of-type("+(that.valor+1)+")").prop("checked", true);
					else{
						ind.find("input").css("border-color", "transparent")
							.css("background-color", that.colorIndi);
						ind.find("input:checked").css("border", "solid "+that.colorIndi)
							.css("background-color", "black");
					}
				}else{
					ind.find("input").css("border-color", "transparent")
						.css("background-color", that.colorIndi);
					ind.find("input:checked").css("border", "solid "+that.colorIndi)
						.css("background-color", "black");
					that.moveTo(ind.find("input:checked").index(), that.tIndi);
				}
			});
			ind.find("input").hover(function(){
				$(this).css("background-color", that.color2Indi);
			}, function(){
				if($(this).prop("checked"))
					$(this).css("background-color", "black");
				else
					$(this).css("background-color", that.colorIndi);
			});
		}, // _showIndicators
		hideIndicators: function(){
			this.element.find("span.mgcslider3dIndi").remove();
			this.indicators=false;
		}, // hideControls
		showControls: function(t, color, color2, size, h, p){
			if(this.controls)
				return;
			if ((typeof t === 'undefined') || (t === null) || isNaN(t))
				t = 600;
			if ((typeof color === 'undefined') || (color === null))
				color = "rgba(255, 255, 255, .5)";
			if ((typeof color2 === 'undefined') || (color2 === null))
				color2 = "rgb(255, 255, 255)";
			if ((typeof size === 'undefined') || (size === null))
				size = "1em";
			if ((typeof h === 'undefined') || (h === null))
				h = "5%";
			if ((typeof p === 'undefined') || (p === null))
				p = "5%";
			this.colorCtrl=color;
			this.color2Ctrl=color2;
			var der = $('<span class="mgcslider3d">&gt;</span>');
			var izq = $('<span class="mgcslider3d">&lt;</span>');
			this.element.append(der).append(izq);
			der.css('right', p).css("position", "absolute")
				.css("color", color).css("bottom", h)
				.css("font-size", size).css('font-weight', 900)
				.css("font-family", "'Varela Round', sans-serif")
				.css("cursor", "pointer").css("z-index", "2");
			izq.css('left', p).css("position", "absolute")
				.css("color", color).css("bottom", h)
				.css("font-size", size).css('font-weight', 900)
				.css("font-family", "'Varela Round', sans-serif")
				.css("cursor", "pointer").css("z-index", "2");
			var that=this;
			this.element.find("span.mgcslider3d").hover(function(){
				$(this).css("color", that.color2Ctrl);
			}, function(){
				$(this).css("color", that.colorCtrl);
			});
			der.click(function(){
				that.move(1, t);
			});
			izq.click(function(){
				that.move(-1, t);
			});
			this.controls=true;
		}, // showControls
		hideControls: function(){
			this.element.find("span.mgcslider3d").remove();
			this.controls=false;
		}, // hideControls
		totalCount: function(){
			return this.c;
		}, // totalCount
		itemsCount: function(){
			return this.ci + this.newItems.length - this.removingLastItem - this.removingItems.length;
		}, // itemsCount
		animating: function(){
			return this.animando;
		}, // animating
		random: function(t){
			if (this.animando) 
				return;
			if ((typeof t === 'undefined') || (t === null) || isNaN(t) || t <= 0)
				t = 600;
			this.animando = true;
			this._action = "random";
			t = parseInt(t);
			var nv, n;
			while ((nv = Math.floor(Math.random() * this.c)) === this.valor){}; // Busca un nuevo valor
			if (this.si.eq(this.valor).data("gr") <= 0) // Predominaron los giros a la izquierda o inmóvil
				for (n = 0; (this.valor + n < 0 ? this.valor + n + this.c : this.valor + n) !== nv; n--); // Iré hasta el nuevo valor nv girando hacia la derecha
			else
				for (n = 0; (this.valor + n >= this.c ? this.valor + n - this.c : this.valor + n) !== nv; n++);
			this._move(n, t);
		}, // random
		moveTo: function(n, t){
			if (this.animando || typeof n === 'undefined' || isNaN(n))
				return;
			n=parseInt(n);
			if (n === this.valor || n >= this.c)
				return;
			if (typeof t === 'undefined' || (t===null) || 
				isNaN(t) || t < 0)
				t=600;
			this.animando = true;
			this._action = "moveTo";
			t = parseInt(t);
			if (t === 0) 
				t = 1;
			var nm;
			if (this.si.eq(this.valor).data("gr") <= 0) // Predominaron los giros a la izquierda o inmóvil
				for (nm = 0; (this.valor + nm < 0 ? this.valor + nm + this.c : this.valor + nm) !== n; nm--){
				} // Iré hasta el nuevo valor nv girando hacia la derecha
			else
				for (nm = 0; (this.valor + nm >= this.c ? this.valor + nm - this.c : this.valor + nm) !== n; nm++);
			this._move(nm, t);
		}, // moveTo
		value: function(){
			return this.valor;
		}, // value
		move: function(n, t){
			if (this.animando || typeof n === 'undefined' || isNaN(n) ||
				n===0)
				return;
			if (typeof t === 'undefined' || (t===null) ||
				isNaN(t) || t < 0) 
				t=600;
			this.animando = true;
			this._action = "move";
			n = parseInt(n);
			t = parseInt(t);
			this._move(n, t);
		}, // move
		_move: function(n, t){
			this.element.find("p.mgcslider3dtxt1").hide();
			this.element.find("p.mgcslider3dtxt2").hide();
			if (this.si.eq(this.valor).prop("tagName") === "VIDEO"){
				this.si.eq(this.valor).get(0).pause();
				this.si.eq(this.valor).get(0).loop = false;
				this.si.eq(this.valor).get(0).currentTime = 0;
			}
			if (n > 0)
				this._move01(1, t / n, n, t);
			else if (n < 0){
				n *= - 1;
				this._move01( - 1, t / n, n, t);
			} else{
				txt1=this.si.eq(this.valor).data("txt1")||"";
				txt1css=this.si.eq(this.valor).data("txt1css")||";";
				txt2=this.si.eq(this.valor).data("txt2")||"";
				txt2css=this.si.eq(this.valor).data("txt2css")||";";
				var deg=this.si.eq(this.valor).data("gr");
				this.si.eq(this.valor).css({"transform": "rotatey(" + deg + "deg) translatez(" + (this.ap+5) + "px)"});
				this.element.find("p.mgcslider3dtxt1").html(txt1).attr("style", txt1css)
					.css("z-index", (parseInt(this.options.itemsZindex) + 1))
					.css("transform", "translatez(" + (this.ap+6) + "px)");
				this.element.find("p.mgcslider3dtxt2").html(txt2).attr("style", txt2css)
					.css("z-index", (parseInt(this.options.itemsZindex) + 1))
					.css("transform", "translatez(" + (this.ap+6) + "px)");
				this.element.find("p.mgcslider3dtxt1").show(1000);
				this.element.find("p.mgcslider3dtxt2").show(1000);
				this._desbloqueo();
			}
		}, // _move
		_move01: function(n, t, n1, t1){ // Gira 1 a derecha o izquierda
			var valor = this.valor;
			var valor_ini = valor;
			var that = this;
			var terminado = 0;
			valor += n;
			if (valor >= this.c) 
				valor = 0; 
			else if (valor < 0) 
				valor = this.c - 1;
			this.valor = valor;
			// ...for
			for (var i = 0; i < this.c; i++){
				var deg = 0;
				if (n < 0 && (i < 3 || i > (this.c - 4)))
					deg = 60;
				if (n > 0 && (i < 4 || i > (this.c - 3)))
					deg = - 60;
				var ind = valor_ini + i;
				if (ind >= this.c) 
					ind -= this.c;
				var desp = parseFloat(this.si.eq(ind).data("gr"));
				this.si.eq(ind).css("word-spacing", desp);
				deg += desp;
				this.si.eq(ind).data("gr", deg);
				// ...animate
				this.si.eq(ind).animate({
					'word-spacing': deg
				}, {
					step: function (now, fx) {
						$(this).css({"transform": "rotatey(" + now + "deg) translatez(" + that.ap + "px)"});
					},
					duration: t,
					easing: 'linear',
					queue: false,
					complete: function () {
						if(that.indicators){
							that.element.find("span.mgcslider3dIndi").find("input:nth-of-type("+(that.valor+1)+")").prop("checked", true).trigger("change");
						}
						if (++terminado === that.c){
							that._move(parseInt(n * (--n1)), t1 - t);
						}
					}
				}); // ...animate
			} // ...for
		}, // _move01
		scaleElement: function(ele, t, t2, dim){
			if (this.animando || typeof ele !== 'object') 
				return;
			if (typeof t === 'undefined' || (t===null) ||
				isNaN(t) || t<0) 
				t=600;
			if (typeof t2 === 'undefined' || (t2===null) ||
				isNaN(t2) || t2<0) 
				t2=3000;
			if ((typeof dim === 'undefined') || (dim === null))
				dim = "";
			this.animando = true;
			this._action = "scaleElement";
			this._scaleElement(ele, t, t2, dim, "hidden", false);
		}, // scaleElement
		scaleParent: function(t, t2, dim, overflow){
			if (this.animando) 
				return;
			if (typeof t === 'undefined' || (t===null) ||
				isNaN(t) || t<0) 
				t=600;
			if (typeof t2 === 'undefined' || (t2===null) ||
				isNaN(t2) || t2<0) 
				t2=3000;
			if ((typeof dim === 'undefined') || (dim === null))
				dim = "";
			if ((typeof overflow === 'undefined') || (overflow === null))
				overflow = "hidden";
			this.animando = true;
			this._action = "scaleParent";
			this._scaleElement(this.element.parent(), t, t2, dim, overflow, false);
		}, // scaleParent
		scaleWidth: function(t, t2, overflow){
			if (this.animando) 
				return;
			if (typeof t === 'undefined' || (t===null) ||
				isNaN(t) || t<0) 
				t=600;
			if (typeof t2 === 'undefined' || (t2===null) ||
				isNaN(t2) || t2<0) 
				t2=3000;
			if ((typeof overflow === 'undefined') || (overflow === null))
				overflow = "hidden";
			this.animando = true;
			this._action = "scaleWidth";
			this._scaleElement(this.element, t, t2, "Width", overflow, true);
		}, // scaleWidth
		_scaleElement: function(ele, t, t2, dim, overflow, scaleOnly){
			if (((dim = dim.toUpperCase()) === "BOTH"))
				dim = "";
			// ...scaleMap
			this.scaleMap.set(this, {
				t: parseInt(t), t2: parseInt(t2), cnt: 0, ts: 0, ls: 0, wnow: 1, hnow: 1,
				eli: this.si.eq(this.valor),
				dim: dim.toUpperCase(),
				overflow: overflow,
				scaleOnly: scaleOnly,
				that: this,
				elf: ele,
				calcTopLeft: function(n){
					// Calcular new Top
					if (!this.scaleOnly){
						this.cnt += n;
						tcln = this.cln.offset().top;
						tf = this.elf.offset().top;
						this.ts1 = tf + (tcln - tf) - ((tcln - tf) / this.nii * this.cnt);
						// Calcular new Left
						lcln = this.cln.offset().left;
						lf = this.elf.offset().left + parseInt(this.elf.css('padding-left'));
						this.ls1 = lf + (lcln - lf) - ((lcln - lf) / this.nii * this.cnt);
						return this;
					}
				}, // calcTopLeft
				inc: function(){
					this.wnow += this.wvali;
					this.hnow += this.hvali;
					this.calcTopLeft(1);
					this.ni--;
					return this;
				}, // inc
				dec: function(){
					this.wnow -= this.wvali;
					this.hnow -= this.hvali;
					this.calcTopLeft( - 1);
					this.ni--;
					if (this.ni === 0){
						this.wnow = 1;
						this.hnow = 1;
					}
					return this;
				}, // dec
				init: function() {
					this.ni = this.nii;
					hf = this.elf.height();
					hs = hf / this.cln.height();
					wf = this.elf.width();
					ws = wf / this.cln.width();
					this.wvali = (ws - 1) / this.nii;
					this.hvali = (hs - 1) / this.nii;
					if (this.dim === "HEIGHT")
						this.wvali = this.hvali;
					else if (this.dim === "WIDTH")
						this.hvali = this.wvali;
					return this;
				}, // init
				end: function(){
					if (this.overflow !== "")
						$(this.elf).css("overflow", this.oldOverflow);
					this.cln.remove();
					$(this.eli).attr("z-index", this.that.options.itemsZindex);
				}, // end
				initi: function(){
					while((this.nii = Math.round(this.t++ / 1000 * 25))===0) {};
					this.segi = Math.round(this.t / this.nii);
					this.cln = $(this.eli).clone(true).css('z-index', '0').appendTo($(this.eli).parent());
					if (this.overflow !== ""){
						this.oldOverflow = $(this.elf).css("overflow");
						$(this.elf).css("overflow", this.overflow);
					}
					$(this.eli).attr("z-index", this.that.options.scaledZindex);
					this.init();
					delete this.initi;
					return this;
				} // initi
			}).get(this).initi(); // ...scaleMap
			this._delay(function(){this._scaleElement00(); }, this.scaleMap.get(this).segi);
		}, // _scaleElement
		_scaleElement00: function(){
			_ = this.scaleMap.get(this).inc();
			that=this;
			$(_.eli).css({"transform": "translate(" + _.ls + "px, " + _.ts + "px) scale(" + _.wnow + ", " + _.hnow + ") translatez(" + (this.ap + 5) + "px) rotatey(" + parseFloat($(_.eli).data("gr")) + "deg)"});
			if (!_.scaleOnly){
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
				this._buscaAprox(_);
			}
			// ...if(_.ni)
			if (_.ni){
				this._delay(function(){this._scaleElement00(); }, _.segi);
			}else{
				var t2 = _.t2;
				var ele = $(this.si.eq(this.valor).get(0));
				if (t2 === 0){
					if (ele.prop("tagName") === "VIDEO"){
						ele.get(0).loop = false;
						if(typeof ele.data("videoloop")!=="undefined"){
							if(ele.data("videoloop")===true)
								ele.get(0).loop = true;
						}else
							if(this.options.videoLoop)
								ele.get(0).loop = true;
						if(typeof ele.data("videoautoplay")!=="undefined"){
							if(ele.data("videoautoplay")===true)
								ele.get(0).play();
						}else
							if(this.options.videoAutoPlay)
								ele.get(0).play();
//						if (parseInt(ele.data("time")) > 0){
//							setTimeout(function(){
//								ele.get(0).pause(); 
//								ele.get(0).currentTime = 0;
//							},parseInt(ele.data("time")));
//						}else{
//							ele.on("ended", function(){
//								ele.get(0).currentTime = 0;
//							})
//						}
						if (parseInt(ele.data("time")) > 0){
							if(ele.get(0).loop)
								var PID=setInterval(function(){
									ele.get(0).pause(); 
									ele.get(0).currentTime = 0;
									if(that.animando)
										ele.get(0).play();
									else
										clearInterval(PID);
								}, parseInt(ele.data("time")));
							else
								setTimeout(function(){
									ele.get(0).pause(); 
									ele.get(0).currentTime = 0;
								},parseInt(ele.data("time")));
						}
						ele.on("ended", function(){
							ele.get(0).currentTime = 0;
						});
					}
					this._delay(function(){
						this._action2="terminate";
						if(this._action==="scaleElement")
							this._trigger("scaleElementPaused");
						else if(this._action==="scaleParent")
							this._trigger("scaleParentPaused");
						else if(this._action==="scaleWidth")
							this._trigger("scaleWidthPaused");
					}, 2); 
				} else{
					if (ele.prop("tagName") === "VIDEO"){
						ele.get(0).loop = false;
						var play=false;
						if(typeof ele.data("videoautoplay")!=="undefined"){
							if(ele.data("videoautoplay")===true)
								play=true;
						}else
							if(this.options.videoAutoPlay)
								play=true;
						if(play){
							ele.get(0).play();
							if (parseInt(ele.data("time")) > 0)
								t2 = parseInt(ele.data("time"));
							else
								t2 = ele.get(0).duration * 1000;
						}
					}
					this._delay(function(){this._scaleElement02(); }, t2);
				}
			} // ...if(_.ni)
		}, // _scaleElement00
		_buscaAprox: function(_){
			if (_.eli.offset().top > _.ts1)
				this._aproxElem(_, - .1, 0,	function(_){
					return _.eli.offset().top > _.ts1; 
				});
			else if (_.eli.offset().top < _.ts1)
				this._aproxElem(_, .1, 0, function(_){
					return _.eli.offset().top < _.ts1; 
				});
			if (_.eli.offset().left > _.ls1)
				this._aproxElem(_, 0, - .1,	function(_){
					return _.eli.offset().left > _.ls1; 
				});
			else if (_.eli.offset().left < _.ls1)
				this._aproxElem(_, 0, .1, function(_){
					return _.eli.offset().left < _.ls1; 
				});
		}, // _buscaAprox
		_aproxElem: function(_, t, l, cnd){
			do{
				_.ts += t;
				_.ls += l;
				$(_.eli).css({"transform": "translate(" + _.ls + "px, " + _.ts + "px) scale(" + _.wnow + ", " + _.hnow + ") translatez(" + (this.ap + 5) + "px) rotatey(" + parseFloat($(_.eli).data("gr")) + "deg)"});
			}while (cnd(_));
		}, // _aproxElem
		scaleElementTerminate: function(){
			if (!this.animando || this._action !== 'scaleElement'
				|| this._action2 !== 'terminate') 
				return;
			this._action2="";
			this._scaleElement02();
		}, // scaleElementTerminate
		scaleParentTerminate: function(){
			if (!this.animando || this._action !== 'scaleParent'
				|| this._action2 !== 'terminate') 
				return;
			this._action2="";
			this._scaleElement02();
		}, // scaleParentTerminate
		scaleWidthTerminate: function(){
			if (!this.animando || this._action !== 'scaleWidth'
				|| this._action2 !== 'terminate') 
				return;
			this._action2="";
			this._scaleElement02();
		}, // scaleParentTerminate
		_scaleElement02: function () {
			this._action2="";
			if (this.si.eq(this.valor).prop("tagName") === "VIDEO"){
				this.si.eq(this.valor).get(0).pause();
				this.si.eq(this.valor).get(0).loop = false;
				this.si.eq(this.valor).get(0).currentTime = 0;
			}
			// ..._delay
			this._delay(function(){
				this._scaleElement03(); 
			}, this.scaleMap.get(this).init().segi); // ..._delay
		}, // _scaleElement02
		_scaleElement03: function(){
			_ = this.scaleMap.get(this).dec();
			$(_.eli).css({"transform": "translate(" + _.ls + "px, " + _.ts + "px) scale(" + _.wnow + ", " + _.hnow + ") translatez(" + (this.ap + 5) + "px) rotatey(" + parseFloat($(_.eli).data("gr")) + "deg)"});
			if (!_.scaleOnly){
				this._buscaAprox(_);
				this._buscaAprox(_);
			}
			if (_.ni) 
				// ..._delay
				this._delay(function(){
					this._scaleElement03(); 
				}, _.segi); // ..._delay
			else {
				_.end(); 
				var deg = this.si.eq(this.valor).data("gr");
				this.si.eq(this.valor).css("transform", "rotatey(" + deg + "deg) translatez(" + (this.ap+5) + "px)");
				this._desbloqueo(); 
			};
		}, // _scaleElement03
		removeLastItem: function(){
			this.removingLastItem++;
			if (!this.animando){
				this.animando = true;
				this._removeLastItem();
				this.animando = false;
			} else{
				this.removelastitem = true;
			}
		}, // removeLastItem
		removeItems: function(items){
			var that = this;
			if ($.type(items) === "array")
				$.each(items, function(idx, value){
					if ($.type(value) === "number")
						that.removingItems.push(parseInt(value));
				});
			else if ($.type(items) === "number")
				this.removingItems.push(parseInt(items));
			if (!this.animando){
				this.animando = true;
				this._removeItems();
				this.animando = false;
			} else{
				this.removeitems = true;
			}
		}, // removeItems
		addItems: function(items){
			var that = this;
			if ($.type(items) === "array")
				$.each(items, function(idx, value){
					if ($.type(value) === "object")
						that.newItems.push(value);
				});
			else if ($.type(items) === "object")
				this.newItems.push(items);
			if (this.newItems.length > 0){
				if (!this.animando){
					this.animando = true;
					this._addItems();
					this.animando = false;
				} else{
					this.additems = true;
				}
			}
		}, // addItems
		insertItems: function(n, items){
			var that = this;
			if ($.type(n) === "number" && n>=0){
				n=parseInt(n);
				if ($.type(items) === "array")
					$.each(items, function(idx, value){
						if ($.type(value) === "object")
							that.newInsertedItems.push([n++, value]);
					});
				else if ($.type(items) === "object")
					that.newInsertedItems.push([n, items]);
			}
			if (this.newInsertedItems.length > 0){
				if (!this.animando){
					this.animando = true;
					this._insertItems();
					this.animando = false;
				} else{
					this.insertitems = true;
				}
			}
		}, // insertItems
		replaceItems: function(n, items){
			var that = this;
			if ($.type(n) === "number" && n>=0){
				n=parseInt(n);
				if ($.type(items) === "array")
					$.each(items, function(idx, value){
						if ($.type(value) === "object")
							that.newReplacedItems.push([n++, value]);
					});
				else if ($.type(items) === "object")
					that.newReplacedItems.push([n, items]);
			}
			if (this.newReplacedItems.length > 0){
				if (!this.animando){
					this.animando = true;
					this._replaceItems();
					this.animando = false;
				} else{
					this.replaceitems = true;
				}
			}
		}, // insertItems
		_removeLastItem: function(){
			this.removelastitem = false;
			do{
				if (this.options.items.length < 2)
					break;
				this.options.items.splice(--this.ci, 1);
			}while (--this.removingLastItem);
			createItems(this.options.items, this);
		}, // _removeLastItem
		_removeItems: function(){
			this.removeitems = false;
			this.removingItems = this.removingItems.sort(function(a, b){return b - a; });
			var that = this;
			var ant = - 1;
			// ...each
			$.each(this.removingItems, function(idx, item){
				if (that.options.items.length < 2)
					return false;
				if (item < that.ci && item !== ant){
					that.options.items.splice(item, 1);
					that.ci--;
				}
				ant = item;
			}); // ...each
			this.removingItems=[];
			createItems(this.options.items, this);
		}, // _removeItems
		_addItems: function(){
			this.additems = false;
			this.options.items = this.options.items.concat(this.newItems);
			this.newItems = [];
			createItems(this.options.items, this);
		}, // _addItems
		_insertItems: function(){
			that=this;
			this.insertitems = false;
			var newopt = [], inserted=false;
			$.each(this.newInsertedItems, function(idx, arr){
				inserted=false;
				$.each(that.options.items, function(idx2, item){
					if(idx2===arr[0]){
						newopt.push(arr[1]);
						inserted=true;
					}
					newopt.push(item);
				});
				if(!inserted)
					newopt.push(arr[1]);
				that.options.items=newopt;
				newopt=[];
			});
			this.newInsertedItems=[];
			createItems(this.options.items, this);
		}, // _insertItems
		_replaceItems: function(){
			that=this;
			this.replaceitems = false;
			var newopt = [], replaced=false;
			$.each(this.newReplacedItems, function(idx, arr){
				replaced=false;
				$.each(that.options.items, function(idx2, item){
					if(idx2===arr[0]){
						newopt.push(arr[1]);
						replaced=true;
					}else
						newopt.push(item);
				});
				if(!replaced)
					newopt.push(arr[1]);
				that.options.items=newopt;
				newopt=[];
			});
			this.newReplacedItems=[];
			createItems(this.options.items, this);
		} // _replaceItems
	});
	function createItems(items, that) {
		var container = that.element.children().eq(0);
		container.empty();
		that.c = 0;
		that.ci = items.length;
		that.ns = 0;
		do{
			$.each(items, function (idx, item) {
				if ($.inArray(item.src.split('.').pop().toUpperCase(), that.options.videoExtensions) >= 0){
					var ele = $("<video id='sld" + (that.ns * that.ci + idx) + "' loop style='background-color: black'>Your browser does not support the video tag.</video>");
					$(ele).on('click', { value: (that.ns * that.ci + idx) }, that.options.slideClick);
					$.each(item, function(idx2, attr){
						if(idx2==="property")
							ele.prop(attr, true);
						else
							ele.attr(idx2, attr);
					});
				} else{
					var ele = $("<img id='sld" + (that.ns * that.ci + idx) + "' />");
					$(ele).on('click', { value: (that.ns * that.ci + idx)  }, that.options.slideClick);
					$.each(item, function(idx2, attr){
						ele.attr(idx2, attr);
					});
				}
				container.append(ele);
			});
			that.c += items.length;
			that.ns += 1;
		}while (that.c < 6);
		styleItems(that);
	} // createItems
	function styleItems2(that){
		var si = that.element.children().eq(0).children();
		si.css("width", "100%")
			.css("height", "100%")
			.css("display", "block")
			.css("position", "absolute")
			.css("z-index", that.options.itemsZindex)
			.css("backface-visibility", "hidden")
			.css("-moz-backface-visibility", "hidden")
			.css("-webkit-backface-visibility", "hidden");
		var deg = 0;
		for (var i = 0; i < that.c; i++){
			if (i < 4 || i > that.c - 3){
				si.eq(i).data("gr", deg);
				si.eq(i).css("opacity", 1);
				if(i===0){
					txt1=si.eq(i).data("txt1")||"";
					txt1css=si.eq(i).data("txt1css")||";";
					txt2=si.eq(i).data("txt2")||"";
					txt2css=si.eq(i).data("txt2css")||";";
					si.eq(i).css("transform", "rotatey(" + deg + "deg) translatez(" + (that.ap+5) + "px)");
					that.element.find("p.mgcslider3dtxt1").html(txt1).attr("style", txt1css)
						.css("z-index", (parseInt(that.options.itemsZindex) + 1))
						.css("transform", "translatez(" + (that.ap+6) + "px)");
					that.element.find("p.mgcslider3dtxt2").html(txt2).attr("style", txt2css)
						.css("z-index", (parseInt(that.options.itemsZindex) + 1))
						.css("transform", "translatez(" + (that.ap+6) + "px)");
				}else{
					si.eq(i).css("transform", "rotatey(" + deg + "deg) translatez(" + that.ap + "px)");
				}	
				deg += 60;
			} else{
				si.eq(i).data("gr", deg - 60);
				si.eq(i).css("opacity", 1);
				si.eq(i).css("transform", "rotatey(" + (deg - 60) + "deg) translatez(" + that.ap + "px)");
			}
		};
		that.si = si;
		that.valor = 0;
	}; // styleItems
	function styleItems(that){
		var si = that.element.children().eq(0).children();
		si.css("width", "100%")
			.css("height", "100%")
			.css("display", "block")
			.css("position", "absolute")
			.css("z-index", that.options.itemsZindex)
			.css("backface-visibility", "hidden")
			.css("-moz-backface-visibility", "hidden")
			.css("-webkit-backface-visibility", "hidden");
		var deg = 0, n = that.valor;
		for (var i = 0; i < that.c; i++){
			if (i < 4 || i > that.c - 3){
				si.eq(n).data("gr", deg).css("opacity", 1);
				if(i===0){
					txt1=si.eq(n).data("txt1")||"";
					txt1css=si.eq(n).data("txt1css")||";";
					txt2=si.eq(n).data("txt2")||"";
					txt2css=si.eq(n).data("txt2css")||";";
					si.eq(n).css("transform", "rotatey(" + deg + "deg) translatez(" + (that.ap+5) + "px)");
					that.element.find("p.mgcslider3dtxt1").html(txt1).attr("style", txt1css)
						.css("z-index", (parseInt(that.options.itemsZindex) + 1))
						.css("transform", "translatez(" + (that.ap+6) + "px)");
					that.element.find("p.mgcslider3dtxt2").html(txt2).attr("style", txt2css)
						.css("z-index", (parseInt(that.options.itemsZindex) + 1))
						.css("transform", "translatez(" + (that.ap+6) + "px)");
				}else{
					si.eq(n).css("transform", "rotatey(" + deg + "deg) translatez(" + that.ap + "px)");
				}	
				deg += 60;
			} else{
				si.eq(n).data("gr", deg - 60);
				si.eq(n).css("opacity", 1);
				si.eq(n).css("transform", "rotatey(" + (deg - 60) + "deg) translatez(" + that.ap + "px)");
			}
			n++;
			if(n>=that.c)
				n=0;
		};
		that.si = si;
		if(that.indicators)
			that._showIndicators();
	}; // styleItems
	function resize(that){
		that.resize = false;
		if (that.options.maxwidth > 0 && that.options.maxwidth < that.wc){
			that.wc = parseInt(that.options.maxwidth);
		}
		if ((that.options.maxheight > 0) && (that.options.maxheight < that.hc)){
			that.hc = parseInt(that.options.maxheight);
		}
		if (that.options.minwidth > 0 && that.options.minwidth > that.wc){
			that.wc = parseInt(that.options.minwidth);
		}
		if (that.options.minheight > 0 && that.options.minheight > that.hc){
			that.hc = parseInt(that.options.minheight);
		}
		// Ángulo a=60, lados n=6, radio=lado=ancho/2 wi, apotema ap
		that.wi = that.wc / 2;
		that.wi = parseFloat(that.wi.toFixed(5));
		that.ap = Math.sqrt((that.wc * that.wc - that.wi * that.wi) / 4);
		//var ap=wi / (2 * Math.tan(this._toRadianes(30)));
		that.ap = Math.ceil(parseFloat(that.ap.toFixed(5))); // Apotema
		/*
		 var myElement = this.element.parent()[0],
		 myResizeFn = function(){
		 alert('Resize');
		 };
		 addResizeListener(myElement, myResizeFn);*/
		
		that.hi = that.hc * (that.p - that.ap) / that.p;
		that.hi = parseFloat(that.hi.toFixed(5));
		that.ms = (that.hc - that.hi) / 2; // Margen del slice
		if (typeof that.si === 'undefined')
			return;
		that.element.css("width", that.wc + "px")
			.css("height", that.hc + "px")
			.css("perspective", that.p + "px")
			.css("-moz-perspective", that.p + "px")
			.css("-webkit-perspective", that.p + "px");
		that.element.children().eq(0)
			.css("margin-top", that.ms + "px")
			//.css("width", wi+"px")
			.css("width", that.wi + "px")
			.css("height", that.hi + "px");
		var deg = 0;
		for (var i = 0; i <= that.c; i++){
			deg = that.si.eq(i).data("gr");
			if(i===that.valor){
				that.si.eq(i).css("transform", "rotatey(" + deg + "deg) translatez(" + (that.ap+5) + "px)");
			}else{
				that.si.eq(i).css("transform", "rotatey(" + deg + "deg) translatez(" + that.ap + "px)");
			}
		}
	} // resize
}(jQuery));

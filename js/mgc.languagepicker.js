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
	"use strict";
	$.widget("mgc.languagepicker", {
		options: {
			locale: navigator.language || navigator.userLanguage || navigator.browserLanguage || "en",
			language: "",
			country: "",
			items: [],
			listHeight: 3,
			listBackgroundColor: "rgba(255, 255, 255, .5)",
			listZIndex: 2
		},
		listHeightPct: "0",
		open: false,
		_create: function(){
			var that = this;
			this.ls=$("<div></div");
			var e=this.element;
			this._setOptions({
				'locale': this.options.locale,
				'items': this.options.items
			});
		},
		_setOptions: function(options) {
			var that = this;
			$.each(options, function(key, value) {
				that._setOption(key, value);
			});
		},
		_setOption: function (key, value) {
			var that = this,
			prev = this.options[key],
			fnMap = {
				'locale': function () {
					that.options.locale= that.options.locale.toString().toUpperCase();
					that.options.language= that.options.locale.substr(0, 2);
					that.options.country= that.options.locale.substr(3, 2);
				},
				'items': function(){
					var lg=-1;
					var items=that.options.items;
					$.each(items, function (idx, item) {
						if(item.locale.toUpperCase()===that.options.locale){
							lg=idx;
							return false;
						}
					});
					if(lg<0)
						$.each(items, function (idx, item) {
							if(item.locale.substr(0, 2).toUpperCase()===that.options.locale){
								lg=idx;
								return false;
							}
						});
					if(lg<0)
						$.each(items, function (idx, item) {
							if(item.locale.substr(0, 2).toUpperCase()===that.options.language){
								lg=idx;
								return false;
							}
						});
					if(lg<0)
						lg=0;
					that._createList(lg, items);
				},
				'listBackgroundColor': function(){
					that.ls.css("background-color", value);
				}
			};
			if(key !== "language" && key !== "country")
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
		_createList: function(lg, items){
			this.ls=$("<div></div>");
			var cnt=0;
			var that=this;
			$.each(items, function (idx, item) {
				if(idx !==lg){
					var img=$("<img src='"+items[idx].flag+"'/>");
					img.css("width", "30%").css("height", "100%")
						.css("vertical-align","bottom");
					var txt=$("<p>"+items[idx].text+"</p>");
					txt.width("70%").height("100%").css("display", "none")
						.css("vertical-align","bottom");
					var it=$("<div></div>").css("padding-left", "5px").append(txt).append(img)
						.css("cursor", "pointer").data("idx", idx).data("locale", item.locale)
						.hover(function(){
							$(this).css("background-color", "white").css("border-bottom-left-radius", "20px");
						}, function(){
							$(this).css("background-color", "transparent").css("border-bottom-left-radius", "initial");
						})
						.click(function(){
							that._setOption("locale", $(this).data("locale"));
							that._createList($(this).data("idx"), items);
						});
					cnt++;
					that.ls.append(it);
				}
			});
			this.ls.css("background-color", this.options.listBackgroundColor)
				.css("position", "absolute").css("top", "100%")
				.css("z-index", this.options.listZIndex)
				.css("border-bottom-left-radius", "20px")
				.addClass("languagepickerlist")
				.css("text-align", "left");
			if(cnt>this.options.listHeight){
				this.listHeightPct=this.options.listHeight*100+"%";
				this.ls.height(0).css("overflow-y", "auto");
				this.ls.find("div").height(parseInt(100/this.options.listHeight)+"%");
			}else{
				this.listHeightPct=cnt*100+"%";
				this.ls.height(0);
				this.ls.find("div").height(parseInt(100/cnt)+"%");
			}
			this.element.html("").append(this.ls);
			var txt=$("<p>"+items[lg].text+"</p>");
			txt.width("70%").height("100%").css("display", "inline-block")
				.css("vertical-align","bottom");
			var img=$("<img src='"+items[lg].flag+"'/>");
			img.css("width", "30%").css("height", "100%")
				.css("vertical-align","bottom");
			var it=$("<div></div>").width("100%").height("100%")
				.css("cursor", "pointer").append(txt).append(img)
				.css("text-align", "left");
			this.open=false;
			it.click(function(){
				event.stopPropagation();
				if(that.open){
					$(this).parent().find(".languagepickerlist").height(0);
					that.element.find(".languagepickerlist").find("p").css("display", "none");
					that.open=false;
				}else{
					$(this).parent().find(".languagepickerlist").height(that.listHeightPct);
					that.element.find(".languagepickerlist").find("p").css("display", "inline-block");
					that.open=true;
				}
			});
			$(window).click(function() {
				if(that.open){
					that.element.find(".languagepickerlist").height(0);
					that.element.find(".languagepickerlist").find("p").css("display", "none");
					that.open=false;
				}
			});
			that.element.append(it).css("position", "relative");
		}
	});
}(jQuery));
		

/*
 * Created by Clemmensen on 2019-3-23.
 * Corresponding author: Clemmensen
 * Email: fanghj133@163.com
 */

(function (){
var container = document.querySelector(".container")
var slider = container.querySelector("#slider")
// console.log(slider)
var sliderItems = slider.querySelectorAll("li")
var btnLeft = slider.querySelector("#prev")
var btnRight = slider.querySelector("#next")
var iconNodelist = document.querySelectorAll(".slider_bar > li")
// console.log(iconNodelist)

var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false)
		}
		else if(element.attachEvent){
			// IE8及更早版本
			element.attachEvent('on'+type, handler)
		}
		else{
			// DOM0级方法
			element['on'+type] = handler;
		}
	},
	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false)
		}
		else if(element.detachEvent){
			element.detachEvent('on'+type, handler)
		}
		else{
			element['on'+type] = null;
		}
	}
}

//Calling the window onload event
EventUtil.addHandler(window, 'load', function (event) {
	container.style.height = (document.body.clientWidth * 0.48).toString() + "px";
})

//Calling the window resize event
EventUtil.addHandler(window, 'resize', throttle(resizeFn, 200))

function resizeFn(event) {
	console.log("2333");
	container.style.height = (document.body.clientWidth * 0.48).toString() + "px";
	// sliderItems的高度是继承container得到的，不需要再设置
}
// 节流函数
function throttle(fn, delay){
	var args;
	var previous = 0;
	return function(){
		var now = +new Date();
		args = arguments;
		if(now - previous>delay){
			fn.apply(this, args);
			previous = now;
		}
	}
}

//Change slider by icons
slider.style.marginLeft = "0%";
EventUtil.addHandler(iconNodelist[0], 'mouseover', function () {
    slider.style.marginLeft = "0%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[0].className += "on";
});
EventUtil.addHandler(iconNodelist[1], 'mouseover', function () {
    slider.style.marginLeft = "-100%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[1].className += "on";
});
EventUtil.addHandler(iconNodelist[2], 'mouseover', function () {
    slider.style.marginLeft = "-200%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[2].className += "on";
});
EventUtil.addHandler(iconNodelist[3], 'mouseover', function () {
    slider.style.marginLeft = "-300%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[3].className += "on";
});
EventUtil.addHandler(iconNodelist[4], 'mouseover', function () {
    slider.style.marginLeft = "-400%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[4].className += "on";
});
EventUtil.addHandler(iconNodelist[5], 'mouseover', function () {
    slider.style.marginLeft = "-500%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[5].className += "on";
});
EventUtil.addHandler(iconNodelist[6], 'mouseover', function () {
    slider.style.marginLeft = "-600%";
    for (var i = iconNodelist.length - 1; i >= 0; i--) {
    	iconNodelist[i].className = "";
    };
    iconNodelist[6].className += "on";
});

// slider swithch function
function switchSlider() {
    var curMargin = parseFloat(slider.style.marginLeft);
    var curIndex = curMargin / 100;
    // 0 ~ -6
    var ChangeSliderAuto = (function() {
        return function() {
            slider.style.marginLeft = (curIndex * 100 - 100).toString() + "%" ; 
            iconNodelist[-curIndex].className = "";
            iconNodelist[1-curIndex].className += "on";
    }})()
    var ChangeSliderLeft = (function() {
        return function() {
            slider.style.marginLeft = (curIndex * 100 + 100).toString() + "%" ; 
            iconNodelist[-curIndex].className = "";
            iconNodelist[-1-curIndex].className += "on";
    }})()
    switch (curIndex) {
        case 0:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -1:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -2:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -3:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -4:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -5:
            setTimeout(ChangeSliderAuto(), 0);
            break;
        case -6:
            setTimeout((function() {
                return function() {
                    slider.style.marginLeft = "0%"; 
                    iconNodelist[6].className = "";
                    iconNodelist[0].className += "on";
                }})(), 0);
            break;
    }
}
// slider swithch function
function switchSliderLeft() {
    var curMargin = parseFloat(slider.style.marginLeft);
    var curIndex = curMargin / 100;
    // 0 ~ -6
	var ChangeSliderLeft = (function() {
	    return function() {
	        slider.style.marginLeft = (curIndex * 100 + 100).toString() + "%" ; 
	        iconNodelist[-curIndex].className = "";
	        iconNodelist[-1-curIndex].className += "on";
	}})()
    switch (curIndex) {
        case 0:
            setTimeout((function(){
            	return function(){
            		slider.style.marginLeft = "-600%"; 
            		iconNodelist[0].className = "";
            	    iconNodelist[6].className += "on";
            	}
            })(), 0);
            break;
        case -1:
            setTimeout(ChangeSliderLeft(), 0);
            break;
        case -2:
            setTimeout(ChangeSliderLeft(), 0);
            break;
        case -3:
            setTimeout(ChangeSliderLeft(), 0);
            break;
        case -4:
            setTimeout(ChangeSliderLeft(), 0);
            break;
        case -5:
            setTimeout(ChangeSliderLeft(), 0);
            break;
        case -6:
            setTimeout(ChangeSliderLeft(), 0);
            break;
    }
}

//Change slider auto with 2000ms' deday
setInterval(switchSlider, 2000);

// Control buttons
EventUtil.addHandler(btnLeft, 'click', function(){
	switchSliderLeft();
})
EventUtil.addHandler(btnRight, 'click', function(){
	switchSlider();
})
})();

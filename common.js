"use strict"

Array.prototype.remove = function(elem)
{
	const index = this.indexOf(elem);
	if (index !== -1)
		this.splice(index, 1);
}

function isEmpty(obj)
{
	for (const property in obj)
	{
		if (Object.hasOwn(obj, property))
			return false;
	}
	return true;
}

class RGBA
{
	constructor(r, g, b, a = 1)
	{
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	setAlpha(a)
	{
		this.a = a;
	}
	toString()
	{
		const hasAlpha = this.a < 1;
		return (hasAlpha ? "rgba(" : "rgb(") 
		+ this.r + ',' + this.g + ',' + this.b
		+ (hasAlpha ? "," + this.a : "")
		+ ")";
	}
}

// returns val or the min/max it is closest to. Flips inverted min/max values.
function clamp(min, max, val)
{
	if (min > max)
		return clamp(max, min, val);
	return Math.min(max, Math.max(min, val));
}

// Returns the linear interpolation of t from a to b (unclamped)
function lerp(a, b, t)
{
	return (1-t)*a + t*b;
}

// Returns the normalized value of t from the range [a,b]
function inverseLerp(a, b, t)
{
	return (t - a) / (b - a);
}

// Returns the lerp() of [y,z] using the normalized value of t in [a,b] as the param
function map(a, b, y, z, t)
{
	return lerp(y, z, inverseLerp(a, b, t));
}


// Returns true if n is an Number
function isNumber(n) { 
	return !isNaN(parseFloat(n)) && isFinite(n);
}

// Returns true if s is a String
function isString(s){
	return typeof(s) === 'string' || s instanceof String;
}

// Interprets passed string as an interger. Empty strings return 0, null string return NaN
function toInteger(str)
{
	if (str === '')
		return 0;
	else if (!str)
		return NaN;
	return Number.parseInt(str);
}

// Returns a random integer in the range [0,n)
function randomInt(n)  {
	return Math.floor(Math.random() * n);
}

/* The layout is drawn for a 16:9 screen in vw units, so it is always 100vw * 9/16 tall.
 * On wider screens (phones in landscape, ~19.5:9) that is taller than the viewport and
 * the bottom of the board is cut off. Shrink the whole page until it fits the height,
 * centered horizontally. A transform does not change layout, so the offset*-based
 * card animations keep working unchanged. */
function fitToViewport()
{
	const vw = window.innerWidth;
	const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
	const scale = Math.min(1, vh / (vw * 1080 / 1920));
	const fit = scale < 0.999;
	document.documentElement.classList.toggle("fit-height", fit);
	document.body.style.transform = fit ? "scale(" + scale + ")" : "";
}
fitToViewport();
window.addEventListener("resize", fitToViewport);
window.addEventListener("orientationchange", () => setTimeout(fitToViewport, 200));
document.addEventListener("fullscreenchange", fitToViewport);
if (window.visualViewport)
	window.visualViewport.addEventListener("resize", fitToViewport);

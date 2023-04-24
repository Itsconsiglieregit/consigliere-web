/* Define the number of leaves to be used in the animation */
const NUMBER_OF_LEAVES = 20;
/*var window_width;
window_width = document.documentElement.clientWidth;
*/
/*
    Called when the "Falling Leaves" page is completely loaded.
*/

function init_leaves(folder)
{
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('heart_container');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++)
    {
        container.appendChild(createAheart(folder));
    }
}


/*
    Receives the lowest and highest values of a range and
    returns a random integer that falls within that range.
*/
function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}


/*
   Receives the lowest and highest values of a range and
   returns a random float that falls within that range.
*/
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}


/*
    Receives a number and returns its CSS pixel value.
*/
function pixelValue(value)
{
    return value + 'px';
}


/*
    Returns a duration value for the falling animation.
*/

function durationValue(value)
{
    return value + 's';
}


/*
    Uses an img element to create each heart. "Leaves.css" implements two spin
    animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
    function determines which of these spin animations should be applied to each heart.

*/
function createAheart(folder)
{
    /* Start by creating a wrapper div, and an empty img element */
    var heartDiv = document.createElement('div');
    var image = document.createElement('img');
   // var folder = document.getElementById('heart_container').getAttribute('data-image');

	var maxRandvar = 5;
    if(folder=='baloons'){
		maxRandvar = 6;
	}
    /* Randomly choose a heart image and assign it to the newly created element */
    image.src = 'assets/img/'+folder+'/heart' + randomInteger(1, maxRandvar) + '.png';
    heartDiv.style.top = "115%";

	var screenWidth = $(window).width();
	var scrnPixlVal = parseInt(screenWidth*2.5);


    /* Position the heart at a random location along the screen */
    heartDiv.style.left = pixelValue(randomInteger(scrnPixlVal, 10));
    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.8) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
	if(folder=='baloons'){

		spinAnimationName = (Math.random() < 0.8) ? 'clockwiseSpin_baloon' : 'counterclockwiseSpinAndFlip_baloon';
	}

    /* Set the -webkit-animation-name property with these values */
    heartDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;

    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(40, 16));

    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(11, 20));
    /* Set the -webkit-animation-duration property with these values */
    heartDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var heartDelay = durationValue(randomFloat(1, 0));
    heartDiv.style.webkitAnimationDelay = heartDelay + ', ' + heartDelay;

    image.style.webkitAnimationDuration = spinDuration;

    // add the <img> to the <div>
    heartDiv.appendChild(image);

    /* Return this img element so it can be added to the document */
    return heartDiv;
}

function re_init_leaves(folder){
	if($('#heart_container').length>0){
		$('#heart_container').empty();
		$('#heart_container').removeAttr('class');
	}else{
		$('.main').prepend('<div id="heart_container"></div>');
	}
	if(folder){
		$('#heart_container').addClass(folder);
		init_leaves(folder);
	}
}

/* Calls the init function when the "Falling Leaves" page is full loaded */
window.addEventListener('DOMContentLoaded', function(){
		var heartcont = document.getElementById('heart_container');

		if (typeof(heartcont) != 'undefined' && heartcont != null){
			var folder = heartcont.getAttribute('data-image');
			heartcont.className = folder;
			//if(window.innerWidth>1024){
				init_leaves(folder);
			//}
		}

	}, false);

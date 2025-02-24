window.addEventListener('load', function () {
    'use strict';
	console.log('reading js');

    const area1 = document.querySelector('#area1');
    const area2 = document.querySelector('#area2');
    const area3 = document.querySelector('#area3');
    const area4 = document.querySelector('#area4');

    const dogcollar = document.querySelector('#dogcollar');
    const bluebag = document.querySelector('#bluebag');
    const puffbag = document.querySelector('#puffbag');
    const brownbag = document.querySelector('#brownbag');
    const original = document.querySelector('#original-img');


	const images = [dogcollar, bluebag, puffbag, brownbag, original];


	const areas = document.querySelectorAll('area');
	const sections = document.querySelectorAll('section');

	let sectionTops = [];
	let pageTop;
	let counter = 1;
	let prevCounter = 1;
	
	resetPagePosition();
   
	// image map effect, stacking the designated image on top when hovered
	function putImageOnTop(hoveredImage){
		for (let i = 0; i < images.length; i++) {
			if (images[i] === hoveredImage) {
				images[i].style.opacity = '1';
			} else {
				images[i].style.opacity = '0';
			}
		}
	}

	// replaces the original image back on top when no area is hovered
	function resetImages() {
		for (let i = 0; i < images.length; i++) {
			if (images[i] === original) {
				images[i].style.opacity = '1';
			} else {
				images[i].style.opacity = '0';
			}			
		}
	}

    // hover effect for the image map
	area1.addEventListener('mouseenter', function () {
		putImageOnTop(dogcollar);
	});

	area2.addEventListener('mouseenter', function () {
		putImageOnTop(bluebag);
	});

    area3.addEventListener('mouseenter', function () {
		putImageOnTop(puffbag);
	});

	area4.addEventListener('mouseenter', function () {
		putImageOnTop(brownbag);
	});

	document.querySelector('div').addEventListener('mouseleave', resetImages);
	
	// click effect
	for (let i = 0; i < areas.length; i++) {
		areas[i].addEventListener('click', function (event) {
			event.preventDefault();

			for (let j = 1; j < sections.length; j++) { //skip sect1
				if (i === j - 1) { // Match the index of area with the correct section
					const myStyle = `color${j+1}`;
            		document.querySelector('body').className = myStyle;
					sections[j].scrollIntoView({ behavior: 'smooth' });
					break; // Stops the loop once the section is found
				}
			}
		});
	}

	// scroll color change effect
	window.addEventListener('scroll', function () {
		pageTop = window.scrollY + 100;

		if (pageTop > sectionTops[counter]) {
			counter++;
		}

		else if (counter > 1 && pageTop < sectionTops[counter - 1]) {
			counter--;
		}

		if (counter != prevCounter) {
			prevCounter = counter;
            
            const myStyle = `color${counter}`;
            document.querySelector('body').className = myStyle;
		}

	});

	function resetPagePosition() {
		sectionTops = [];
		sections.forEach(function (section) {
			sectionTops.push(Math.floor(section.getBoundingClientRect().top) + window.scrollY);
		});

		const pagePosition = window.scrollY + 100;
		counter = 0;

		sectionTops.forEach(function (section) { 
            if (pagePosition > section) { 
                counter++; 
            } 
        });
	}

	// overlay effect
	const viewMore = document.querySelector('#viewMore');
	const overlay = document.querySelector('#overlay');
	const x = document.querySelector('#x');
	const prev = document.querySelector('#prev');
	const next = document.querySelector('#next');

	const overlayImages = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];
	const slide = document.querySelector('#dogpic');
	const imageMap = document.querySelector('#imageMap');
	const main = document.querySelector('main');
	const bgImg = document.querySelector('#bg-img');
	let currentImage = 0;

	imageMap.className = "showing";
	main.className = "showing";
	overlay.className = "hidden";
	bgImg.className = "hidden";

	// triggers the overlay 'page'
	viewMore.addEventListener('click', function(event){
		event.preventDefault();
		imageMap.className = "hidden";
		main.className = "hidden";
		bgImg.className = "showing";
		overlay.className = "showing";
	});
	
	// exits the overlay 'page'
	x.addEventListener('click', function(event){
		event.preventDefault();
		imageMap.className = "showing";
		main.className = "showing";
		overlay.className = "hidden";
		bgImg.className = "hidden";
	});

	// goes to the next picture
	next.addEventListener('click', function(){
		currentImage++;
		if (currentImage > overlayImages.length-1) {
			currentImage = 0;
		}
		slide.src = `images/${overlayImages[currentImage]}`;
	});

	// goes to the previous picture
	prev.addEventListener('click', function(){
		currentImage--;
		if (currentImage < 0) {
			currentImage = overlayImages.length-1;
		}
		slide.src = `images/${overlayImages[currentImage]}`;
	});


	// width responsiveness 
	function adjustMainWidth() {
		const image = document.querySelector('img');
		const main = document.querySelector('main');
	
		const imageWidth = image.offsetWidth;
		main.style.width = (window.innerWidth - imageWidth - 70) + 'px';
	}

	adjustMainWidth();
	
	// when screen width changes, the main width changes so not covered by image map
	window.addEventListener('resize', adjustMainWidth);
})();
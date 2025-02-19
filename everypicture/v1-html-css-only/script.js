window.addEventListener('load', function () {
    'use strict';

	function adjustMainWidth() {
		const image = document.querySelector('img');
		const main = document.querySelector('main');
	
		// if (image && main) {
		const imageWidth = image.offsetWidth;
		main.style.width = (window.innerWidth - imageWidth) + 'px';
		// }
	}

	adjustMainWidth();
	
	// window.addEventListener('load', adjustMainWidth);
	window.addEventListener('resize', adjustMainWidth);

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
   
	function putImageOnTop(hoveredImage){
		for (let i = 0; i < images.length; i++) {
			if (images[i] === hoveredImage) {
				images[i].style.opacity = '1';
			} else {
				images[i].style.opacity = '0';
			}
		}
	}

	function resetImages() {
		for (let i = 0; i < images.length; i++) {
			if (images[i] === original) {
				images[i].style.opacity = '1';
			} else {
				images[i].style.opacity = '0';
			}			
		}
	}

    // hover effect
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
		pageTop = window.scrollY + 300;

		if (pageTop > sectionTops[counter]) {
			counter++;
			console.log(`scrolling down ${counter}`);
		}

		else if (counter > 1 && pageTop < sectionTops[counter - 1]) {
			counter--;
			console.log(`scrolling up ${counter}`);
		}

		if (counter != prevCounter) {
			// document.querySelector('figure img').className = 'sect' + counter;
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

		const pagePosition = window.scrollY + 300;
		counter = 0;

		sectionTops.forEach(function (section) { 
            if (pagePosition > section) { 
                counter++; 
            } 
        });

	}
	

})();
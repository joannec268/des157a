window.addEventListener('load', function () {

	const sections = document.querySelectorAll('section');
	let sectionTops = [];
	let pageTop;
	let counter = 1;
	let prevCounter = 1;
	let doneResizing;

	resetPagePosition();

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
			document.querySelector('figure img').className = 'sect' + counter;
			prevCounter = counter;
            
            const myStyle = `color${counter}`;
            document.querySelector('body').className = myStyle;
		}

	});

	window.addEventListener('resize', function () {

		clearTimeout(doneResizing);

		doneResizing = setTimeout(function () {

			resetPagePosition();

		}, 300);
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
});
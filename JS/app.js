// DOM Elements
const mainCont = document.querySelector('.main-cont');
const restImage = document.getElementById('rest-img');
const foodImage = document.getElementById('food-img');
const drinksImage = document.getElementById('drinks-img');
const restImageNav = document.querySelectorAll('.rest-img-nav .circle');
const navs = document.querySelectorAll('.nav');

// Array to store each
const imgArr = [restImage, foodImage, drinksImage];
// Global count
let counts = [1, 1, 1];
let scrollStopTimer = null;

// Update img and img nav
function initCarousel(img, arr) {
	let imageToShow = imageSelect(img.id);
	img.classList.add('hide');
	let count = countSelect(img.id, arr);
	setTimeout(() => {
		img.src = `../img/${imageToShow}${count}.jpg`;
		setTimeout(() => {
			img.classList.remove('hide');
			arr.forEach((el) => (el.className = `circle`));
			arr[count - 1].className = `circle active`;
		}, 1000);
	}, 3000);
}

// Determine which count to use and increase
function countSelect(id, arr) {
	if (id === 'rest-img') {
		counts[0] === arr.length ? (counts[0] = 1) : counts[0]++;
		return counts[0];
	} else if (id === 'food-img') {
		counts[1] === arr.length ? (counts[1] = 1) : counts[1]++;
		return counts[1];
	} else {
		counts[2] === arr.length ? (counts[2] = 1) : counts[2]++;
		return counts[2];
	}
}

// Determine which image to show
function imageSelect(id) {
	if (id === 'rest-img') {
		return 'rest';
	} else if (id === 'food-img') {
		return 'food';
	} else {
		return 'drink';
	}
}

// Change image on click
function changeManually(el) {
	// select all children - to array
	let allChild = Array.from(el.parentNode.children);
	// find index of the element clicked
	const elIndex = allChild.indexOf(el);
	// find nearest image class
	const imageEl = el.parentNode.parentNode.children[0];
	// remove active class from all
	allChild.forEach((child) => child.classList.remove('active'));
	// Add active class to target
	el.classList.add('active');
	// stop running interval function
	clearInterval(intervalID);
	// Change image according to selection
	imageEl.src = `../img/${imageSelect(imageEl.id)}${elIndex + 1}.jpg`;
	// Update the counts
	updateCount(imageEl.id, elIndex);
	// Resume interval
	intervalID = setInterval(initCarousel, 7000, imageEl, allChild);
}

// Update count on click on image nav
function updateCount(id, indx) {
	if (id === 'rest-img') {
		counts[0] = indx + 1;
	} else if (id === 'food-img') {
		counts[1] = indx + 1;
	} else {
		counts[2] = indx + 1;
	}
}

// Select image array  to display
function selectImgArr(id) {
	if (id === 'rest-img') {
		return imgArr[0];
	} else if (id === 'food-img') {
		return imgArr[1];
	} else {
		return imgArr[2];
	}
}

// Check if item is in the current viewport
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

// Check each image is in viewport, run carousel
function checkVisbility(arr) {
	arr.forEach((image) => {
		if (isInViewport(image)) {
			const arrNodeEl = image.parentNode.lastElementChild;
			const carArr = arrNodeEl.querySelectorAll('.circle');
			intervalID = setInterval(initCarousel, 7000, image, carArr);
		}
	});
}

// Event listsners
// listen for scroll
mainCont.addEventListener(
	'scroll',
	() => {
		// stop initial interval
		clearInterval(intervalID);
		// if stopped check which element is in viewport
		if (scrollStopTimer !== null) {
			clearTimeout(scrollStopTimer);
		}
		scrollStopTimer = setTimeout(() => {
			setTimeout(() => {
				checkVisbility(imgArr);
			});
		}, 2000);
	},
	false
);

//listen for image-nav button click-change image
navs.forEach((nav) => {
	nav.addEventListener('click', (e) => {
		if (e.target.classList.contains('circle')) {
			changeManually(e.target);
		} else {
			return false;
		}
	});
});

// initiate carousel
let intervalID = setInterval(initCarousel, 7000, imgArr[0], restImageNav);

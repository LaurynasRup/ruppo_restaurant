const dateSelect = document.getElementById('date-select');
const peopleSelect = document.getElementById('people-num');
const timeSelect = document.getElementById('time-book');
const reserveBtn = document.getElementById('reserve-btn');
const errorMessage = document.getElementById('error-message');
// Change minimum date to today
function updateDate() {
	const currentDate = new Date();

	// function to pad month/day
	function pad(n) {
		return n < 10 ? '0' + n : n;
	}

	const year = currentDate.getFullYear();
	const month = pad(currentDate.getMonth() + 1);
	const day = pad(currentDate.getDate());

	dateSelect.min = `${year}-${month}-${day}`;
}

// Get values from input fields
function getValues() {
	// Set an object tostore date
	const booking = {};
	const resDate = dateSelect.value;
	const peopleNumBook = peopleSelect.value;
	const timeBook = timeSelect.value;

	// get date
	resDate === ''
		? (errorMessage.innerText = 'Please input booking information')
		: (booking.bookingDate = resDate);
	// get number of people
	peopleNumBook === ''
		? (errorMessage.innerText = 'Please input booking information')
		: (booking.numPeople = peopleNumBook);
	// Get time
	timeBook === ''
		? (errorMessage.innerText = 'Please input booking information')
		: (booking.resTime = timeBook);

	// Check if all fields are stored
	if (booking.bookingDate && booking.numPeople && booking.resTime) {
		// Store booking object in seesion storage
		sessionStorage.setItem('RuppoBooking', JSON.stringify(booking));
		// redirect to another page
		window.location = 'confirm_reserve.html';
	}
}

reserveBtn.addEventListener('click', (e) => {
	e.preventDefault();
	getValues();
});
updateDate();

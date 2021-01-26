const emailField = document.getElementById('confirm-email-sent');
const titleField = document.querySelector('.book-conf-title');
const nameField = document.querySelector('.book-conf-name');
const dateField = document.querySelector('.book-conf-date');
const timeField = document.querySelector('.book-conf-time');
const pplField = document.querySelector('.book-conf-ppl span');

// Populate fields with items from session storage
function populateFields() {
	if (
		JSON.parse(sessionStorage.getItem('RuppoBooking')) &&
		JSON.parse(sessionStorage.getItem('booking-details'))
	) {
		const ruppoBooking = JSON.parse(sessionStorage.getItem('RuppoBooking'));
		const bookingDetails = JSON.parse(
			sessionStorage.getItem('booking-details')
		);

		emailField.innerText = bookingDetails['book-email'];
		titleField.innerText = bookingDetails['book-title'];
		nameField.innerText = `${bookingDetails['book-name']} ${bookingDetails['book-sname']}`;
		dateField.innerText = ruppoBooking.bookingDate;
		timeField.innerText = ruppoBooking.resTime;
		pplField.innerText = ruppoBooking.numPeople;
	}
}

populateFields();

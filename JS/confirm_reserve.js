const errorMsg = document.getElementById('error-message-2');
const addInfoInput = document.getElementById('add-info');
const requiredFields = document.querySelectorAll('.book-det-inp');
const confirmBtn = document.querySelector('.btn-confirm-book');

// Object to store booking info
const bookingDetails = {};

// Function to validate data
function validateData() {
	requiredFields.forEach((field) => {
		// Clear fields
		field.style.background = '#FFF';
		// if not email field
		if (field.id !== 'book-email') {
			// check for specials chars
			let input = removeSpecChars(field.value);
			// Highlight empty field, error msg
			if (input === '') {
				field.style.background = '#F7E6E3';
				errorMsg.textContent = 'Please enter required info';
			} else {
				// Store in an object
				bookingDetails[field.id] = input;
			}
		} else {
			let input = field.value.trim();
			// is email correct
			if (!checkEmail(input) || input === '') {
				field.style.background = '#F7E6E3';
				errorMsg.textContent = 'Please enter required info';
			} else {
				// Store in an object
				bookingDetails[field.id] = input;
			}
		}
	});
	console.log(bookingDetails);
}

// Store additional info
function storeAdditional() {
	if (addInfoInput.value) {
		bookingDetails.additional = addInfoInput.value;
	}
}

// Redirect to another page
function redirect() {
	if (!errorMsg.textContent) {
		// Store obj to session
		sessionStorage.setItem('booking-details', JSON.stringify(bookingDetails));
		// Redirect
		window.location = 'confirmation.html';
	}
}

// Reg Ex for email
function checkEmail(str) {
	const regex = /^\S+@\S+$/;
	return regex.test(str);
}

// Reg Ex to remove special chars
function removeSpecChars(str) {
	let newstr = str.trim();
	newstr = newstr.replace(/[^\w\s]/gi, '');
	return newstr;
}

// Event listener for btn
confirmBtn.addEventListener('click', () => {
	// Clear error
	errorMsg.textContent = '';
	// Validate required fields
	validateData();
	// Store additional info
	storeAdditional();
	// redirect if all correct
	redirect();
});

// Function to upload a new offer
async function upload(formData) {

  // Prepare form data
  const requestBody = Object.fromEntries(formData);

  // Upload from data
  fetch('/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
  })
}


// Event listerer for form submit via enter
document.getElementById("offerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form data
  const form = document.getElementById("offerForm");
  const formData = new FormData(form);

  // Upload form dataa
  upload(formData);
});

// Event listener for form submit via submit button
document.getElementById("submitButton").addEventListener("click", (event) => {
  event.preventDefault();

  // Get form data
  const form = document.getElementById("offerForm");
  const formData = new FormData(form);

  // Upload form dataa
  upload(formData);
});

// eof





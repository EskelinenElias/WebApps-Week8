document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault(); 
  // Get input values
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const isAdmin = document.getElementById('isAdmin').checked; 
  // Validate inputs
  if (!email || !username || !password) {
    alert("Please fill in all the fields."); 
    return; 
  }
  try {
    // Send POST request to register user
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ email, username, password, isAdmin }),
    });
    // Check response
    if (!response.ok) {
      // Registration failed
      console.error('Error occurred during registration.');
      return;      
    }
    // User registered successfully
    window.location.href = 'index.html';
  } catch (error) {
    // Error occurred
    console.error('Request Failed:', error);
    alert('An error occurred. Please try again later.');
  }
});
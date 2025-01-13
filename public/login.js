async function login(email, password) {
  // Validate login credentials
  if (!email || !password) {
    throw new Error("Invalid login credentials.")
  }
  // Send post request to login
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  });
  // Check response
  if (!response.ok) {
    // Login failed
    const errorData = await response.json();
    throw new Error(errorData); 
  } 
  // User succesfully logged in; return token
  const data = await response.json();
  const token = data.token; 
  return token; 
}
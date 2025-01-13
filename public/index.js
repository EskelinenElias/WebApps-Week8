// Function to display topics on the page
function displayTopics(topics) {
  if (!topics) {
    console.log("No topics to display.")
    return; 
  } 
  // Clear the topics list
  const topicsContainer = document.getElementById('topics');
  topicsContainer.innerHTML = ''; // Clear existing topics
  // Add topics to the page
  topics.forEach((topic) => {
    // Create a container for the topic
    const topicContainer = document.createElement('div');
    topicContainer.innerHTML = `
      <span>${topic.title}</span>
      <p>${topic.content}</p>
      <p>Posted by: ${topic.username} on ${new Date(topic.createdAt).toLocaleString()}</p>
      <button class="delete-topic" data-id="${topic._id}">Delete</button>
    `;
    topicsContainer.appendChild(topicContainer);
    // Attach delete handlers
    document.querySelectorAll('.delete-topic').forEach((button) => {
      button.addEventListener('click', (event) => {
        // Get token from local storage
        const token = localStorage.getItem('token');
        // Get topic id 
        const topicId = event.target.getAttribute('data-id');
        try {
          // Delete topic
          deleteTopic(token, topicId); 
        } catch(error) {
          // Alert user
          alert("Failed to delete topic."); 
          console.error(error); 
        }
      });
    });
  });
}

// Add functionality to the login form
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  // Get login credentials from login form 
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  try {
    // Login
    const token = await login(email, password);
    // Save token to local storage
    localStorage.setItem('token', token);
    // Login successful message
    alert("Login successful. ")
  } catch(error) {
    // Login failed
    alert("Login failed."); 
    console.error("Login failed.", error); 
  }
}); 

// Add functionality to add topic form 
document.getElementById("topicForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  // Get token from local storage
  let token = localStorage.getItem('token')
  console.log("token", token)
  if (!token) {
    console.log("Could not add topic without login. ")
    alert("Please login first.")
    return; 
  }
  // Get add topic form content 
  const title = document.getElementById("topicTitle").value.trim();
  const content = document.getElementById("topicText").value.trim();
  try {
    // Add topic
    await addTopic(token, title, content);
    // Load topics
    const topics = await loadTopics();
    // Display topics on the page
    displayTopics(topics); 
  } catch(error) {
    console.error("Failed to add topic.", error); 
    alert("Failed to add topic.")
  }
}); 

// Load topics on page load
loadTopics().then((topics) => {
  console.log(topics)
  displayTopics(topics); 
}); 
// Load all topics from the server
async function loadTopics() {
  // Fetch topics
  console.log("Loading topics")
  const response = await fetch('/api/topics', {
    method: 'GET',
  });
  // Check response
  if (!response.ok) {
    // Failed to fetch topics
    console.error("Failed to load topics."); 
    return; 
  }
  // Topics loaded
  const data = await response.json(); 
  const topics = data.topics; 
  return topics; 
};

// Add topic to the server
async function addTopic(token, title, content) {
  // Validate inputs
  if (!token || !title || !content) {
    console.error("Could not add topic. ", token, title, content)
    return;
  }
  const response = await fetch('/api/topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) {
    const errorData = await response.json(); 
    console.error('Failed to post topic', errorData);
    throw new Error('Failed to post topic', errorData); 
  }
}

async function deleteTopic(token, id) {
  // Validate parameters
  if (!token || !id) {
    console.error("Failed to delete topic: Invalid parameters"); 
    throw new Error("Failed to delete topic: Invalid parameters");
  }
  // Send delete request to delete topic
  const response = await fetch(`/api/topic/${topicId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to delete topic:', errorData);
    throw new Error('Failed to delete topic:', errorData);
  }
};
async function fetchUsersAndPosts() {
    try {
      // Fetching users and posts
      const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
      ]);
  
      const users = await usersResponse.json();
      const posts = await postsResponse.json();
  
      // Displaying the fetched data
      displayUsersAndPosts(users, posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function displayUsersAndPosts(users, posts) {
    const container = document.getElementById('user-posts-container');
  
    users.forEach(user => {
      // Create user container
      const userContainer = document.createElement('div');
      userContainer.classList.add('user-container');
  
      // User details template
      userContainer.innerHTML = `
        <div class="user-header">${user.name}</div>
        <div class="user-details">Email: ${user.email}</div>
        <div class="user-details">Website: ${user.website}</div>
        <button class="toggle-btn" id="toggle-posts-${user.id}">Show Posts</button>
        <div class="posts-container" id="posts-container-${user.id}"></div>
      `;
  
      // Filter posts for this user
      const userPosts = posts.filter(post => post.userId === user.id);
      const postsContainer = userContainer.querySelector(`#posts-container-${user.id}`);
  
      // Create post elements
      userPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <div class="post-title">${post.title}</div>
          <p class="post-body">${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
      });
  
      // Toggle button functionality
      const toggleButton = userContainer.querySelector(`#toggle-posts-${user.id}`);
      toggleButton.addEventListener('click', () => {
        const isHidden = postsContainer.style.display === 'none' || postsContainer.style.display === '';
  
        if (isHidden) {
          postsContainer.style.display = 'block';
          toggleButton.textContent = 'Hide Posts';
        } else {
          postsContainer.style.display = 'none';
          toggleButton.textContent = 'Show Posts';
        }
      });
  
      // Append user container to main container
      container.appendChild(userContainer);
    });
  }
  
  // Start fetching data on page load
  fetchUsersAndPosts();
  
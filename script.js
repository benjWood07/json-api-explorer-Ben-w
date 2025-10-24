const postList = document.getElementById("postList");
const fetchButton = document.getElementById("fetchButton");
const postForm = document.getElementById("postForm");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Render posts to the page
function renderPosts(posts) {
    postList.innerHTML = "";
    posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <small>Post ID: ${post.id}</small>
            <hr>
        `;
        postList.appendChild(postDiv);
    });
}

// Fetch posts from API
function fetchPosts() {
    postList.innerHTML = "<p>Loading...</p>";
    
    fetch(API_URL)
        .then((response) => response.json())
        .then((posts) => renderPosts(posts))
        .catch((error) => {
            postList.innerHTML = "<p>Error loading posts</p>";
            console.error(error);
        });
}

// Handle form submission
postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;
    
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 })
    })
        .then((response) => response.json())
        .then((newPost) => {
            alert("Post created successfully!");
            postForm.reset();
        })
        .catch((error) => console.error(error));
});

// Add button click event
fetchButton.addEventListener("click", fetchPosts);
// so much empty

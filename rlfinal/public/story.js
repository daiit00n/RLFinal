document.addEventListener("DOMContentLoaded", function() {
    const storyContainer = document.getElementById("storyContainer");
    const queryParams = new URLSearchParams(window.location.search);
    const storyId = queryParams.get('id');

    // Fetch individual story from the server
    fetch(`/api/stories/${storyId}`)
        .then(response => response.json())
        .then(story => {
            storyContainer.innerHTML = `
                <h1>${story.title}</h1>
                <p><strong>Время чтения:</strong> ${story.readingTime}</p>
                <p>${story.content}</p>
            `;
        })
        .catch(error => console.error('Error fetching story:', error));
});

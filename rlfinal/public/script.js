document.addEventListener("DOMContentLoaded", function() {
    const storyList = document.getElementById("storyList");

    // Fetch stories from the server
    fetch('/api/stories')
        .then(response => response.json())
        .then(data => {
            const stories = data.stories; // Assuming 'stories' is the property name
            stories.forEach(story => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h2>${story.title}</h2>
                    <p><strong>Время чтения:</strong> ${story.readingTime}</p>
                    <button data-id="${story._id}">Прочитать</button>
                `;
                storyList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching stories:', error));

    // Redirect to individual story page when "Прочитать" button is clicked
    storyList.addEventListener("click", function(event) {
        if (event.target && event.target.tagName === "BUTTON") {
            const storyId = event.target.dataset.id;
            window.location.href = `/story.html?id=${storyId}`;
        }
    });
});

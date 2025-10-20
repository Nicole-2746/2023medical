// Show given section
function showSection(section) {
    // Find section text from server
    fetch(`/hello/sections/${section}`)
    .then(response => response.text())
    .then(text => {
        // Log text and display on page
        console.log(text);
        document.querySelector('#content').innerHTML = text;
        
        // Add to browser history
        history.pushState({section: section}, "", `section${section}`);
    });
}

// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
    console.log("Popstate:", event.state.section);
    showSection(event.state.section);
}

document.addEventListener('DOMContentLoaded', function() {
    // Add button functionality
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function() {
            const section = this.dataset.section;
            history.pushState({section: section}, "", `section${section}`);
            showSection(section);
        };
    });
});
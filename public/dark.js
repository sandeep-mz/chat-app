const darkModeToggle = document.getElementById('darkmode-toggle');
const messagesContainer = document.querySelector('.messages-container');

darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        messagesContainer.style.background = '#242424';
    } else {
        messagesContainer.style.background = '#e1e1e1';
    }
});

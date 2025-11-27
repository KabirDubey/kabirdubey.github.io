// Paper abstract dropdown toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const abstractToggles = document.querySelectorAll('.abstract-toggle');

    abstractToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            // Find the abstract content associated with this toggle
            const paperHeader = this.parentElement;
            const abstractContent = paperHeader.nextElementSibling;

            // Toggle the 'show' class on the abstract content
            abstractContent.classList.toggle('show');

            // Toggle the 'active' class on the button
            this.classList.toggle('active');

            // Update button text and arrow direction
            if (abstractContent.classList.contains('show')) {
                this.textContent = '▲ Abstract';
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.textContent = '▼ Abstract';
                this.setAttribute('aria-expanded', 'false');
            }
        });

        // Initialize aria-expanded attribute
        toggle.setAttribute('aria-expanded', 'false');
    });
});

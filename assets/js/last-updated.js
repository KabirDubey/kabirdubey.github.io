// Set a fixed last updated date that only changes when the site is redeployed
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdatedElement = document.getElementById('last-updated');
    // This date will be updated when the site is built/deployed
    const buildDate = new Date(document.lastModified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    lastUpdatedElement.textContent = buildDate;
});
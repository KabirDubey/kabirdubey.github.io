// KaTeX rendering for LaTeX expressions in abstract sections
document.addEventListener('DOMContentLoaded', function() {
    // Wait for KaTeX to load
    if (typeof renderMathInElement !== 'undefined') {
        initKaTeX();
    } else {
        // If KaTeX hasn't loaded yet, wait for it
        window.addEventListener('load', initKaTeX);
    }
});

function initKaTeX() {
    // Get all abstract content sections
    const abstractSections = document.querySelectorAll('.abstract-content');

    // Render LaTeX in each abstract section
    abstractSections.forEach(function(section) {
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(section, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError: false,
                errorColor: '#cc0000',
                strict: false
            });
        }
    });

    // Also set up a MutationObserver to re-render when abstracts are toggled
    // This ensures LaTeX renders correctly when abstracts are first opened
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('abstract-content') &&
                    target.classList.contains('show')) {
                    // Re-render LaTeX when abstract is shown
                    if (typeof renderMathInElement !== 'undefined') {
                        renderMathInElement(target, {
                            delimiters: [
                                {left: '$$', right: '$$', display: true},
                                {left: '$', right: '$', display: false}
                            ],
                            throwOnError: false,
                            errorColor: '#cc0000',
                            strict: false
                        });
                    }
                }
            }
        });
    });

    // Observe all abstract content sections
    abstractSections.forEach(function(section) {
        observer.observe(section, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
}

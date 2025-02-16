document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const reactionBtns = document.querySelectorAll('.reaction-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.querySelector('.success-message');
    const closeSuccessBtn = document.querySelector('.close-success-btn');
    
    let selectedRating = null;
    let selectedCategory = null;

    // Handle Reaction Buttons
    reactionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            reactionBtns.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            selectedRating = btn.dataset.rating;

            // Animate the icon
            const icon = btn.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Handle Category Buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            categoryBtns.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            selectedCategory = btn.dataset.category;

            // Animate the selection
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Form Submission
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!selectedRating) {
            showAlert('Please select your experience rating');
            return;
        }

        if (!selectedCategory) {
            showAlert('Please select a feedback category');
            return;
        }

        // Get form data
        const formData = {
            rating: selectedRating,
            category: selectedCategory,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            feedback: document.getElementById('feedback').value,
            subscribed: document.getElementById('subscribe').checked
        };

        // Animate submit button
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            feedbackForm.reset();
            reactionBtns.forEach(btn => btn.classList.remove('selected'));
            categoryBtns.forEach(btn => btn.classList.remove('selected'));
            selectedRating = null;
            selectedCategory = null;

        } catch (error) {
            showAlert('Something went wrong. Please try again.');
        } finally {
            submitBtn.innerHTML = `
                <span class="submit-text">Submit Feedback</span>
                <span class="submit-icon"><i class="fas fa-paper-plane"></i></span>
            `;
            submitBtn.disabled = false;
        }
    });

    // Close success message
    closeSuccessBtn.addEventListener('click', () => {
        successMessage.classList.remove('show');
    });

    // Show success message
    function showSuccessMessage() {
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);
    }

    // Custom alert function
    function showAlert(message) {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = 'feedback-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Add alert to page
        document.body.appendChild(alert);

        // Animate in
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    // Add floating label animations
    const formInputs = document.querySelectorAll('.form-floating input, .form-floating textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Add smooth scroll to form when clicking reaction buttons
    reactionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.feedback-form-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// Add these styles to handle alerts
const styles = `
    .feedback-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    }

    .feedback-alert.show {
        transform: translateX(0);
    }

    .alert-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .alert-content i {
        font-size: 1.5rem;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 
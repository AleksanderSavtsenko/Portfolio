document.addEventListener('DOMContentLoaded', function() {
    // Burger menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);
    
    function showSection(sectionId) {
        navLinks.forEach(navLink => {
            if(navLink.getAttribute('href') === sectionId) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
        
        sections.forEach(section => {
            if(section.id === sectionId.substring(1)) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section id
            const targetId = this.getAttribute('href');
            
            window.location.hash = targetId;
            
            showSection(targetId);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });
    
    // Form submission with Formspree
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            
            // Send data to Formspree
            fetch('https://formspree.io/f/mkgjgqbb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                showFormMessage('success', 'Your message has been sent successfully!');
                
                // Reset form
                contactForm.reset();
            })
            .catch(error => {
                // Show error message
                showFormMessage('error', 'Oops! There was a problem sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {

                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Create function to show form message
    function showFormMessage(type, message) {

        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}-message`;
        messageElement.textContent = message;
        

        const contactForm = document.getElementById('contact-form');
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.classList.add('fade-out');
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.remove();
                    }
                }, 500);
            }
        }, 5000);
    }
    
    // View Certificate buttons
    const certificateButtons = document.querySelectorAll('.view-certificate');
    
    certificateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const certificateName = this.closest('.certificate-item').querySelector('h3').textContent;
            alert(`Viewing certificate: ${certificateName}`);
            
        });
    });
    
    // Social media links
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Don't prevent default if it has target="_blank"
            if(!this.getAttribute('target')) {
                e.preventDefault();
                
                // Get the platform from the icon class
                const platform = this.querySelector('i').className.split(' ')[1].split('-')[1];
                
                alert(`Opening ${platform} profile!`);
            }
        });
    });
    
    // Typing effect for the job title
    const jobTitle = document.querySelector('.highlight');
    
    if (jobTitle) {
        const text = jobTitle.textContent;
        jobTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                jobTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        if (document.getElementById('home').classList.contains('active')) {
            setTimeout(typeWriter, 1000);
        }
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home') {
                link.addEventListener('click', () => {
                    jobTitle.textContent = '';
                    i = 0;
                    setTimeout(typeWriter, 1000);
                });
            }
        });
    }
});

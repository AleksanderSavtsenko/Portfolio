document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    
    // Initial URL handling to show correct section on page load
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);
    
    function showSection(sectionId) {
        // Remove active class from all links and sections
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
            
            // Update URL hash
            window.location.hash = targetId;
            
            // Show appropriate section
            showSection(targetId);
            
            // Smooth scroll to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Update section on hash change (browser back/forward buttons)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Your message has been sent successfully!');
            
            // Reset form
            this.reset();
        });
    }
    
    // View Certificate buttons
    const certificateButtons = document.querySelectorAll('.view-certificate');
    
    certificateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get certificate name from parent element
            const certificateName = this.closest('.certificate-item').querySelector('h3').textContent;
            
            // In a real application, this would open the certificate
            alert(`Viewing certificate: ${certificateName}`);
            
            // You could redirect to an actual certificate like this:
            // window.location.href = 'path/to/your/certificate.pdf';
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
                
                // In a real application, this would open the social media profile
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
        
        // Start typing effect when home section is visible
        if (document.getElementById('home').classList.contains('active')) {
            setTimeout(typeWriter, 1000);
        }
        
        // Restart typing effect when home button is clicked
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
// Ensure scroll spy is initialized after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize scrollspy
    new bootstrap.ScrollSpy(document.body, {
      target: '#navbar'
    });
  });

document.addEventListener('DOMContentLoaded', function () {
    // Initialize scrollspy on the body
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 180 // Adjust this value based on your layout and navbar height
    });

    // Smooth scrolling on navigation links
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true,
        offset: 80 // Adjust this value based on your layout and navbar height
    });

    // Activate current section on scroll
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close responsive navbar menu on click
            var navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler) {
                navbarToggler.click();
            }
        });
    });

    // Highlight active navigation link on scroll
    var sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        var current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});


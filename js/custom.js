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

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectList = document.getElementById('project-list');

    // Get all project cards (the .col-12.col-lg-6 divs)
    const projectCards = projectList.querySelectorAll('.col-12.col-lg-6');

    function filterAndSearchProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter').toLowerCase();

        projectCards.forEach(card => {
            // Correctly select the project title using the new class
            const cardTitle = card.querySelector('.venue-name').textContent.toLowerCase();
            const cardCapsules = card.querySelectorAll('.proj-capsule');
            const technologies = Array.from(cardCapsules).map(capsule => capsule.textContent.toLowerCase());

            // Check if the project title or any of its capsules match the search term
            const titleMatch = cardTitle.includes(searchTerm);
            const technologyMatch = technologies.some(tech => tech.includes(searchTerm));
            const searchMatches = titleMatch || technologyMatch;

            // Check if the project's technologies include the active filter
            const filterMatches = activeFilter === 'all' || technologies.includes(activeFilter);

            // Show the card if both search and filter criteria are met
            if (searchMatches && filterMatches) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterAndSearchProjects);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons and add it to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            filterAndSearchProjects();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('project-search');
    const projectFilter = document.getElementById('project-filter');
    const projectList = document.getElementById('project-list');

    // Get all project cards 
    const projectCards = projectList.querySelectorAll('.col-12.col-lg-6');

    function filterAndSearchProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        // Get the value from the selected option in the dropdown
        const activeFilter = projectFilter.value.toLowerCase();

        projectCards.forEach(card => {
            // Correctly select the project title using the new class
            const cardTitle = card.querySelector('.venue-name').textContent.toLowerCase();
            const cardCapsules = card.querySelectorAll('.proj-capsule');
            const technologies = Array.from(cardCapsules).map(capsule => capsule.textContent.toLowerCase());

            // Check if the project title or any of its capsules match the search term
            const titleMatch = cardTitle.includes(searchTerm);
            const technologyMatch = technologies.some(tech => tech.includes(searchTerm));
            const searchMatches = titleMatch || technologyMatch;

            // Check if the project's technologies include the active filter
            const filterMatches = activeFilter === 'all' || technologies.includes(activeFilter);

            // Show the card if both search and filter criteria are met
            if (searchMatches && filterMatches) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterAndSearchProjects);

    projectFilter.addEventListener('change', filterAndSearchProjects);
});



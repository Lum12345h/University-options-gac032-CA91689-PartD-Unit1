document.addEventListener('DOMContentLoaded', () => {
    
    const universitiesDB = [
        {
            name: "Tec de Monterrey, Guadalajara Campus",
            location: "Zapopan, Jalisco",
            category: ["business", "tech"],
            careers: ["Business Strategy", "Industrial Eng.", "Computer Systems"]
        },
        {
            name: "Panamerican University, Guadalajara",
            location: "Zapopan, Jalisco",
            category: ["business", "tech"],
            careers: ["Business Mgmt.", "Finance", "Engineering"]
        },
        {
            name: "ITESO, Jesuit University",
            location: "Tlaquepaque, Jalisco",
            category: ["tech", "business"],
            careers: ["Network Eng.", "Int. Business", "Management"]
        },
        {
            name: "University of Guadalajara (UdeG)",
            location: "Guadalajara, Jalisco",
            category: ["social", "business", "tech"],
            careers: ["Social Work", "Administration", "Engineering"]
        },
        {
            name: "National Autonomous University of Mexico",
            location: "Coyoacán, CDMX",
            category: ["social", "tech", "business"],
            careers: ["Social Work", "Comp. Science", "Economics"]
        },
        {
            name: "ITAM - Autonomous Technological Institute",
            location: "Álvaro Obregón, CDMX",
            category: ["business"],
            careers: ["Fund Manager", "Financial Direction", "Economics"]
        },
        {
            name: "La Salle University",
            location: "Cuauhtémoc, CDMX",
            category: ["business", "tech"],
            careers: ["Int. Business", "Cybernetics Eng.", "Management"]
        },
        {
            name: "Tecmilenio University, Las Torres Campus",
            location: "Monterrey, Nuevo León",
            category: ["business", "tech"],
            careers: ["Business Admin.", "Software Eng."]
        },
        {
            name: "Autonomous University of the State of Mexico",
            location: "Toluca, Edo. Méx",
            category: ["social", "business"],
            careers: ["Social Work", "Administration"]
        },
        {
            name: "Technological Institute of Puebla",
            location: "Puebla, Puebla",
            category: ["tech"],
            careers: ["Industrial Eng.", "Business Mgmt."]
        }
    ];

    const universityListContainer = document.getElementById('university-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const clockElement = document.getElementById('clock');
    const body = document.body;

    function renderUniversities(filter = 'all') {
        universityListContainer.innerHTML = '';
        const filteredData = universitiesDB.filter(uni => {
            if (filter === 'all') return true;
            return uni.category.includes(filter);
        });

        if (filteredData.length === 0) {
            universityListContainer.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary)">No results found.</p>';
            return;
        }

        filteredData.forEach((uni, index) => {
            const card = document.createElement('div');
            card.className = 'uni-card';
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';

            const tagsHTML = uni.careers.map(career => `<span class="tag ${getCategoryColor(career)}">${career}</span>`).join('');

            card.innerHTML = `
                <h3>${uni.name}</h3>
                <div class="location"><i class="fa-solid fa-location-dot"></i> ${uni.location}</div>
                <div class="tags-list">
                    ${tagsHTML}
                </div>
            `;
            universityListContainer.appendChild(card);
        });
    }

    function getCategoryColor(careerText) {
        const text = careerText.toLowerCase();
        if (text.includes('business') || text.includes('admin') || text.includes('manager') || text.includes('finance') || text.includes('economics') || text.includes('mgmt')) return 'business';
        if (text.includes('systems') || text.includes('eng') || text.includes('software') || text.includes('comp') || text.includes('cyber')) return 'tech';
        return 'social';
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        const icon = themeToggleBtn.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderUniversities(category);
        });
    });

    themeToggleBtn.addEventListener('click', toggleTheme);

    setInterval(updateClock, 1000);
    updateClock();
    renderUniversities('all');
});

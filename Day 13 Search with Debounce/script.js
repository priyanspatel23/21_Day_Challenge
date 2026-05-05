const data = [
    { name: "React", category: "Frontend Library" },
    { name: "Angular", category: "Frontend Framework" },
    { name: "Vue", category: "Frontend Framework" },
    { name: "Svelte", category: "Frontend Framework" },
    { name: "Next.js", category: "Fullstack Framework" },
    { name: "Nuxt.js", category: "Frontend Framework" },

    { name: "JavaScript", category: "Programming Language" },
    { name: "TypeScript", category: "Programming Language" },
    { name: "Python", category: "Programming Language" },
    { name: "Java", category: "Programming Language" },
    { name: "C++", category: "Programming Language" },
    { name: "C#", category: "Programming Language" },

    { name: "Node.js", category: "Backend Runtime" },
    { name: "Express.js", category: "Backend Framework" },
    { name: "Django", category: "Backend Framework" },
    { name: "Flask", category: "Backend Framework" },
    { name: "Spring Boot", category: "Backend Framework" },

    { name: "MongoDB", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Firebase", category: "Backend Service" },

    { name: "HTML", category: "Markup Language" },
    { name: "CSS", category: "Style Language" },
    { name: "Tailwind CSS", category: "CSS Framework" },
    { name: "Bootstrap", category: "CSS Framework" },

    { name: "Git", category: "Version Control" },
    { name: "GitHub", category: "Code Hosting" },
    { name: "Docker", category: "DevOps Tool" },
    { name: "Kubernetes", category: "DevOps Tool" },

    { name: "Redux", category: "State Management" },
    { name: "Zustand", category: "State Management" },

    { name: "GraphQL", category: "API Technology" },
    { name: "REST API", category: "API Technology" }
];

const results = document.getElementById("results");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clearBtn");

let timer;

// render function
function render(items, query) {
    results.innerHTML = "";

    // ❌ if input empty → show nothing
    if (!query) return;

    if (items.length === 0) {
        results.innerHTML = "<p>No results found</p>";
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
      <strong>${item.name}</strong><br>
      <span>${item.category}</span>
    `;

        results.appendChild(div);
    });
}

// debounce
function debounce(fn, delay) {
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// search logic
function search(value) {
    const query = value.trim().toLowerCase();

    if (!query) {
        results.innerHTML = ""; // 👈 empty when no input
        return;
    }

    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    render(filtered, query);
}

const debouncedSearch = debounce(search, 400);

// input event
searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});

// clear button
clearBtn.onclick = () => {
    searchInput.value = "";
    results.innerHTML = ""; // 👈 clear results
};
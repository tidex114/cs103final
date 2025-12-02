// List of websites to use.
const sites = [
    { name: "Useless Recipe Generator", url: "../pages/Dylan-Mitzak-Useless-Recipes/main.html" },
    { name: "Useless History Writer", url: "../pages/Hansen-Qu-Useless-History-Writer/uhw.html" },
    { name: "The Useless Game", url: "../pages/Anthony-Ku-Useless-Game/index.html" },
    { name: "Authentication", url: "../pages/Ilia-Eremin-logmeinpls/index.html" },
    { name: "Useless Calculator", url: "../pages/Harry-Zhang-Useless-Calculator/useless-calculator.html" }
];

// references variables
const bigRedBtn = document.getElementById("bigRedBtn");
const logoBtn = document.getElementById("logoBtn");
const sideNav = document.getElementById("sideNav");
const overlay = document.getElementById("overlay");
const siteList = document.getElementById("siteList");

// navigation list
function buildNavList() {
    siteList.innerHTML = "";

    if (sites.length === 0) {
        return;
    }

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = site.name;
        a.href = site.url;
        a.target = "_blank"; // meaning open in a new tab instead of replace the one you have

        li.appendChild(a);
        siteList.appendChild(li);
    }
}

// Randomly
function goToRandomSite() {
    if (!sites.length) {
        alert("No websites configured");
        return;
    }

    const index = Math.floor(Math.random() * sites.length);
    const chosen = sites[index];
    // Navigate in the current tab
    window.location.href = chosen.url;
}

// Nav open/close
function openNav() {
    sideNav.classList.add("open");
    overlay.classList.add("visible");
    sideNav.setAttribute("aria-hidden", "false");
}

function closeNav() {
    sideNav.classList.remove("open");
    overlay.classList.remove("visible");
    sideNav.setAttribute("aria-hidden", "true");
}

function toggleNav() {
    if (sideNav.classList.contains("open")) {
        closeNav();
    } else {
        openNav();
    }
}

// Event bindings
if (bigRedBtn) {
    bigRedBtn.addEventListener("click", goToRandomSite);
}

if (logoBtn) {
    logoBtn.addEventListener("click", toggleNav);
}

if (overlay) {
    // 'meaning if you click somewhere else than nav when is open,
    // it will also close the nav panel.'
    overlay.addEventListener("click", closeNav);
}

// close nav with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sideNav.classList.contains("open")) {
        closeNav();
    }
});

// Initialize
buildNavList();

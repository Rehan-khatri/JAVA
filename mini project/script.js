const listings = [
  // Keeping your existing listing structure
  { title: "Beachfront Villa in Bali", location: "Bali, Indonesia", image: "download (1).jpeg", type: "rent" },
  { title: "Luxury Villa in Dubai", location: "Dubai, UAE", image: "download (2).jpeg", type: "buy" },
  { title: "Modern Apartment in Tokyo", location: "Tokyo, Japan", image: "download (3).jpeg", type: "rent" },
  { title: "Mountain Cabin Retreat", location: "Alps, Switzerland", image: "download (4).jpeg", type: "rent" },
  { title: "Countryside Mansion", location: "Tuscany, Italy", image: "download (5).jpeg", type: "buy" },
  { title: "Skyline Penthouse", location: "New York, USA", image: "download (6).jpg", type: "buy" }
];

function loadListings(filterType = "", searchTerm = "") {
  const container = document.getElementById("listingContainer");
  const sectionTitle = document.getElementById("section-title");

  let filtered = listings;
  // ... (rest of your loadListings function remains the same, not repeated here for brevity) ...

  if (filterType) {
    filtered = filtered.filter(item => item.type === filterType);
    sectionTitle.textContent = filterType === "buy" ? "Properties for Sale" : "Places to Rent";
  } else {
    sectionTitle.textContent = "Featured Properties";
  }

  if (searchTerm) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p>No results found.</p>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.location}</p>
        <button onclick="${item.type === 'buy' ? `handleFeatureClick('buy', '${item.title}')` : `handleFeatureClick('rent', '${item.title}')`}">
          ${item.type === 'buy' ? 'Buy Now' : 'Book Stay'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function searchPlaces() {
  const term = document.getElementById("searchInput").value;
  loadListings("", term);
}

function filterType(type) {
  loadListings(type);
}

function sellProperty() {
  alert("Sell feature coming soon. Contact us to list your property.");
}

function handleFeatureClick(action, title = '') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        alert(`Please log in to proceed with the ${action} feature.`);
        // Save the intended destination and title (optional)
        localStorage.setItem('redirectAfterLogin', action === 'buy' ? 'buy.html' : 'rent.html');
        localStorage.setItem('redirectTargetTitle', title); 
        window.location.href = 'login.html'; 
    } else {
        // If logged in, execute the action
        if (action === 'buy') {
            alert(`You've chosen to buy: ${title}`);
        } else if (action === 'rent') {
             alert(`You've booked a stay at: ${title}`);
        }
    }
}

window.onload = () => {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    loadListings();
  }
};


/**
 * Core navigation function for the header links.
 * Checks login status and handles redirects to the intended page.
 */
function handleNavigation(action) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let targetPage = '';

  if (action === 'home') {
    window.location.href = 'home.html';
    return;
  }
  
  if (action === 'rent') {
    targetPage = 'rent.html';
  } else if (action === 'buy') {
    targetPage = 'buy.html';
  } else if (action === 'sell') {
    targetPage = 'index.html'; // Assuming sell is just an alert on index page
  } else {
    // Other simple navigation (like About Us in the header)
    window.location.href = action; 
    return;
  }


  if (!isLoggedIn) {
    alert(`Please sign in to access ${action} properties.`);
    localStorage.setItem('redirectAfterLogin', targetPage);
    window.location.href = 'login.html';
  } else {
    if (action === 'sell') {
        sellProperty(); // If logged in, execute Sell action
    } else {
        window.location.href = targetPage; // If logged in, go directly to the page
    }
  }
}
const listings = [
  {
    title: "Beachfront Villa in Bali",
    location: "Bali, Indonesia",
    image: "download (1).jpeg",
    type: "rent"
  },
  {
    title: "Luxury Villa in Dubai",
    location: "Dubai, UAE",
    image: "download (2).jpeg",
    type: "buy"
  },
  {
    title: "Modern Apartment in Tokyo",
    location: "Tokyo, Japan",
    image: "download (3).jpeg",
    type: "rent"
  },
  {
    title: "Mountain Cabin Retreat",
    location: "Alps, Switzerland",
    image: "download (4).jpeg",
    type: "rent"
  },
  {
    title: "Countryside Mansion",
    location: "Tuscany, Italy",
    image: "download (5).jpeg",
    type: "buy"
  },
  {
    title: "Skyline Penthouse",
    location: "New York, USA",
    image: "download (6).jpg",
    type: "buy"
  }
];

function loadListings(filterType = "", searchTerm = "") {
  const container = document.getElementById("listingContainer");
  const sectionTitle = document.getElementById("section-title");

  let filtered = listings;

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
        <button onclick="${item.type === 'buy' ? `buyProperty('${item.title}')` : `bookProperty('${item.title}')`}">
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

function buyProperty(title) {
  alert(`You've chosen to buy: ${title}`);
}

function bookProperty(title) {
  alert(`You've booked a stay at: ${title}`);
}

function sellProperty() {
  alert("Sell feature coming soon. Contact us to list your property.");
}

window.onload = () => {
  loadListings();
};

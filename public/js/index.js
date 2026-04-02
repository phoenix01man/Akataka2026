document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  // Check if elements exist to avoid console errors
  if (btn && menu) {
    btn.addEventListener('click', () => {
      // This toggles the 'hidden' class which is a Tailwind utility
      menu.classList.toggle('hidden');
    });

    // Optional: Close menu when a link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
});// 1. Data Object
const details = [
  {
    title: "The Visionary",
    text: "With over two decades of experience in community building, our candidate has always prioritized progress over politics. This journey began with a simple belief: that everyone deserves a voice."
  },
  {
    title: "The Servant",
    text: "From local grassroots initiatives to national advocacy, service is at the heart of everything. We believe in leadership that gets its hands dirty and works directly with the people."
  },
  {
    title: "The Expert",
    text: "Armed with a background in Economics and Public Policy, our candidate brings the technical expertise required to navigate complex legislative challenges and deliver real fiscal results."
  }
];

// 2. The Core Function
function showDetail(index) {
  const title = document.getElementById('detail-title');
  const text = document.getElementById('detail-text');
  const cards = document.querySelectorAll('.about-card');

  // STEP A: Fade out text
  title.classList.replace('opacity-100', 'opacity-0');
  text.classList.replace('opacity-100', 'opacity-0');

  // STEP B: Swap text and Fade in after 300ms
  setTimeout(() => {
    title.innerText = details[index].title;
    text.innerText = details[index].text;
    title.classList.replace('opacity-0', 'opacity-100');
    text.classList.replace('opacity-0', 'opacity-100');
  }, 300);

  // STEP C: Update Indicators (Dots)
  for (let i = 0; i < 3; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (i === index) {
      dot.classList.replace('w-6', 'w-12');
      dot.classList.replace('bg-gray-200', 'bg-yellow-600');
    } else {
      dot.classList.replace('w-12', 'w-6');
      dot.classList.replace('bg-red-600', 'bg-green-600');
    }
  }

  // STEP D: Shuffle Cards Visually
  cards.forEach((card, i) => {
    // Reset defaults
    card.style.zIndex = "10";
    card.style.transform = "scale(0.9) translateX(64px) rotate(-6deg)";
    
    if (i === index) {
      // Bring Active to Front
      card.style.zIndex = "30";
      card.style.transform = "scale(1) translateX(0) rotate(0deg)";
    } else if ((i === index + 1) || (index === 2 && i === 0)) {
      // Move next to Middle
      card.style.zIndex = "20";
      card.style.transform = "scale(0.95) translateX(32px) rotate(-3deg)";
    }
  });
}

const allPosts = [
    {
        id: 1,
        category: "Event",
        date: "March 28, 2026",
        title: "Highlights from the City Hall Town Meeting",
        excerpt: "Over 500 residents joined us to discuss the new education initiative and local infrastructure needs.",
        img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800"
    },
    {
        id: 2,
        category: "Policy",
        date: "March 25, 2026",
        title: "A New Blueprint for Local Small Businesses",
        excerpt: "Discover our 5-point plan to revitalize the downtown core and support independent entrepreneurs.",
        img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800"
    },
    {
        id: 3,
        category: "Community",
        date: "March 22, 2026",
        title: "Volunteers Clean Up Westside Park",
        excerpt: "A beautiful Saturday spent restoring our green spaces. Thanks to everyone who showed up with a shovel!",
        img: "https://images.unsplash.com/photo-1559027615-cd7667dfd0f8?auto=format&fit=crop&w=800"
    },
];

function renderPosts(postsToDisplay) {
    const grid = document.getElementById('blog-grid');
    grid.innerHTML = ''; // Clear existing

    postsToDisplay.forEach(post => {
        const card = `
            <article class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all group">
                <div class="relative h-60 overflow-hidden">
                    <img src="${post.img}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-4 left-4 ${post.category === 'Policy' ? 'bg-yellow-600' : 'bg-red-600'} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">${post.category}</span>
                </div>
                <div class="p-8">
                    <time class="text-sm text-gray-400 font-medium">${post.date}</time>
                    <h3 class="text-2xl font-bold text-green-600 mt-2 mb-4 group-hover:text-yellow-600 transition-colors">${post.title}</h3>
                    <p class="text-gray-600 line-clamp-2 leading-relaxed">${post.excerpt}</p>
                    <a href="article.html?id=${post.id}" class="inline-block mt-6 font-black text-green-600 border-b-2 border-yellow-600 hover:text-red-600 hover:border-red-600 transition-all">READ ARTICLE</a>
                </div>
            </article>
        `;
        grid.innerHTML += card;
    });
}

function filterPosts(category) {
    if (category === 'all') {
        renderPosts(allPosts);
    } else {
        const filtered = allPosts.filter(p => p.category === category);
        renderPosts(filtered);
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(allPosts);
});
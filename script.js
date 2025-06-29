// --- All Page Scripts for Virgo Designs ---

// Data for Portfolio Projects
const projectData = {
  "claylight-casa": {
    title: "Claylight Casa",
    description: "A soothing blend of earthy textures and modern minimalism, Claylight Casa embodies grounded elegance through natural tones and mindful interior design.",
    images: [ "images/claylight/img31.jpg", "images/claylight/img45.jpg", "images/claylight/img52.jpg", "images/claylight/img59.jpg", "images/claylight/img109.jpg", "images/claylight/img177.jpg" ]
  },
  "atelier-grove": {
    title: "The Atelier Grove",
    description: "A serene design studio nestled in a cluster of trees — The Atelier Grove is where creativity meets minimal architecture, grounded in calm and clarity.",
    images: [ "images/Atelier/img131.jpg", "images/Atelier/img222.jpg", "images/Atelier/img50.jpg", "images/Atelier/img187.jpg", "images/Atelier/img194.jpg" ]
  },
  "velvet-meadow": {
    title: "Velvet Meadow",
    description: "An open, breezy layout meets soft, opulent textures in this tranquil home that merges indoor elegance with the essence of the outdoors.",
    images: [ "images/velvet-meadow/img114.jpg", "images/velvet-meadow/img137.jpg", "images/velvet-meadow/img184.jpg", "images/velvet-meadow/img37.jpg", "images/velvet-meadow/img177.jpg" ]
  },
  "ebon-solace": {
    title: "Ebon Solace",
    description: "Moody yet calm, Ebon Solace embraces deep hues, layered textures, and stillness — designed for comfort, introspection, and timeless sophistication.",
    images: [ "images/ebon-solace/img43.jpg", "images/ebon-solace/img22.jpg", "images/ebon-solace/img251.jpg", "images/ebon-solace/img202.jpg", "images/ebon-solace/img244.jpg" ]
  },
  "lumi-house": {
    title: "Lumi House",
    description: "Soft, radiant, and graceful — Lumi House features light-filled spaces designed with refined materials and a timeless sense of luxury.",
    images: [ "images/lumi-house/img50.jpg", "images/lumi-house/img41.jpg", "images/lumi-house/img23.jpg", "images/lumi-house/img65.jpg", "images/lumi-house/img100.jpg" ]
  }
};

document.addEventListener('DOMContentLoaded', function() {

  // --- State variables for the Lightbox ---
  let currentImages = [];
  let currentIndex = 0;

  // --- Element Selectors ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.querySelector('.sticky-header');

  // Portfolio Modal (Level 1)
  const portfolioModal = document.getElementById('portfolioModal');
  const closeModalBtn = document.getElementById('closeModal');

  // Lightbox Modal (Level 2)
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCloseBtn = document.getElementById('lightboxClose');
  const lightboxNextBtn = document.getElementById('lightboxNext');
  const lightboxPrevBtn = document.getElementById('lightboxPrev');

  // --- Mobile Menu & Header Logic ---
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('hidden'));

  if (header) {
      window.addEventListener('scroll', () => {
          header.classList.toggle('scrolled', window.scrollY > 100);
      });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (mobileMenu) mobileMenu.classList.add('hidden');
          if (targetId === '#') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
          }
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = header ? header.offsetHeight : 0;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
      });
  });

  // --- LEVEL 1: Project Gallery Modal Logic ---
  function openProjectModal(projectId) {
      const data = projectData[projectId];
      if (!data || !portfolioModal) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalDescription').textContent = data.description;
      const imagesDiv = document.getElementById('modalImages');
      imagesDiv.innerHTML = ''; 

      data.images.forEach((imgSrc, index) => {
          const imgEl = document.createElement('img');
          imgEl.src = imgSrc;
          imgEl.alt = data.title;
          imgEl.className = 'w-full h-auto rounded-lg shadow-md object-cover gallery-image';
          imgEl.dataset.index = index; // Store the index
          imgEl.addEventListener('click', () => openLightbox(data.images, index));
          imagesDiv.appendChild(imgEl);
      });

      portfolioModal.classList.remove('hidden');
      portfolioModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
      if (!portfolioModal) return;
      portfolioModal.classList.add('hidden');
      portfolioModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
      closeLightbox(); // Ensure lightbox is also closed
  }

  document.querySelectorAll('.portfolio-item').forEach(card => {
      card.addEventListener('click', function() {
          openProjectModal(this.dataset.projectId);
      });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (portfolioModal) portfolioModal.addEventListener('click', e => {
      if (e.target === portfolioModal) closeProjectModal();
  });

  // --- LEVEL 2: Lightbox Modal Logic ---
  function openLightbox(images, index) {
      currentImages = images;
      currentIndex = index;
      lightboxModal.classList.remove('hidden');
      lightboxModal.classList.add('flex');
      showImage(currentIndex);
  }

  function closeLightbox() {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
  }

  function showImage(index) {
      if (index < 0 || index >= currentImages.length) return;
      lightboxImage.src = currentImages[index];
      currentIndex = index;
      // Toggle nav buttons visibility
      lightboxPrevBtn.style.display = index === 0 ? 'none' : 'block';
      lightboxNextBtn.style.display = index === currentImages.length - 1 ? 'none' : 'block';
  }

  function showNextImage() {
      showImage(currentIndex + 1);
  }

  function showPrevImage() {
      showImage(currentIndex - 1);
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextImage);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevImage);

  // --- Keyboard Navigation for Both Modals ---
  document.addEventListener('keydown', function(e) {
      if (!portfolioModal.classList.contains('hidden')) { // If any modal is open
          if (e.key === "Escape") {
               // If lightbox is open, close it first. Otherwise, close the project modal.
              if (!lightboxModal.classList.contains('hidden')) {
                  closeLightbox();
              } else {
                  closeProjectModal();
              }
          }
          // Keyboard nav for lightbox
          if (!lightboxModal.classList.contains('hidden')) {
              if (e.key === "ArrowRight") showNextImage();
              if (e.key === "ArrowLeft") showPrevImage();
          }
      }
  });
});
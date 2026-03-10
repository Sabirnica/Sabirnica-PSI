//glavni podaci
    const imagesByCategory = {
      "2025/2026": [
        { name: "Kalendar nastave 25/26", url: "1images/25-26_raspored_rokova.png", category: "2025/2026" },
        { name: "1. God. - Zimski", url: "1images/imgSemestri/1_god_ZIMSKI.jpg", category: "2025/2026" },
        { name: "2. God. - Zimski", url: "1images/imgSemestri/2_god_ZIMSKI.jpg", category: "2025/2026" },
        { name: "3. God. - Zimski", url: "1images/imgSemestri/3_god_ZIMSKI.jpg", category: "2025/2026" },
        { name: "4. God. - Zimski", url: "1images/imgSemestri/4_god_ZIMSKI.jpg", category: "2025/2026" },
        { name: "Master - Zimski", url: "1images/imgSemestri/master_ZIMSKI.jpg", category: "2025/2026" },
        { name: "1. God. - Letnji", url: "1images/imgSemestri/1_god_Letnji.png", category: "2025/2026" },
        { name: "2. God. - Letnji", url: "1images/imgSemestri/2_god_Letnji.png", category: "2025/2026" },
        { name: "3. God. - Letnji", url: "1images/imgSemestri/3_god_Letnji.png", category: "2025/2026" },
        { name: "4. God. - Letnji", url: "1images/imgSemestri/4_god_Letnji.png", category: "2025/2026" },
        { name: "Master - Letnji", url: "1images/imgSemestri/master_LETNJI.png", category: "2025/2026" }
      ],
      "2023/2024": [
        { name: "Kalendar nastave 2023/2024", url: "1images/23-24_rad_kalendar.jpg", category: "2023/2024" }
      ]
    };

    const categoriesContainer = document.getElementById('categoriesContainer');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('imageModal');
    const modalWrapper = document.getElementById('modalWrapper');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');

    let currentScale = 1;
    const ZOOM_STEP = 0.05;
    const MAX_ZOOM = 3;
    const MIN_ZOOM = 0.5;

    // Load categories and images
    function loadCategories(categoriesData) {
      categoriesContainer.innerHTML = '';
      
      Object.keys(categoriesData).forEach(category => {
        const imagesInCategory = categoriesData[category].filter(image => image.url && image.url !== "");
        if (imagesInCategory.length === 0) return;
        
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        
        const imageGrid = document.createElement('div');
        imageGrid.className = 'image-grid';
        
        imagesInCategory.forEach(image => {
          const imageItem = document.createElement('div');
          imageItem.className = 'image-item';
          imageItem.innerHTML = `
            <img src="${image.url}" alt="${image.name}" loading="lazy">
            <div class="image-name">${image.name}</div>
          `;
          imageItem.addEventListener('click', () => openModal(image));
          imageGrid.appendChild(imageItem);
        });
        
        categorySection.appendChild(categoryTitle);
        categorySection.appendChild(imageGrid);
        categoriesContainer.appendChild(categorySection);
      });
    }

    // Search functionality
    function searchImages(searchTerm) {
      const filteredCategories = {};
      
      Object.keys(imagesByCategory).forEach(category => {
        const filteredImages = imagesByCategory[category].filter(image => 
          image.url && image.url !== "" && (
            image.name.toLowerCase().includes(searchTerm) || 
            image.category.toLowerCase().includes(searchTerm)
          )
        );
        
        if (filteredImages.length > 0) {
          filteredCategories[category] = filteredImages;
        }
      });
      
      loadCategories(filteredCategories);
    }

    // Open modal with clicked image
    function openModal(image) {
      modal.style.display = 'block';
      modalImage.src = image.url;
      modalCaption.textContent = image.name;
      currentScale = 1;
      
      // Reset scroll position
      modalWrapper.scrollTop = 0;
      modalWrapper.scrollLeft = 0;
      
      // Reset image to natural size
      resetImageSize();
    }

    // Reset image to natural size
    function resetImageSize() {
      modalImage.style.width = 'auto';
      modalImage.style.height = 'auto';
      modalImage.style.maxWidth = '100%';
      modalImage.style.maxHeight = '80vh';
      modalImage.style.transform = 'scale(1)';
    }

    // Update image size based on current scale
    function updateImageSize() {
      if (currentScale === 1) {
        resetImageSize();
      } else {
        modalImage.style.width = (modalImage.naturalWidth * currentScale) + 'px';
        modalImage.style.height = (modalImage.naturalHeight * currentScale) + 'px';
        modalImage.style.maxWidth = 'none';
        modalImage.style.maxHeight = 'none';
        modalImage.style.transform = 'none';
      }
    }

    // Zoom functionality
    function zoomImage(direction) {
      if (direction === 'in') {
        currentScale = Math.min(currentScale + ZOOM_STEP, MAX_ZOOM);
      } else if (direction === 'out') {
        currentScale = Math.max(currentScale - ZOOM_STEP, MIN_ZOOM);
      } else {
        currentScale = 1;
      }
      
      updateImageSize();
      
      // Center the view after zoom
      if (currentScale > 1) {
        modalWrapper.scrollLeft = (modalWrapper.scrollWidth - modalWrapper.clientWidth) / 2;
        modalWrapper.scrollTop = (modalWrapper.scrollHeight - modalWrapper.clientHeight) / 2;
      }
    }

    // Close modal
    function closeModal() {
      modal.style.display = 'none';
    }

    // Close modal
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === '') {
        loadCategories(imagesByCategory);
      } else {
        searchImages(searchTerm);
      }
    });

    // Zoom controls
    zoomInBtn.addEventListener('click', () => zoomImage('in'));
    zoomOutBtn.addEventListener('click', () => zoomImage('out'));
    resetZoomBtn.addEventListener('click', () => zoomImage('reset'));

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Update image size when it loads
    modalImage.addEventListener('load', () => {
      resetImageSize();
    });

    // Initial load
    loadCategories(imagesByCategory);


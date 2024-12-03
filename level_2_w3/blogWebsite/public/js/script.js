const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');

    hamburger.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    searchBtn.addEventListener('click', () => {
      searchInput.classList.toggle('expanded');
      searchInput.focus();
    });

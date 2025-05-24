const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const mainPage = document.getElementById('mainPage');

        function openMenu() {
            hamburgerBtn.classList.add('active');
            menuOverlay.classList.add('active');
            
            mainPage.style.filter = 'blur(2px)';
        }

        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
        
            mainPage.style.filter = 'none';
        }



        document.addEventListener('click', (e) => {
            if (menuOverlay.classList.contains('active') && 
                !e.target.closest('.menu-overlay') && 
                !e.target.closest('.burger-menu')) {
                closeMenu();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
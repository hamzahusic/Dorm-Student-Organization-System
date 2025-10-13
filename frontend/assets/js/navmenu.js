let boundButtons = [];

function bindMobileNavToggle() {
    const mobileNavToggleBtn = document.querySelectorAll('.mobile-nav-toggle');
    
    mobileNavToggleBtn.forEach(function(btn) {

        if (boundButtons.includes(btn)) {
            return;
        }

        boundButtons.push(btn);

        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const header = btn.closest('header');
            const mobileNav = header.querySelector('.mobile-nav');

            document.querySelectorAll('.mobile-nav').forEach(function(menu) {
                if(menu !== mobileNav) 
                    menu.classList.remove('mobile-nav-active');
            });
            
            document.querySelectorAll('.mobile-nav-toggle').forEach(function(toggle) {
                if(toggle !== btn)
                    toggle.classList.remove('active');
            });

            
            mobileNav.classList.toggle('mobile-nav-active');
            btn.classList.toggle('active');
        });
    });
    
    // Cleanup on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1200) {
            document.querySelectorAll('.mobile-nav').forEach(function(menu) {
                menu.classList.remove('mobile-nav-active');
            });
            document.querySelectorAll('.mobile-nav-toggle').forEach(function(btn) {
                btn.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}
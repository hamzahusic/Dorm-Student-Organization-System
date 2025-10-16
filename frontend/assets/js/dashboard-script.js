/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

const sideBars = []

const sideBarToggleScript = () => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelectorAll('#sidebarToggle');

    if (sidebarToggle.length > 0) {

        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }

        sidebarToggle.forEach((sideBar) => {
            if(sideBars.includes(sideBar)) return;

            sideBars.push(sideBar);

            sideBar.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        })
    }
}
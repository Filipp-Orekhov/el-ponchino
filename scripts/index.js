document.addEventListener('DOMContentLoaded', () => {
    const headerNavLinks = document.querySelectorAll('.link_style');
    

    const handleClickHeaderNavLinks = (event) => {
        event.preventDefault();
        event.target.classList.add('link_style_clicked');
    };

    const handleMouseIn = (event) => {
        event.target.classList.add('link_style_hovered');
    };

    const handleMouseOut = (event) => {
        event.target.classList.remove('link_style_hovered');
    };


    headerNavLinks.forEach((headerLink) => {
        headerLink.addEventListener('mouseover', handleMouseIn);
        headerLink.addEventListener('mouseout', handleMouseOut);
        headerLink.addEventListener('click', handleClickHeaderNavLinks);

    });

    const headerIcons = document.querySelectorAll('.header_login-cart_styles');

    const handleClickHeaderIcons = (event) => {
        event.preventDefault();
        event.target.classList.add('header_login-cart_styles_clicked');
    };

    headerIcons.forEach((headerIcon) => {
        headerIcon.addEventListener('click', handleClickHeaderIcons);
    });

});



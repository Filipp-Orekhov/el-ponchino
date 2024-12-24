// import '../style/style.scss';

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

    const headerCart = document.querySelector('.header_login-cart_styles.header_cart');
    const headerLogin = document.querySelector('.header_login-cart_styles.header_login');

    const handleClickHeaderIcons = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('header_login-cart_styles_clicked');
    };

    if (headerCart) {
        headerCart.addEventListener('click', handleClickHeaderIcons);
    }

    if (headerLogin) {
        headerLogin.addEventListener('click', handleClickHeaderIcons);
    }

});



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

    const carousel = document.querySelector(".carousel-wrapper");
    const items = document.querySelectorAll(".carousel-card-wrapper");
    const prevBtn = document.querySelector(".carousel-nav-left");
    const nextBtn = document.querySelector(".carousel-nav-right");

    let currentIndex = 0;

    function showItem(index) {
        // Hide all items-Скрыть все элементы
        items.forEach(item => (item.style.display = "none"));

        // Show the current item-Показать текущий элемент
        items[index].style.display = "block";
    }

    function showNextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function showPrevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    prevBtn.addEventListener("click", showPrevItem);
    nextBtn.addEventListener("click", showNextItem);

    // Initial display-Начальный дисплей
        showItem(currentIndex);

    //
    // Reset to the first item-Возврат к первому пункту
    //         currentIndex = 0;
    //         showItem(currentIndex);
    //     }catch (error){
    //         console.error("Error fetching images from Wikipedia:", error);
    //     }
    // }
    //
    // fetchImages();
});

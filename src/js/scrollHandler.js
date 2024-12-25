let scrollContainerFill = document.querySelector('#filling-buttons');
let scrollContainerGlaze = document.querySelector('#glaze-buttons');
let scrollBtn = document.querySelectorAll('.scroll-btn');
const galleryWidth = 540;

scrollContainerFill.addEventListener('wheel', (e) =>{
    e.preventDefault();
    scrollContainerFill.scrollLeft += e.deltaY;    
})

scrollContainerGlaze.addEventListener('wheel', (e) =>{
    e.preventDefault();
    scrollContainerGlaze.scrollLeft += e.deltaY;    
})

scrollBtn.forEach(button => {
    button.addEventListener('click', (e) =>{
        if (e.target.id === 'nextBtnFill') {
            scrollContainerFill.classList.add('scroll-smooth')
            scrollContainerFill.scrollLeft += galleryWidth; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='backBtnFill')
            btn.classList.remove('inactive')      
        }
        if (e.target.id === "backBtnFill") {
            scrollContainerFill.classList.add('scroll-smooth')
            scrollContainerFill.scrollLeft -= galleryWidth; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='nextBtnFill')
            btn.classList.remove('inactive')                 
        } 
        if (e.target.id === 'nextBtnGlaze') {
            scrollContainerGlaze.classList.add('scroll-smooth')
            scrollContainerGlaze.scrollLeft += galleryWidth; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='backBtnGlaze')
            btn.classList.remove('inactive')                
           }
        if (e.target.id === "backBtnGlaze") {
            scrollContainerGlaze.classList.add('scroll-smooth')
            scrollContainerGlaze.scrollLeft -= galleryWidth; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='nextBtnGlaze')
            btn.classList.remove('inactive')                
        }          
    })
})




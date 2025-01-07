let scrollContainerFill = document.querySelector('#filling-buttons');
let scrollContainerGlaze = document.querySelector('#glaze-buttons');
let scrollBtn = document.querySelectorAll('.scroll-btn');
const btndWidth = 135;

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
            scrollContainerFill.classList.add('scroll-smooth');            
            if (scrollContainerFill.scrollLeft + scrollContainerFill.clientWidth >= scrollContainerFill.scrollWidth-1)
              {  
                const scr = scrollContainerFill.scrollLeft;         
                scrollContainerFill.scrollLeft -= scr; 
            }
            else{
                scrollContainerFill.scrollLeft += btndWidth; 
            }     
        }
        if (e.target.id === "backBtnFill") {
            scrollContainerFill.classList.add('scroll-smooth')
            scrollContainerFill.scrollLeft -= btndWidth;              
        } 
        if (e.target.id === 'nextBtnGlaze') {
            scrollContainerGlaze.classList.add('scroll-smooth')
            if (scrollContainerGlaze.scrollLeft + scrollContainerGlaze.clientWidth >= scrollContainerGlaze.scrollWidth-1)
               {
                const scr1 = scrollContainerGlaze.scrollLeft;
                scrollContainerGlaze.scrollLeft -= scr1;
               }
            else {
                scrollContainerGlaze.scrollLeft += btndWidth; 
            }        
           }
        if (e.target.id === "backBtnGlaze") {
            scrollContainerGlaze.classList.add('scroll-smooth')
            scrollContainerGlaze.scrollLeft -= btndWidth;           
        }          
    })
})




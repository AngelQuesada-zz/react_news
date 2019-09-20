
let sidebar_width = 0;
let sidebar = ""

window.onload = () => {
    
    // Menu button

    const menu_button = document.getElementById('menu-button')
    sidebar = document.getElementById('sidebar')
    
    menu_button.addEventListener("click",()=>{
        sidebar_width = sidebar.offsetWidth
        if(element_has_class(sidebar, "show")){
            sidebar.classList.remove('show')
            sidebar.style.marginLeft = "-"+sidebar_width+"px"
        }else{
            if(element_has_class(sidebar, 'no-transition')) {
                sidebar.classList.remove('no-transition')
            }
            sidebar.classList.add('show')
            sidebar.style.marginLeft = null
        }
    })


    
}

window.onresize = () => {
    if(!element_has_class(sidebar, "show")){
        sidebar_width = sidebar.offsetWidth
        sidebar.classList.add('no-transition')
        sidebar.style.marginLeft = "-"+sidebar_width+"px"
    }
};

const element_has_class = (element, class_name) => {
    return element.classList.contains(class_name) ? true : false
}


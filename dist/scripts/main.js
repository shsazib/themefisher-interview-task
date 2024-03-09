// AOS Animation
AOS.init();




// navbar and hamburger
const group_active = document.querySelector('.group_active');
const phone_navbar_active = document.querySelectorAll('.phone_navbar_active');
const phone_navbar_active_bg = document.querySelector('.phone_navbar_active_bg');

function toggleClasses() {
    if (group_active.classList.contains("group")) {
        group_active.classList.remove("group");
        phone_navbar_active.forEach(element => {
            element.classList.remove("right-0");
            element.classList.add("-right-full");
        });
    } else {
        group_active.classList.add("group");
        phone_navbar_active.forEach(element => {
            element.classList.add("right-0");
            element.classList.remove("-right-full");
        });
    }
}

group_active.addEventListener("click", toggleClasses);
phone_navbar_active_bg.addEventListener("click", toggleClasses);




//portfolio tabs
const filterItem = document.querySelector(".portfolio_tabs");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = ()=>{
  filterItem.onclick = (selectedItem)=>{
    if(selectedItem.target.classList.contains("portfolio_tab")){
      filterItem.querySelector(".active").classList.remove("active");
      selectedItem.target.classList.add("active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name");
        if((filterImges == filterName) || (filterName == "all")){
          image.classList.remove("hide"); 
          image.classList.add("show"); 
        }else{
          image.classList.add("hide"); 
          image.classList.remove("show"); 
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)");
  }
}







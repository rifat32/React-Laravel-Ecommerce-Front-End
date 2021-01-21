export default function script() {
   
    window.onscroll = function() {
        navFunction()
        topNavFunction()
    };
  
      

      
        function topNavFunction(){
          var sideNav = document.getElementById("sideNav");
          if(sideNav)  {
            if (window.pageYOffset >= 120 && window.innerWidth > 992) {
              sideNav.classList.add("stickySide")
            } 
            else {
              sideNav.classList.remove("stickySide");
            }
          }
        }
    
    function navFunction() {
      var navbar = document.getElementById("nav-item");
   

     
        if (window.pageYOffset < 193) {
            navbar.classList.remove("sticky")
          } else {
            navbar.classList.add("sticky");
          }
         

      
       
       
    }
   
   
    



}
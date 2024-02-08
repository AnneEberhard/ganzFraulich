async function init() {
    await includeHTML();
  }

async function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        await fetch(file)
          .then(response => response.text())
          .then(data => {
            elmnt.innerHTML = data;
            elmnt.removeAttribute("w3-include-html");
          })
          .catch(error => {
            console.error(`Error fetching HTML: ${error}`);
          });
      }
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  function showMobileMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.remove("dNone"); 
  }
  
  function closeMobileMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.add("dNone");
  }
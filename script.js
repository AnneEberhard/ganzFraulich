let privacyChecked = false;

async function init() {
  await includeHTML();
  highlightCurrentPage();
}

async function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      await fetch(file)
        .then((response) => response.text())
        .then((data) => {
          elmnt.innerHTML = data;
          elmnt.removeAttribute("w3-include-html");
        })
        .catch((error) => {
          console.error(`Error fetching HTML: ${error}`);
        });
    }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.remove("dNone");
  mobileNav.classList.add("easeIn");
}

function closeMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.add("dNone");
  mobileNav.classList.remove("easeIn");
}

function highlightCurrentPage() {
  const currentPage = window.location.pathname;
  if (currentPage.includes("index.html")) {
    makeLinkBold("linkIndex");
  } else if (currentPage.includes("workshopWeiblich.html")) {
    makeLinkBold("linkWeiblich");
  } else if (currentPage.includes("workshopGrenzen.html")) {
    makeLinkBold("linkGrenzen");
  } else if (currentPage.includes("/workshopSpuerbar.html")) {
    makeLinkBold("linkSpuerbar");
  } else if (currentPage.includes("/workshopGekonnt.html")) {
    makeLinkBold("linkGekonnt");
  } else if (currentPage.includes("/workshopVerletzlich.html")) {
    makeLinkBold("linkVerletzlich");
  } else if (currentPage.includes("/imprint.html")) {
    makeLinkBold("linkImpressum");
  } else if (currentPage.includes("/privacy-policy.html")) {
    makeLinkBold("linkDatenschutz");
  } else if (currentPage.includes("/contact.html")) {
    makeLinkBold("linkKontakt");
  } 
}

function makeLinkBold(linkId) {
  const link = document.getElementById(linkId);
  if (link) {
      link.classList.add('bold');
  }
}

function checkPrivacy() {
  if (!privacyChecked) {
      privacyContainerBox.innerHTML = '<img src="assets/img/checkmarkPetrol.png" class="checkmark">';
      sendButton.disabled = false;
      sendButton.classList.add('hoverButton');
      privacyChecked = true;
      privacyAlert.classList.add('dNone');
  } else {
      privacyContainerBox.innerHTML = '';
      sendButton.disabled = true;
      sendButton.classList.remove('hoverButton');
      privacyChecked = false;
      privacyAlert.classList.remove('dNone');
  }
}

async function sendMail() {
  disableFields();
  try {
      const formData = new FormData(document.getElementById('contactForm'));
      const response = await fetch('send_mail.php', {
          method: 'POST',
          body: formData
      });
      if (response.ok) {
          alert('Erfolgreich versendet');
          clearFields();
      } else {
          throw new Error('Fehler beim Senden');
      }
  } catch (error) {
      console.error('Fehler:', error);
      alert('Fehler beim Senden');
  } finally {
      enableFields();
  }
}

function disableFields() {
  nameField.disabled = true;
  emailField.disabled = true;
  messageField.disabled = true;
  sendButton.disabled = true;
}

function enableFields() {
  nameField.disabled = false;
  emailField.disabled = false;
  messageField.disabled = false;
  sendButton.disabled = false;
}

function clearFields() {
  nameField.value = '';
  emailField.value = '';
  messageField.value = '';
}
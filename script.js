let privacyChecked = false;
let newsletterStatus = false;

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

function checkPrivacy() {
  if (!privacyChecked) {
    privacyContainerBox.innerHTML =
      '<img src="assets/img/checkmarkPetrol.png" class="checkmark">';
    sendButton.disabled = false;
    sendButton.classList.add("hoverButton");
    privacyChecked = true;
    privacyAlert.classList.add("dNone");
  } else {
    privacyContainerBox.innerHTML = "";
    sendButton.disabled = true;
    sendButton.classList.remove("hoverButton");
    privacyChecked = false;
    privacyAlert.classList.remove("dNone");
  }
}

async function sendMail() {
  try {
    const formData = new FormData(document.getElementById("contactForm"));
    console.log([...formData.entries()]);
    disableFields();
    const response = await fetch("send_mail.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      document.getElementById("alertMessageSent").classList.remove("dNone");
      clearFields();
      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    } else {
      throw new Error("Fehler beim Senden");
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Fehler beim Senden");
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
  nameField.value = "";
  emailField.value = "";
  messageField.value = "";
}

function cancel() {
  document.getElementById("optInContainer").classList.add("dNone");
}

function optInNewsletter() {
  newsletterBox.innerHTML =
    '<img src="assets/img/checkmarkPetrol.png" class="checkmark">';
  newsletterStatus = true;
  newsletter.value = 1;
  document.getElementById("optInContainer").classList.add("dNone");
}

function checkNewsletter() {
  if (!newsletterStatus) {
    document.getElementById("optInContainer").classList.remove("dNone");
  } else {
    newsletterBox.innerHTML = "";
    newsletterStatus = false;
    newsletter.value = 0;
  }
}

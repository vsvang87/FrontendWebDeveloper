import { projectData } from "./data.js";
import { moreProjectData } from "./moreprojects.js";

const form = document.getElementById("my-form");
const modalCloseBtn = document.getElementById("modal-btn");
const readMoreBtn = document.getElementById("read-more-btn");
const modal = document.getElementById("modal");
const navbar = document.getElementById("navbar");
const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerCloseBtn = document.getElementById("hamburger-close");
const navLink = document.querySelectorAll(".nav-link");
const projectContainer = document.getElementById("project-render-container");
const moreProjectContainer = document.getElementById("more-project-container");

//open modal
readMoreBtn.addEventListener("click", () => {
  modal.classList.add("open");
});
//close modal
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});
//open hamburger menu
hamburgerBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});
//close hamburger menu
hamburgerCloseBtn.addEventListener("click", () => {
  navbar.classList.remove("open");
});

//close hamburger menu when click on link
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
  });
});

//rendering first 3 projects data into HTML
function renderProjectToHTMl() {
  projectData.forEach((project) => {
    const { id, name, img, stacks, description, url, github } = project;
    projectContainer.innerHTML += `
    <div class="landing-page-column reveal">
                <div class="img-div">
                  <img src="${img}" alt="" />
                </div>
                <div class="description">
                  <p class="bold-text">${name}</p>
                  <small>${stacks}</small>
                  <p>
                    ${description}
                  </p>
                  <div class="view-github-button">
                    <a
                      href="${url}"
                      target="_blank"
                      class="view-btn"
                      >View</a
                    >
                    <a
                      href="${github}"
                      target="_blank"
                      class="view-btn"
                      >Github</a
                    >
                  </div>
                </div>
              </div>
    `;
  });
}
renderProjectToHTMl();

//rendering the lat 3 projects data into HTML
function moreProjects() {
  moreProjectData.forEach((project) => {
    const { id, name, img, stacks, description, url, github } = project;
    moreProjectContainer.innerHTML += `
    <div class="mini-inner-content reveal">
              <div class="img-div">
                <img src="${img}" alt="" />
              </div>
              <div class="description">
                <p class="bold-text">${name}</p>
                <small>${stacks}</small>
                <p>
                  ${description}
                </p>
                <div class="view-github-button">
                  <a
                    href="${url}"
                    target="_blank"
                    class="view-btn"
                    >View</a
                  >
                  <a
                    href="${github}"
                    target="_blank"
                    class="view-btn"
                    >Github</a
                  >
                </div>
              </div>
    `;
  });
}
moreProjects();
//form submit handler
async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("status");
  let data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add("success");
        status.innerHTML = "Success! Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.classList.add("error");
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);

//scroll animation
window.addEventListener("scroll", reveal);

function reveal() {
  const sections = document.querySelectorAll(".reveal");

  //loop through all sections
  for (let i = 0; i < sections.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = sections[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      sections[i].classList.add("active");
    }
  }
}

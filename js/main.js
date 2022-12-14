const form = document.getElementById("my-form");
const modalCloseBtn = document.getElementById("modal-btn");
const readMoreBtn = document.getElementById("read-more-btn");
const modal = document.getElementById("modal");

//open modal
readMoreBtn.addEventListener("click", () => {
  modal.classList.add("open");
});
//close modal
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

//form submit handler
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
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

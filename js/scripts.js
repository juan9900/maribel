$(document).ready(function () {
  const currentYear = new Date().getFullYear();
  $("#current-year").text(currentYear);
  new Splide("#card-carousel", {
    perPage: 3,
    breakpoints: {
      640: {
        perPage: 1,
      },
    },
  }).mount();

  const newsletterForm = $("#mc-embedded-subscribe-form");

  newsletterForm.on("submit", function (e) {
    // const formData = new FormData(newsletterForm);
    // console.log(formData);
    const userEmail = $("#mce-EMAIL").val();
    const userName = $("#mce-FNAME").val();
    const userLastName = $("#mce-LNAME").val();
    if (!validateInput(userName) || !validateInput(userLastName)) {
      formError(
        "El nombre y/o apellido no pueden contener números o caracteres especiales."
      );
      return;
    }

    const data = {
      email: userEmail,
      fname: userName || "",
      lname: userLastName || "",
    };
    e.preventDefault();
    console.log("enviadp");
    $.ajax({
      type: "GET",
      url: "https://beacons.us12.list-manage.com/subscribe/post-json?u=d5bad1c1ff57de0d423488676&amp;id=63eb1143f8&amp;f_id=00fa47e0f0&c=?",
      data: $(newsletterForm).serialize(),
      dataType: "json",
      success: function (response) {
        console.log(response);

        if (response.result === "success") {
          formSuccess();
        } else {
          formError(
            "Ha habido un error, verifica los datos e intenta de nuevo."
          );
        }
      },
      error: function (error) {
        // If the request failed, show an error message.
        console.log(e);
      },
    });
  });
});

function validateInput(input) {
  // Create a regular expression that matches only letters.
  const regex = /^[a-zA-Z]+$/;

  // Check if the input matches the regular expression.
  if (!regex.test(input)) {
    // The input contains numbers or special characters.
    return false;
  } else {
    // The input only contains letters.
    return true;
  }
}

function formError(message) {
  $("#mce-error-response").text(message).css("display", "block");

  $("#mce-success-response").css("display", "none");
}

function formSuccess() {
  $("#mce-success-response")
    .text("¡Te has suscrito con éxito!")
    .css("display", "block");
  $("#mce-error-response").css("display", "none");
}

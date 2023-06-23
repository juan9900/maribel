new Splide("#card-carousel", {
  perPage: 3,
  breakpoints: {
    640: {
      perPage: 1,
    },
    1024: {
      perPage: 2,
    },
  },
  drag: false,
  // type: "loop",
}).mount();

// America countries in Spanish with flag
const countryList = {
  americaCountries: [
    "Estados Unidos",
    "Canadá",
    "México",
    "Guatemala",
    "Belice",
    "Honduras",
    "Nicaragua",
    "Costa Rica",
    "Panamá",
    "Colombia",
    "Venezuela",
    "Ecuador",
    "Perú",
    "Bolivia",
    "Chile",
    "Argentina",
    "Uruguay",
    "Paraguay",
    "Brasil",
  ],
  europeCountries: [
    "Alemania",
    "Austria",
    "Bélgica",
    "Bulgaria",
    "Chipre",
    "Chequia",
    "Dinamarca",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estonia",
    "Finlandia",
    "Francia",
    "Grecia",
    "Hungría",
    "Irlanda",
    "Italia",
    "Letonia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Malta",
    "Moldavia",
    "Montenegro",
    "Países Bajos",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "Rumania",
    "Rusia",
    "San Marino",
    "Serbia",
    "Suecia",
    "Suiza",
  ],
  key: function (n) {
    return this[Object.keys(this)[n]];
  },
};

$("#user-continent").on("change", function () {
  // const selectedIndex = $(this).prop("selectedIndex");
  // hideStates();
  // fillCountries(selectedIndex);
  console.log("changed");
});

$("#user-country").on("change", function () {
  const selectedCountry = $(this).val();
  if (selectedCountry === "Venezuela") {
    $("#user-state, #label-user-state").removeClass("invisible");
  } else {
    hideStates();
  }
});

function hideStates() {
  $("#user-state, #label-user-state").addClass("invisible");
}

function fillCountries(listIndex) {
  $("#user-country").empty();

  countryList.key(listIndex).map((country) => {
    return $("#user-country").append(
      `<option value="${country}">${country}</option>`
    );
  });
}

const selected = $(".selected");
const optionsList = $(".option");

selected.on("click", function () {
  const optionsContainer = $(this).siblings(".options-container");
  $(optionsContainer).toggleClass("active");
  addOptionListener(this, optionsContainer);
});

$(".form-continent").on("");

function addOptionListener(selectNode, optionsContainer) {
  $(selectNode)
    .siblings(".options-container")
    .children()
    .each((i, obj) => {
      $(obj).on("click", () => {
        $(selected).text($(obj).text());

        $(optionsContainer).removeClass("active");
      });
    });
}

function versandkosten() {
  console.log("called versandkosten");
}
$(document).ready(function () {
  var observer = new MutationObserver(function (e) {
    versandkosten();
  });
  var $basketAmount = $("#form-continent");
  observer.observe($($basketAmount)[0], {
    childList: true,
  });
});

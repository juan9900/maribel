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
  america: [
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
  europa: [
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

const nameMapping = {
  diabetico: "¿Es diabético?",
  dialisis: "¿Está recibiendo tratamiento de diálisis?",
  cancer: "¿Es paciente actual de cáncer?",
  cardiovascular: "Tiene alguna enfermedad cardiovascular en la actualidad?",
  continent: "Continente",
  country: "País",
  state: "Estado",
  birthdate: "Fecha de nacimiento",
  sex: "Sexo",
  name: "Nombre y apellido",
  email: "Correo electrónico",
  phone: "Numero telefónico",
  duration: "Duración del período",
  accident: "Tipo de seguro",
};

const selected = $(".selected");
const optionsList = $(".option");

selected.on("click", function (e) {
  e.stopPropagation();
  $(".selected").removeClass("active");
  $(".options-container").removeClass("active");
  $(this).addClass("active");
  const optionsContainer = $(this).siblings(".options-container");
  $(optionsContainer).toggleClass("active");
  addOptionListener(this, optionsContainer);
});

function addOptionListener(selectNode, optionsContainer) {
  $(selectNode)
    .siblings(".options-container")
    .children()
    .each((i, obj) => {
      $(obj)
        .not(".state, .sex")
        .on("click", () => {
          $(selectNode).text($(obj).text());
          $(selectNode).removeClass("active");
          $(optionsContainer).removeClass("active");

          if ($(selectNode).text().trim() === "Venezuela") {
            const closestStateSelect = $(selectNode)
              .parent()
              .parent()
              .siblings()
              .closest(".state-select");
            $(closestStateSelect).removeClass("invisible");

            $(closestStateSelect).find(".form-state").removeClass("invisible");
          } else {
            $(".state-select").addClass("invisible");
            $(".form-state").addClass("invisible");
          }
          const objValue = $(selectNode).text().trim().toLowerCase();
          if (objValue === "américa" || objValue === "europa") {
            updateCountries(objValue, obj);
          }
        });

      $(".state").on("click", function () {
        $(".form-state").text($(this).text());
      });

      $(".sex").on("click", function () {
        $(".form-sex").text($(this).text());
      });
    });
}

function updateCountries(selectedContinent, obj, list = null) {
  var countriesList = null;
  if (list !== null) {
    countriesList = list;
  } else {
    countriesList = $(obj)
      .parent()
      .parent()
      .parent()
      .siblings()
      .closest(".country-select")
      .find(".options-container");
  }

  const selectedCountry = $(countriesList).parent().find(".selected");

  $(".state-select").addClass("invisible");
  $(".form-state").addClass("invisible");
  var countryListValue = "";
  switch (selectedContinent) {
    case "américa":
      countryListValue = "america";
      break;
    case "europa":
      countryListValue = "europa";
      break;
    default:
      countryListValue = "america";
      break;
  }
  $(countriesList).empty();

  countryList[countryListValue].map((country) => {
    return $(countriesList).append(`<div class="option">
    <input class="radio" type="radio" name="${country}" id="country-${country}" value="${country}">
    <label for="country-${country}">${country}</label></div>
    `);
  });

  $(selectedCountry).text(countryList[countryListValue][0]);
}

$(document).ready(function () {
  var formContinent = $(".form-continent");
  var formCountry = $(".form-country");
  var observerContinent = new MutationObserver(function (e) {
    updateCountries();
  });
  observerContinent.observe($(formContinent)[0], {
    childList: true,
  });

  $(".options-country").each((index, obj) => {
    updateCountries("america", null, obj);
  });
});

$(".modal-product").on("click", function () {
  $(".selected").removeClass("active");
  $(".options-container").removeClass("active");
});

$(".btn-modal").on("click", function () {
  resetForms();
});

$(".btn-modal-general").on("click", function () {
  const data = $(this).data("product").toLowerCase().replace(" ", "-");

  $("#modal-general .modal-title").text($(this).data("product"));
  $("#modal-general .general-img").prop(
    "src",
    `/assets/img/icons/${data}-icon.svg`
  );
});

function resetForms() {
  $(".form-continent").text("América");
  $(".form-country").text("Estados Unidos");
  $(".form-sex").text("Masculino");
  $(".state-select").addClass("invisible");
  $(".form-state").addClass("invisible");
}

$(".btn-quote").on("click", function (e) {
  e.preventDefault();
  const currentForm = $(this)
    .parent()
    .siblings()
    .closest(".modal-body")
    .find("form");
  var formData = {};

  var formTitle = $(this).parent().siblings().find("h4").text();
  formData["Plan de seguro"] = formTitle;

  //Serialize input values
  $(currentForm)
    .find(".form-input")
    .each(function () {
      if ($(this).is(":radio")) {
        // Check if it's a radio button
        if ($(this).is(":checked")) {
          formData[nameMapping[$(this).attr("name")]] = $(this).val();
        }
      } else {
        formData[nameMapping[$(this).attr("name")]] = $(this).val().trim();
      }
    });

  $(currentForm)
    .find(".selected")
    .not(".invisible")
    .each(function () {
      formData[nameMapping[$(this).data("field")]] = $(this).text().trim();
    });

  formData["_subject"] = "Nueva solicitud de informacion en www.maribel.com";

  $.ajax({
    method: "POST",
    url: "https://formsubmit.co/ajax/juanluislauretta@gmail.com",
    dataType: "json",
    accepts: "application/json",
    data: formData,
    success: (data) => {
      if (data.success) {
        $(this).closest(".modal").hide();
        $(".modal-confirmation").css("display", "block");
      }
    },
    error: (err) => {
      $(this).closest(".modal").hide();
      $(".modal-error").css("display", "block");
    },
  });
});

$(".btn-close-confirmation").on("click", function () {
  $(this).closest(".modal-after-form").css("display", "none");
  $(".modal-backdrop").remove();
  $("body").removeClass("modal-open").css({
    "padding-right": "auto",
    overflow: "auto",
  });
});

$("input[name=name]").on("input", checkName);
$("input[name=phone]").on("input", checkPhone);
$("input[name=email]").on("input", checkEmail);

function checkName(e) {
  var c = this.selectionStart,
    r = /[^a-z ]/gi,
    v = $(this).val();
  if (r.test(v)) {
    $(this).val(v.replace(r, ""));
    c--;
  }
  this.setSelectionRange(c, c);
}

function checkPhone(e) {
  var c = this.selectionStart,
    r = /[^+0-9 -]/gi,
    v = $(this).val();
  if (r.test(v)) {
    $(this).val(v.replace(r, ""));
    c--;
  }
  this.setSelectionRange(c, c);
}

function checkEmail(e) {
  var c = this.selectionStart,
    r = /[^a-z0-9.@_]/gi,
    v = $(this).val();
  if (r.test(v)) {
    $(this).val(v.replace(r, ""));
    c--;
  }
  this.setSelectionRange(c, c);
}

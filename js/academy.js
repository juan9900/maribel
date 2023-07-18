const nameMapping = {
  name: "Nombre y apellido",
  email: "Correo electrónico",
  phone: "Número telefónico",
  country: "País",
  city: "Ciudad",
  broker: "¿A qué broker perteneces?",
  insurance: "Compañías de seguros que ofreces",
  topics: "Temas interesados en aprender",
  course: "¿Buscas un curso o mentoría personal?",
  "broker-name": "Nombre del bróker",
  "represent-name": "Nombre del representante",
  "agents-qty": "Cantidad de agentes",
  "selling-products": "Productos que vendes",
  "sales-force": "¿Qué temas quisieras trabajar con su fuerza de ventas?",
};

$(document).ready(() => {
  $(
    "input[name=name], input[name=country], input[name=city], input[name=broker], input[name=insurance], input[name=topics], input[name=course], input[name=broker-name], input[name=represent-name], input[name=selling-products], input[name=sales-force]"
  ).on("input", checkName);
  $("input[name=phone], input[name=agents-qty]").on("input", checkPhone);
  $("input[name=email]").on("input", checkEmail);

  $(".btn-quote").on("click", function (e) {
    e.preventDefault();
    const currentForm = $(this)
      .parent()
      .siblings()
      .closest(".modal-body")
      .find("form");
    var formData = {};

    var formTitle = $(this).parent().siblings().find("h4").text();
    formData["Tipo de solicitud"] = formTitle;

    $(currentForm)
      .find(".form-input")
      .each(function () {
        formData[nameMapping[$(this).attr("name")]] = $(this).val().trim();
      });

    formData["_subject"] =
      "Nueva solicitud de informacion para academia en www.maribel.com";

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
});

$(".btn-close-confirmation").on("click", function () {
  $(this).closest(".modal-after-form").css("display", "none");
  $(".modal-backdrop").remove();
  $("body").removeClass("modal-open").css({
    "padding-right": "auto",
    overflow: "auto",
  });
});

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

const header = $(".header-content-index");

var waypoint = new Waypoint({
  element: header,
  handler: function () {
    $(header).addClass("animate__animated animate__fadeInUp");
  },
  offset: 400,
});

const messageContainer = $(".message-container");

var waypoint = new Waypoint({
  element: messageContainer,
  handler: function () {
    $(messageContainer)
      .addClass("animate__animated animate__fadeInRight")
      .removeClass("invisible");
  },
  offset: 600,
});

const testimonialsContainer = $(".testimonials-container");

var waypoint = new Waypoint({
  element: testimonialsContainer,
  handler: function () {
    $(testimonialsContainer)
      .addClass("animate__animated animate__fadeInUp")
      .removeClass("invisible");
  },
  offset: 800,
});

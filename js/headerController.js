document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  setHeaderFocusController();
  setHueWithScrollInfo();
  configureNavButton();
}

function setHeaderFocusController() {
  const header = document.querySelector("header");
  const onScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    header.setAttribute("focus", scrolled >= 1 ? "off" : "on");
  };
  document.addEventListener("scroll", onScroll);
}

function setHueWithScrollInfo() {
  const root = document.querySelector(":root");

  const onScroll = () => {
    const dinamicHuePercent =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.offsetHeight);
    const dinamicHue = dinamicHuePercent * ((360 / 9) * 8);
    root.style.setProperty("--dinamic-hue", dinamicHue.toFixed(0) + "deg");
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
}
function configureNavButton() {
  const btn = document.querySelector("#mobile-menu-button");
  const nav = document.querySelector("nav");
  btn &&
    btn.addEventListener("click", () => {
      nav.setAttribute(
        "show",
        nav.getAttribute("show") == "off" ? "on" : "off"
      );
    });
}

document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  setHeaderFocusController();
  setHueWithScrollInfo();
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
    const dinamicHue = dinamicHuePercent * 360;
    root.style.setProperty("--dinamic-hue", dinamicHue.toFixed(0));
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
}

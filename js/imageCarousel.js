const url =
  "https://i.pinimg.com/originals/bf/79/ad/bf79ad6a444158aadf74dbb6b7da3587.jpg";

class ImageCarousel extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const mainImg = document.createElement("img");
    const animationImg = document.createElement("img");
    const container = document.createElement("div");
    const styles = document.createElement("style");

    container.append(mainImg, animationImg);
    shadow.append(container, styles);

    styles.innerHTML = `
    div {
    }
    img {
        width:100%;
        height:100%;
    }
        
    `;

    mainImg.src = url;
  }
}
customElements.define("image-carousel", ImageCarousel);

class BackgroundItem {
  constructor(x = 0, radius) {
    this.x = x;

    this.radius = BackgroundItem.Random(30, 200);
    this.y = 0 - this.radius;
    this.color = `hsla(${BackgroundItem.Random(0, 50)},100%,50%,${
      BackgroundItem.Random(20, 100) / 100
    })`;
    this.effectStrength = BackgroundItem.Random(10, 50) / 100;
  }
  useEffect() {
    this.y += 10 * this.effectStrength;
  }
  static Random(min = 0, max = 0) {
    return Math.floor(Math.random() * max - min + min);
  }
}
function onLoad() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  document.body.append(canvas);

  canvas.style.position = "fixed";
  canvas.style.zIndex = "-1";
  canvas.style.top = "0";
  canvas.style.filter = "blur(10px) hue-rotate(var(--dinamic-hue))";
  canvas.style.opacity = ".3";
  canvas.style.transform = "rotateX(180deg)";

  const onResize = () => {
    canvas.width = screen.width;
    canvas.height = screen.height;
  };
  window.addEventListener("resize", onResize);
  onResize();

  const backgroundData = {
    itens: [new BackgroundItem()],
    createdAt: null,
    nextCreation: null,
  };
  window.backgroundData = backgroundData;
  function onUpdateFrame() {
    if (
      backgroundData.createdAt == null ||
      backgroundData.createdAt + backgroundData.nextCreation <= Date.now()
    ) {
      backgroundData.itens.push(
        new BackgroundItem(BackgroundItem.Random(0, ctx.canvas.width))
      );
      backgroundData.createdAt = Date.now();
      backgroundData.nextCreation = BackgroundItem.Random(100, 800);
    }
    for (const bgItem of backgroundData.itens) {
      bgItem.useEffect();
    }

    backgroundData.itens = backgroundData.itens.filter(
      (bgItem) => !(bgItem.y - bgItem.radius > ctx.canvas.height)
    );
  }
  function onRenderFrame() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const bgItem of backgroundData.itens) {
      ctx.beginPath();
      ctx.fillStyle = bgItem.color;
      ctx.arc(bgItem.x, bgItem.y, bgItem.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  const requestAnimationFrameFunction = () => {
    onUpdateFrame();
    onRenderFrame();
    requestAnimationFrame(requestAnimationFrameFunction);
  };

  requestAnimationFrame(requestAnimationFrameFunction);
}

document.addEventListener("DOMContentLoaded", onLoad);

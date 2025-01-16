function removeWhiteSpaceChar(text) {
  return text.replace(/\&nbsp;/g, " ");
}

const toolbar = ["bold", "italic", "underline"];
const formats = ["bold", "italic", "underline"];
const placeholder = "Placeholder";

const quillBubble = new Quill("#bubble", {
  placeholder,
  formats,
  modules: {
    toolbar,
  },
  theme: "bubble",
});

const quillSnow = new Quill("#snow", {
  placeholder,
  formats,
  modules: {
    toolbar,
  },
  theme: "snow",
});

function update(quill, id) {
  let html = quill.getSemanticHTML(0);
  document.querySelector(`#${id}-display`).innerHTML = html;
  document.querySelector(`#${id}-html`).textContent = html;
  document.querySelector(`#${id}-formatted`).textContent =
    removeWhiteSpaceChar(html);
}

function updateBubbleQuill() {
  update(quillBubble, "bubble");
}

function updateSnowQuill() {
  update(quillSnow, "snow");
}

updateBubbleQuill();
updateSnowQuill();

quillBubble.on("text-change", (delta, oldDelta, source) => {
  updateBubbleQuill();
});

quillSnow.on("text-change", (delta, oldDelta, source) => {
  updateSnowQuill();
});

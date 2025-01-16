const toolbar = ["bold", "italic", "underline"];
const formats = ["bold", "italic", "underline"];
const placeholder = "Placeholder";
const bindings = {
  // This will overwrite the default binding also named 'tab'
  tab: {
    key: "Tab",
    handler: function () {
      // tab to the next quill editor
      const editorElements = document.querySelectorAll(".ql-editor");
      const currentFocusedIndex = Array.from(editorElements).indexOf(
        document.activeElement
      );
      let nextIndex = currentFocusedIndex + 1;
      if (nextIndex >= editorElements.length) {
        nextIndex = 0; // Loop back to the first element
      }
      editorElements[nextIndex].focus();
    },
  },
  escape: {
    key: "Escape",
    handler: function () {
      this.quill.blur();
    },
  },
};

const config = {
  placeholder,
  formats,
  modules: {
    toolbar,
    keyboard: {
      bindings,
    },
  },
};

// The bubble theme pops up when selecting text
const quillBubble = new Quill("#bubble", {
  ...config,
  theme: "bubble",
});

//the snow theme is always visible
const quillSnow = new Quill("#snow", {
  ...config,
  theme: "snow",
});

function removeWhiteSpaceChar(text) {
  return text.replace(/\&nbsp;/g, " ");
}

function update(quill, id) {
  let html = quill.getSemanticHTML(0);
  let length = quill.getLength();
  let text = quill.getText(0);
  document.querySelector(`#${id}-display`).innerHTML = html;
  document.querySelector(`#${id}-html`).textContent = html;
  document.querySelector(`#${id}-formatted`).textContent =
    removeWhiteSpaceChar(html);
  document.querySelector(`#${id}-length`).textContent = length;
  document.querySelector(`#${id}-text`).textContent = text;
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

function removeWhiteSpaceChar(text) {
  return text.replace(/\&nbsp;/g, " ");
}

const toolbar = ["bold", "italic", "underline"];
const formats = ["bold", "italic", "underline"];
const placeholder = "Placeholder";
const bindings = {
  // This will overwrite the default binding also named 'tab'
  tab: {
    key: 9,
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
};

const quillBubble = new Quill("#bubble", {
  placeholder,
  formats,
  modules: {
    toolbar,
    keyboard: {
      bindings,
    },
  },
  theme: "bubble",
});

const quillSnow = new Quill("#snow", {
  placeholder,
  formats,
  modules: {
    toolbar,
    keyboard: {
      bindings,
    },
  },
  theme: "snow",
});

let quills = document.querySelectorAll(".ql-editor");
quills.forEach((quill) => {
  quill.tabIndex = 0;
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

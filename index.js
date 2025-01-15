const toolbarOptions = ["bold", "italic", "underline"];

const quill = new Quill("#quill", {
  placeholder: "Placeholder",
  formats: ["bold", "italic", "underline"],
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "bubble",
});

let html = quill.getSemanticHTML(0);
document.querySelector("#out").textContent = html;
document.querySelector("#outc").textContent = html.replace("&nbsp;", " ");

quill.on("text-change", (delta, oldDelta, source) => {
  console.log("delta", delta);
  console.log("olddelta", oldDelta);
  let html = quill.getSemanticHTML(0);
  document.querySelector("#out").textContent = html;
  document.querySelector("#outc").textContent = html.replace("&nbsp;", " ");
});

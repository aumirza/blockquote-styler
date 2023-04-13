import { BlockquoteStyle1 } from "./components/BlockquoteStyle1";

const Blockquote = BlockquoteStyle1;

const extractTextFromNode = (node) => {
  let text = "";
  if (node.nodeType === 3) {
    text = node.textContent;
  } else if (node.nodeType === 1) {
    for (let i = 0; i < node.childNodes.length; i++) {
      text += extractTextFromNode(node.childNodes[i]);
    }
  }
  return text;
};

const style = "style-1";

window.addEventListener("load", function () {
  // convert to plain es6 javascript
  // const blockquotes = document.querySelectorAll('article blockquote');
  const blockquotes = document.querySelectorAll("blockquote");
  blockquotes.forEach((blockquote) => {
    const text = extractTextFromNode(blockquote);
    blockquote.innerHTML = "";
    blockquote.classList.add(`blockquote-${style}`);
    const root = ReactDOM.createRoot(blockquote);
    root.render(<Blockquote text={text} />);
  });
});

import React, { useState } from "react";

const shareLinks = {
  wa: (text) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%0A${
      window.location.href
    }`,
  fb: (text) =>
    `https://www.facebook.com/sharer/sharer.php?u=${
      window.location.href
    }&quote=${encodeURIComponent(text)}`,
  tw: (text) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${
      window.location.href
    }`,
};

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  // textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }
  document.body.removeChild(textArea);
}

function copyText(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => console.log("Async: Copying to clipboard was successful!"))
    .catch(() => console.error("could not copy"));
}
export const BlockquoteStyle1 = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const shareHandler = (s) => {
    const url = shareLinks[s](text);
    window.open(url, "_blank");
  };

  const copyHandler = (e) => {
    copyText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const spanStyle = {
    textAlign: "center",
    display: "flex",
    margin: "0 3px",
    float: "left",
    lineHeight: "1.4",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  const shareButtonStyle = {
    border: "1px solid #000",
    fontSize: "15px",
    borderRadius: "15px",
    color: "#fff",
    width: "auto",
    padding: "4px 16px",
  };

  const iStyle = {
    color: "#fff !important",
    width: "20px",
    height: "20px",
  };

  const copyStyle = {
    background:
      "linear-gradient(90deg, rgb(29 139 253) 27%, rgb(5 210 182) 100%)",
    fontSize: "15px",
    fontStyle: "normal",
    border: "none",
    borderRadius: "15px",
    color: "#fff !important",
    padding: "4px 16px",
    lineHeight: "1.1 !important",
  };

  const copyHoverStyle = {
    background:
      "linear-gradient(90deg, rgba(253, 29, 29, 1) 27%, rgba(252, 176, 69, 1) 100%)",
  };

  const copiedStyle = {
    background:
      "linear-gradient(90deg, rgb(29 139 253) 27%, rgb(5 210 182) 100%) !important",
  };

  return (
    <>
      <p>{text}</p>

      <div
        style={{
          position: "relative",
          display: "flex",
          marginTop: " 8px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ ...spanStyle, fontSize: "18px" }}>Share:</span>
        <span
          style={{
            ...spanStyle,
            ...shareButtonStyle,
            background: "#0f9806",
            borderColor: "#0f9806",
          }}
          onClick={() => shareHandler("wa")}
        >
          <i style={iStyle} className="fab fa-whatsapp"></i>
        </span>

        <span
          style={{
            ...spanStyle,
            ...shareButtonStyle,
            background: "#3b5998",
            borderColor: "#3b5998",
          }}
          onClick={() => shareHandler("fb")}
        >
          <i style={iStyle} className="fab fa-facebook-f"></i>
        </span>
        <span
          style={{
            ...spanStyle,
            ...shareButtonStyle,
            background: "#0088cc",
            borderColor: "#0088cc",
          }}
          onClick={() => shareHandler("tw")}
        >
          <i style={iStyle} className="fab fa-twitter"></i>
        </span>

        <button
          type="button"
          style={{
            ...spanStyle,
            ...shareButtonStyle,
            ...copyStyle,
            ...(copied ? copiedStyle : {}),
          }}
          onClick={copyHandler}
        >
          <i
            style={{
              ...iStyle,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="fa fa-copy fa-check"
          ></i>
        </button>
      </div>
    </>
  );
};

export default BlockquoteStyle1;

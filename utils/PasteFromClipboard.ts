import { RefObject } from "react";

const pasteFromClipboard = (ref: RefObject<HTMLInputElement>): void => {
  if (ref.current) {
    ref.current.focus();
    document.execCommand("paste");
  }
};

const PasteFromClipboard = (ref: RefObject<HTMLInputElement>): void => {
  pasteFromClipboard(ref);
};

export default PasteFromClipboard;

const copyToClipboard = (text: string): void => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const CopyToClipboard = (value: string): void => {
  copyToClipboard(value);
};

export default CopyToClipboard;
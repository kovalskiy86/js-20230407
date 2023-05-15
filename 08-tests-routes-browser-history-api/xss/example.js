innerHTMLButton.addEventListener("click", () => {
  console.error("innerHTMLButton clicked");
  root.innerHTML = "<script>alert('XSS!')</script>";
});

innerTextButton.addEventListener("click", () => {
  console.error("innerTextButton clicked");
  root.innerText = "<script>alert('XSS!')</script>";
});

adjacentButton.addEventListener("click", () => {
  console.error("adjacentButton clicked");
  root.insertAdjacentHTML('afterend', "<script>alert('XSS!')</script>");
});


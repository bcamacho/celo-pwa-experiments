export function tag (tag, text) {
  let el = document.createElement(tag)
  el.textContent = text
  return el
}

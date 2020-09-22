function getTextBySelector(selector, parent = document, index = 0) {
  const htmlElements = parent.querySelectorAll(selector);

  if(htmlElements.length === 0) return undefined;

  return htmlElements[index].textContent.trim();
}

export default getTextBySelector;

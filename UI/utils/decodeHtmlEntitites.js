export default function decodeHtmlEntities(text) {
  const entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#x2F;": "/",
    "&#x60;": "`",
    "&#x3D;": "=",
    "&#x22;": '"',
    "&#x3C;": "<",
    "&#x3E;": ">",
  };
  return text.replace(
    /&(amp|lt|gt|quot|#039|#x2F|#x60|#x3D|#x22|#x3C|#x3E);/g,
    (match, entity) => {
      return entities[match] || "";
    }
  );
}

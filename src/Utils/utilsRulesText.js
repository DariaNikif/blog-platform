export function truncate(str, maxLength) {
  if (str) {
    if (str.length > maxLength) {
      let trimmedText = str.substring(0, maxLength);
      let lastSpaceIndex = trimmedText.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        trimmedText = trimmedText.substring(0, lastSpaceIndex);
      }
      return trimmedText + ' ';
    }
  }
  return str;
}

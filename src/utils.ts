export function getAbbreviationName(name: string) {
  const words = name.split(" ");
  const wordsLength = words.length;
  if (wordsLength === 0) return "";
  else if (wordsLength === 1) return words[0];
  else {
    const firstName = words[0];
    const lastName = words[words.length - 1];
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
    return initials;
  }
}

export function fold(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function includesFold(haystack: string, needle: string) {
  const query = fold(needle.trim());
  if (!query) return true;
  return fold(haystack).includes(query);
}

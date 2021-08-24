export function displayCount(count, tag) {
  let label = tag;
  if (count !== 1) {
    label = `${label}s`;
  }

  return `${count} ${label}`;
}

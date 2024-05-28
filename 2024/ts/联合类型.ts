function formatCommandLine(type: string[] | number) {
  if (typeof type === 'number') {
    return type;
  }
  return type.join(' ').trim();
}

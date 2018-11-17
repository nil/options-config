export default function (key, val, defaultValue) {
  if (!val && val !== false && val !== 0) {
    return defaultValue;
  }

  return false;
}

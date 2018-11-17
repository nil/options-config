export default function (val) {
  if (!val && val !== false && val !== 0) {
    return true;
  }

  return false;
}

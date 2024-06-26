function controlTime(start, end) {
  if (start < end || parseFloat(start) == parseFloat(end)) {
    return false;
  } else {
    return true;
  }
}

export default controlTime;

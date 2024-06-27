function disableHandle(disableArr, isDisable) {
  disableArr.forEach((item) => {
    if (item && item.current) {
      item.current.disabled = isDisable;
    }
  });
}

export default disableHandle;

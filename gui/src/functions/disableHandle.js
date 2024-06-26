function disableHandle(disableArr, isDisable) {
  disableArr.forEach((item) => {
    if (item.current) {
      item.current.disabled = isDisable;
    }
  });
}

export default disableHandle;

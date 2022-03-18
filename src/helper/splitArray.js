const splitArr = (arr, num) => {
  const result = [];
  for (let i = 0; i < arr.length; i += num) {
    result.push(arr.slice(i, i + num));
  }
  return result;
};

export default splitArr;

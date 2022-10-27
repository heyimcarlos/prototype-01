const myFunc = (str1) => {
  let str = "";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str1[i] === str1[i + 1]) {
      count++;
    } else {
      str += `${count}${str1[i]}`;
    }
  }
  console.log("str", str);
};

myFunc("aaaabbbccdddeddcccbaaccce");

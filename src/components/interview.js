const myFunc = (str) => {
  let str = "";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      str += `${count}${str[i]}`;
    }
  }
  console.log("str", str);
};

myFunc("aaaabbbccdddeddcccbaaccce");

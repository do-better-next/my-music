function getRandomColor() {
  // 生成随机的RGB颜色值
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // 将RGB转换为十六进制表示
  var hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return hex;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function generateRandomGradient() {
  var color1 = getRandomColor();
  var color2 = getRandomColor();

  // 创建线性渐变对象
  const gradient = "linear-gradient(to right, " + color1 + ", " + color2 + ")";
  return gradient;
}

function getHexColor() {//十六进制颜色随机
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color
}
export { generateRandomGradient, getHexColor };

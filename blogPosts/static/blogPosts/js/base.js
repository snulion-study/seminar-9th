// footer의 Copyright 연도 반영
const modifyCopyrightContent = () => {
  const year = new Date().getFullYear();
  document.querySelector('.copyright').textContent = `SNU LIKELION ${year}`;
}

modifyCopyrightContent();




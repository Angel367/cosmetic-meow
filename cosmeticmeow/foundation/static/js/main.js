img = document.getElementById('img_main_art')
console.log(document.getElementById('main_art1').offsetTop)
img.style.top = (-document.getElementById('main_art1').offsetTop) + 'px'
console.log(img.clientHeight)
img.style.height = (img.clientHeight + document.getElementById('main_art1').offsetTop) + 'px'
console.log(img.clientHeight)

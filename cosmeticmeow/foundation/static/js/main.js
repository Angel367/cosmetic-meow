window.onload = function() {
console.log(
    window.getComputedStyle(
        document
    .getElementById('main_art1')
    ).paddingTop
)
document.getElementById('main_art1')
    .style.paddingTop = (window.getComputedStyle(
        document
    .getElementById('main_art1')
    ).paddingTop
     + document
    .getElementById('main_header')
    .offsetHeight) + 'px'
}


let dots = document.querySelectorAll(".dot")
let dot1 = document.querySelector(".dot1")
let dot2 = document.querySelector(".dot2")
let dot3 = document.querySelector(".dot3")
let actives = document.querySelectorAll(".active")
let active = document.querySelector(".active")
let banner = document.querySelector("div.banner")
let tabs = document.querySelectorAll(".tab")
let button = document.querySelector(".button")
let interesting = document.querySelector(".interesting")





window.onload = function () {
    // dot1.classList.add("active")
}


function init() {
    let x = 0;
    for (let dot of dots) {
        dot.addEventListener("mouseenter", function (event) {
            event.target.classList.add("dot-hover-active")
        })
        dot.addEventListener("mouseleave", function (event) {
            event.target.classList.remove("dot-hover-active")
        })
    }

    dot1.addEventListener("click", function (event) {
        banner.innerHTML = `<img class="banner" src="./pic1.jpeg">`
        for (let dot of dots) {
            dot.classList.remove("active")
        }
        event.target.classList.add("active")
    })

    dot2.addEventListener("click", function (event) {
        banner.innerHTML = `<img class="banner" src="./pic2.jpeg">`
        for (let dot of dots) {
            dot.classList.remove("active")
        }
        event.target.classList.add("active")
    })

    dot3.addEventListener("click", function (event) {
        banner.innerHTML = `<img class="banner" src="./pic3.jpeg">`
        for (let dot of dots) {
            dot.classList.remove("active")
        }
        event.target.classList.add("active")
    })

    for (let tab of tabs) {
        tab.addEventListener("mouseenter", function (event) {
            event.target.classList.add("tab-hover-active")
        })
        tab.addEventListener("mouseleave", function (event) {
            event.target.classList.remove("tab-hover-active")
        })
    }

    button.addEventListener("click", function (event) {
    interesting.innerHTML = `<img class="fly" src="fly.png">`    
})
}

init()
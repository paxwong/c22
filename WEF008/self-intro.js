let dropdownButtons = document.querySelectorAll('.dropdown-button')
let dropdownTitle = document.querySelectorAll('.dropdown-title')
let photoElement = document.querySelector('.photo')
let rightSideContainerElement = document.querySelector('.right-side-container')
let backgroundElement = document.querySelector('.background')
let spaceElements = document.querySelectorAll('.space')



for (let button of dropdownButtons) {
    button.addEventListener('click', function (event) {
        button.classList.toggle('dropdown-button--active');
        button.parentElement.classList.toggle('dropdown-menu--active');
        for (let title of dropdownTitle) {
            if (title.parentElement.classList.contains('dropdown-menu--active')) {
                title.style.maxHeight = title.scrollHeight + 'px';
            } else {
                title.style.maxHeight = 0;
            }
        }
    })
}

photoElement.addEventListener('click', function (event) {
    rightSideContainerElement.classList.toggle('photo-active');
    rightSideContainerElement.classList.remove('background-content');
    for (let space of spaceElements) {
        space.style.maxHeight = 0;
    }
}
)

photoElement.addEventListener('mouseleave', function () {
    rightSideContainerElement.classList.remove('photo-active');
    rightSideContainerElement.classList.remove('background-content');
})

backgroundElement.addEventListener('mouseleave', function () {
    rightSideContainerElement.classList.remove('background-content');
    for (let space of spaceElements) {
        space.style.maxHeight = 0;
    }
    if (rightSideContainerElement.classList.contains('init-photo')) {
        return} else {
    rightSideContainerElement.classList.toggle('init-photo');
}}
)

backgroundElement.addEventListener('click', function () {
    rightSideContainerElement.classList.remove('init-photo');
    rightSideContainerElement.classList.add('background-content')

    for (let space of spaceElements) {
        if (rightSideContainerElement.classList.contains('background-content')) {
            space.style.maxHeight = space.scrollHeight + 'px';
        }
    }
})
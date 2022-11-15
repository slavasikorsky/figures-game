addEventListener('load', (event) => {
    const activeCLass = 'active';
    const container = document.querySelector('.container');
    const buttonStart = container.querySelector('.btn-start');
    const buttonStop = container.querySelector('.btn-stop');
    const images = container.querySelectorAll('img')

    const allImages = (images, action) => {
        images.forEach(img => action(img));
    }

    const showImage = (img) => {
        img.classList.add(activeCLass);
    }

    const hideImage = (img) => {
        img.classList.remove(activeCLass);
    }

    buttonStart.addEventListener('click',(e) => {
        e.preventDefault;
        allImages(images, showImage);
    })

    buttonStop.addEventListener('click',(e) => {
        e.preventDefault;
        allImages(images, hideImage);
    })
});

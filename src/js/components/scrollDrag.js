const scrollDrag = (blockSelector, speed) => {
    let scrollBlock = document.querySelector(blockSelector);
    if (!scrollBlock) return;
    
    let left = 0;
    let drag = false;
    let coorX = 0;

    scrollBlock.addEventListener('mousedown', function (e) {
        drag = true;
        coorX = e.pageX - this.offsetLeft;
    });
    document.addEventListener('mouseup', function () {
        drag = false;
        left = scrollBlock.scrollLeft;
    });
    scrollBlock.addEventListener('mousemove', function (e) {
        if (drag) this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX) * (speed / 1000);
    });
};

export default scrollDrag;

function scrollBtn() {
    const btn = document.querySelector('.purchase-request .bid-user__btn');
    const btnScroll = document.querySelector('.purchase-request .bid-user__scroll-substrate');
    if (!(btn && btnScroll)) return;
    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 1112) return;
        const pageOffsetTop = window.pageYOffset;
        const btnOffsetTop = btn.getBoundingClientRect().top + pageOffsetTop;
        if (pageOffsetTop >= btnOffsetTop) {
            btnScroll.classList.add('active-fixed');
        } else {
            btnScroll.classList.remove('active-fixed');
        }
    })
}

scrollBtn();

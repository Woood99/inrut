const modalActiveList = [

];

const popup = (options, modalName) => {
    const container = document.querySelector(`[data-popup-target=${modalName}]`);
    if (!container) return;
    const modal = container.parentElement;
    let defaultOptions = {
        isOpen: () => {},
        isClose: () => {},
    }
    const settingsModal = {
        btns: document.querySelectorAll(`[data-popup-path=${modalName}]`),
        modal,
        container,
        isOpen: false,
        speed: 300,
        animation: 'fade',
        options: Object.assign(defaultOptions, options),
        fixBlocks: document.querySelectorAll('.fix-block'),
    };
    settingsModal.btns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpen();
        })
    })
    modal.querySelectorAll('.js-popup-close').forEach(el => {
        el.addEventListener('click', () => {
            modalClose()
        })
    })
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('popup') && target.classList.contains('is-open') && settingsModal.isOpen) {
            modalClose();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 27 && settingsModal.isOpen) {
            if (document.querySelector('.checkboard-popup-card') && document.querySelector('.checkboard-popup-card').classList.contains('is-open')) {
                return;
            }
            if (modalActiveList[modalActiveList.length - 1] !== modalName) return;
            modalClose();
        }
    });


    function modalOpen() {
        if (settingsModal.isOpen) return;
        settingsModal.container.scrollTo(0, 0);
        settingsModal.modal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
        settingsModal.modal.classList.add('is-open');
        document.body.style.scrollBehavior = 'auto';
        document.documentElement.style.scrollBehavior = 'auto';

        disableScroll();

        settingsModal.container.classList.add('popup-open');
        settingsModal.container.classList.add(settingsModal.animation);

        setTimeout(() => {
            settingsModal.options.isOpen();
            settingsModal.container.classList.add('animate-open');
            settingsModal.isOpen = true;
            popupLastString(modalName, 'added');
        }, settingsModal.speed);
    }

    function modalClose() {
        if (!settingsModal.isOpen) return;

        settingsModal.container.classList.remove('animate-open');
        settingsModal.container.classList.remove(settingsModal.animation);
        settingsModal.modal.classList.remove('is-open');
        settingsModal.container.classList.remove('popup-open');
        popupLastString(modalName, 'delete');
        if (modalActiveList.length === 0) {
            enableScroll();
        }
        document.body.style.scrollBehavior = 'auto';
        document.documentElement.style.scrollBehavior = 'auto';
        settingsModal.options.isClose();
        settingsModal.isOpen = false;
    }

    function disableScroll() {
        let pagePosition = window.scrollY;
        lockPadding();
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    function enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    }

    function lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        settingsModal.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    function unlockPadding() {
        settingsModal.fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }

    function popupLastString(modalName, status) {
        if (status === 'added') {
            modalActiveList.push(modalName);
        }
        if (status === 'delete') {
            const index = modalActiveList.indexOf(modalName);
            if (index > -1) modalActiveList.splice(index, 1);
        }
    }
};

export default popup;

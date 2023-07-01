import disableScroll from '../modules/disableScroll';
import enableScroll from '../modules/enableScroll';


const modal = (modalHTML, container, speed = 300, target = false) => {
    if (document.querySelectorAll(container).length <= 0 && modalHTML) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalEl = document.querySelector(container);
        const modalContainerEl = modalEl.querySelector(`${container}__container`);
        const modalCloseEl = modalEl.querySelector(`${container}__close`);
        const genplanClose = modalEl.querySelectorAll('.genplan__to-layouts');
        const clientFixedSendReload = modalEl.querySelector('.client-fixed-sent__btn');
        const settingsModal = {
            modal: modalEl,
            container: modalContainerEl,
            isOpen: false,
            speed: speed,
            animation: 'fade'
        };
        setTimeout(() => {
            modalOpen(settingsModal);
        }, 1);
        modalCloseEl.addEventListener('click', () => {
            modalClose(settingsModal);
        });
        if (genplanClose.length >= 1) {
            genplanClose.forEach(el => {
                el.addEventListener('click', () => {
                    modalClose(settingsModal);
                });
            })
        }
        if (clientFixedSendReload) {
            clientFixedSendReload.addEventListener('click', () => {
                window.location.reload();
            })
        }
        modalEl.addEventListener('click', (e) => {
            if (e.target.classList.contains(container.replace(/^\./, ""))) {
                modalClose(settingsModal);
            }
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                modalClose(settingsModal);
            }
        })
    }

    function modalClose(settingsModal) {
        if (settingsModal.isOpen) {
            settingsModal.container.classList.remove('animate-open');
            settingsModal.container.classList.remove(settingsModal.animation);
            settingsModal.modal.classList.remove('is-open');
            settingsModal.container.classList.remove('open');
            if (!settingsModal.modal.classList.contains('checkboard-popup-card') && !settingsModal.modal.classList.contains('genplan-popup-card')) {
                enableScroll();
                document.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
            }
            setTimeout(() => {
                settingsModal.modal.remove();
            }, settingsModal.speed);
            settingsModal.isOpen = false;


            if (target && target.classList.contains('advantages-card')) {
                target.classList.remove('_active');
            }
            if (target && target.classList.contains('card-stock-secondary')) {
                target.classList.remove('_active');
                target.querySelector('.card-stock-secondary__container').blur();
            }
            if (target && target.classList.contains('card-stock-third')) {
                target.classList.remove('_active');
                target.querySelector('.card-stock-third__container').blur();
            }
        }
    }

    function modalOpen(settingsModal) {
        if (!settingsModal.isOpen) {
            settingsModal.container.scrollTo(0, 0);
            settingsModal.modal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
            settingsModal.modal.classList.add('is-open');
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
            settingsModal.container.classList.add('open');
            settingsModal.container.classList.add(settingsModal.animation);
            setTimeout(() => {
                settingsModal.container.classList.add('animate-open');
            }, settingsModal.speed);
            settingsModal.isOpen = true;
        }
    }
}

export default modal;

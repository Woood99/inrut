import {
    _slideUp,
    _slideDown
} from '../support-modules/slide';

class popup {
    constructor(options, selector) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
        }
        this.popupName = selector.slice(1);
        this.options = Object.assign(defaultOptions, options);
        this.popup = document.querySelector(selector);
        this.speed = 300;
        this.animation = 'fade';
        this._reOpen = false;
        this._nextContainer = false;
        this.popupContainer = false;
        this.isOpen = false;
        this.previousActiveElement = false;
        this._focusElements = [
            'a[href]',
            'input',
            'select',
            'textarea',
            'button',
            'iframe',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        this._fixBlocks = document.querySelectorAll('.fix-block');
        this.events();
    }

    events() {
        if (this.popup) {
            document.addEventListener('click', function (e) {
                const clickedElement = e.target.closest(`[data-popup-path]`);
                if (clickedElement) {
                    let target = clickedElement.dataset.popupPath;
                    let animation = clickedElement.dataset.popupAnimation;
                    let speed = clickedElement.dataset.popupSpeed;
                    this.animation = animation ? animation : 'fade';
                    this.speed = speed ? parseInt(speed) : 300;
                    if (window.innerWidth <= 1144 && !clickedElement.hasAttribute('data-mobile-speed')) {
                        this.speed = 0;
                    }
                    if (this.popup.querySelector(`[data-popup-target="${target}"]`)) {
                        this._nextContainer = this.popup.querySelector(`[data-popup-target="${target}"]`);
                        this.open();
                        return;
                    }
                }

                if (e.target.closest('.js-popup-close') && e.target.closest('.genplan__to-layouts')) {
                    const name = e.target.closest('[data-layouts]').dataset.layouts;
                    const currentLayouts = document.querySelector('.layouts').querySelector(`[data-layouts=${name}]`);
                    const target = currentLayouts.querySelector('.layouts__item-body');
                    if (target.hidden) {
                        document.querySelector('.layouts').querySelectorAll(`[data-layouts]`).forEach(item => {
                            item.querySelector('.layouts__item-btn').classList.remove('_spoller-active');
                            item.querySelector('.layouts__item-body').setAttribute('hidden', '');
                        })

                        target.previousElementSibling.classList.add('_spoller-active');
                        _slideDown(target, 0);
                    }
                    setTimeout(() => {
                        const topGap = target.previousElementSibling.offsetTop;
                        const headerFixed = document.querySelector('.header-fixed');
                        const topHeaderMobile = document.querySelector('.top-page-inner');
                        window.scrollTo({
                            top: topGap - (window.innerWidth > 1144 ? headerFixed.offsetHeight : topHeaderMobile.offsetHeight) - 16,
                            behavior: 'smooth'
                        })
                    }, 200);
                    this.close();
                    return;
                }
                if (e.target.closest('.js-popup-close')) {
                    this.close();
                    return;
                }
            }.bind(this));

            window.addEventListener('keydown', function (e) {
                if (document.querySelector('.checkboard-popup-card') && document.querySelector('.checkboard-popup-card').classList.contains('is-open')) {
                    return;
                }
                if (e.keyCode == 27 && this.isOpen) {
                    this.close();
                }

                if (e.which == 9 && this.isOpen) {
                    this.focusCatch(e);
                    return;
                }
            }.bind(this));

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains(this.popupName) && e.target.classList.contains("is-open")) {
                    this.close();
                }
            }.bind(this));
        }

    }

    open(selector) {
        this.previousActiveElement = document.activeElement;
        if (this.isOpen) {
            this.reOpen = true;
            this.close();
            return;
        }

        this.popupContainer = this._nextContainer;

        if (selector) {
            this.popupContainer = this.popup.querySelector(`[data-popup-target="${selector}"]`);
        }

        this.popupContainer.scrollTo(0, 0)

        this.popup.style.setProperty('--transition-time', `${this.speed / 1000}s`);
        this.popup.classList.add('is-open');

        document.body.style.scrollBehavior = 'auto';
        document.documentElement.style.scrollBehavior = 'auto';

        this.disableScroll();

        this.popupContainer.classList.add('popup-open');
        this.popupContainer.classList.add(this.animation);

        setTimeout(() => {
            this.options.isOpen(this);
            this.popupContainer.classList.add('animate-open');
            this.isOpen = true;
            this.focusTrap();
        }, this.speed);
    }

    close() {
        if (this.popupContainer) {
            this.popupContainer.classList.remove('animate-open');
            this.popupContainer.classList.remove(this.animation);
            this.popup.classList.remove('is-open');
            this.popupContainer.classList.remove('popup-open');

            if (!document.querySelector('[data-menu]').classList.contains('menu--active')) {
                if (!(document.querySelector('.gallery-primary-container--object') && document.querySelector('.gallery-primary-container--object').classList.contains('lg-show'))) {
                    this.enableScroll();
                }
            }

            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';

            this.options.isClose(this);
            this.isOpen = false;
            this.focusTrap();

            if (this.reOpen) {
                this.reOpen = false;
                this.open();
            }
        }
    }

    focusCatch(e) {
        const nodes = this.popupContainer.querySelectorAll(this._focusElements);
        const nodesArray = Array.prototype.slice.call(nodes);
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (e.shiftKey && focusedItemIndex === 0) {
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            nodesArray[0].focus();
            e.preventDefault();
        }
    }

    focusTrap() {
        const nodes = this.popupContainer.querySelectorAll(this._focusElements);
        if (this.isOpen) {
            if (nodes.length) nodes[0].focus();
        } else {
            this.previousActiveElement.focus();
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        this.unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }
}

export default popup;

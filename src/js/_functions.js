import burgerMenu from './functions/burger';
import tabs from "./functions/tabs";
import spollers from "./functions/spollers";
import {
    galleryPrimary,
    galleryStories
} from './components/gallery';
import videoBlock from './components/videoBlock';
burgerMenu();
tabs();
spollers();
galleryPrimary();
galleryStories();
// ========================================================================================

import "./functions/sliders";
import "./functions/dynamic-adapt";
import './functions/fix-fullheight';

// ========================================================================================
import popup from './functions/popup';
import inputResize from './modules/inputResize';
popup(null, 'city');
popup(null, 'add');
popup(null, 'personal-area');
popup(null, 'edit-profile');
popup(null, 'edit-profile_agent');
popup(null, 'share-app');
popup(null, 'complaint');
popup(null, 'complaint-user');
popup(null, 'complaint-object');
popup(null, 'thanks');
popup(null, 'object-not');
popup(null, 'interest-rate-modal');
popup({
    isOpen: (settingsModal) => {
        inputResize(settingsModal.container.querySelector('.filter-range-one__input--w-auto'));
        if (document.body.querySelector('.main').classList.contains('mortgage')) {
            const itemsBody = document.querySelectorAll('.object-calc-mort__btn');
            const itemsModal = settingsModal.container.querySelectorAll('[data-mortgage-card]');
            itemsBody.forEach(itemBody => {
                itemsModal.forEach(itemModal => {
                    if (itemBody.dataset.mortgageCard === itemModal.dataset.mortgageCard) {
                        if (itemBody.classList.contains('_active')) {
                            itemModal.classList.add('_active');
                        } else {
                            itemModal.classList.remove('_active');
                        }
                    }
                })
            })
        }
    },
    isClose: () => {

    }
}, 'interest-rate-modal-two');
popup(null, 'construct-progress-popup');
popup({
    isOpen: () => {
        if (window.innerWidth > 1144) return;
        const container = document.querySelector('.genplan');
        const wrapper = container.querySelector('.genplan__wrapper');
        setTimeout(() => {
            wrapper.scrollIntoView({
                inline: 'end',
            })
            container.scrollTo({
                left: container.scrollLeft / 2
            })
        }, 5);

    },
    isClose: () => {
        if (window.innerWidth > 1144) return;
        const container = document.querySelector('.genplan');
        const mask = container.querySelector('.genplan__mask');
        mask.classList.remove('hidden');
        mask.classList.add('_active');
    },
}, 'popup-genplan');

popup(null, 'popup-map_buy-apartment-building');
popup(null, 'search-area');
popup(null, 'search-area-two');
popup({
    isOpen: () => {
        const chat = document.querySelector('.chat');
        if (!chat) return;
        const bar = document.querySelector('.chat__bar .simplebar-content-wrapper');
        const chatBottom = chat.querySelector('.chat__bottom');
        const chatTags = chat.querySelector('.chat__tags');
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);
        chat.style.setProperty('--chat-tags-height', `${chatTags.offsetHeight}px`);
        bar.scrollTo({
            top: bar.querySelector('.simplebar-content').clientHeight,
        })
    },
}, 'chat');
popup(null, 'online-display-popup');
popup(null, 'authorization');
popup(null, 'sber-tied');
popup(null, 'kit-composition');
popup(null, 'book-consultation');
popup({
    isOpen: (settingsModal) => {
        videoBlock(settingsModal.container.querySelector('.screen-demonstation__video'));
    },
    isClose: (settingsModal) => {
        settingsModal.container.querySelector('.video-block__video').innerHTML = '';
    }

}, 'screen-demonstation-popup');
popup(null, 'record-viewing');
popup(null, 'personal-area-two');
popup(null, 'client-fixed');
popup(null, 'add-card');
popup({
    isOpen: (settingsModal) => {
        // ... ?
    },
    isClose: (settingsModal) => {

    }
}, 'favorite-two');
popup(null, 'add-contact');
popup(null, 'add-addit-contact');
popup(null, 'create-agree');
popup(null, 'create-document');
popup(null, 'create-deal');
popup(null, 'edit-user');
popup(null, 'create-meeting-show');
popup(null, 'suggest-object');
popup(null, 'history-changes');
popup({
    isOpen: (settingsModal) => {
        const container = settingsModal.container;
        const images = container.querySelectorAll('.furnishing-sets__tabs');
        images.forEach(image => {
            let height = 0;
            const title = container.querySelector('.object-apart-renov__title');
            const btns = container.querySelector('.furnishing-sets__btns');
            const descr = image.querySelector('.furnishing-sets__descr');
            const nav = container.querySelector('.tabs-primary__btns');
            if (title) {
                height += title.offsetHeight;
                height += 16;
            }
            if (btns) {
                height += btns.offsetHeight;
                height += 16;
            }
            if (descr) {
                height += descr.offsetHeight;
                height += 16;
            }
            if (nav) {
                height += nav.offsetHeight;
                height += 24;
            }
            const padding = 48 + 32;
            const bottomPadding = 32;
            height += (padding + 17 + bottomPadding);
                image.style.height = `calc(100vh - ${height}px)`;
        });
    }
}, 'furnishing-sets-popup');
popup({
    isOpen: (settingsModal) => {
        const container = settingsModal.container;
        const images = container.querySelectorAll('.object-apart-renov__item');
        images.forEach(image => {
            let height = 0;
            const title = container.querySelector('.object-apart-renov__title');
            const nav = container.querySelector('.tabs-primary__btns');
            const descr = image.querySelector('.object-apart-renov__descr');
            if (title) {
                height += title.offsetHeight;
                height += 16;
            }
            if (nav) {
                height += nav.offsetHeight;
                height += 24;
            }
            if (descr) {
                height += descr.offsetHeight;
                height += 16;
            }
            const padding = 48 + 32;
            const bottomPadding = 32;
            height += (padding + 17 + bottomPadding);
                image.style.height = `calc(100vh - ${height}px)`;
        })
    }
}, 'object-apart-renov-popup');
popup({
    isOpen: (settingsModal) => {
        if (settingsModal.currentBtn.closest('.news-card')) {
            const currentId = settingsModal.currentBtn.closest('.news-card').dataset.newslineId;
            const modalCards = settingsModal.container.querySelectorAll('.news-card');
            modalCards.forEach(card => {
                if (card.hasAttribute('data-newsline-id') && card.dataset.newslineId === currentId) {
                    setTimeout(() => {
                        settingsModal.modal.scrollTo({
                            top: card.offsetTop - 16,
                            behavior: 'smooth',
                        })
                    }, 1);
                }
            })
        }
    },
}, 'newsline');

// ========================================================================================

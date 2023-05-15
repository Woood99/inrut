import {
    filterControl,
    uiSlider,
    uiSliderOne,
    filterSum,
    filterDropdownChoice,
    filterMobile,
    filterCustomSelectCheckboxes
} from './components/filter';
import {
    simplebar
} from './components/simplebar';
import maps from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    inputText,
    inputOnlyNumber
} from './components/inputs';
import {
    validateRadioPrimary
} from './components/formValidate';
import './components/calendar';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import './components/controlCards'
import emergingBlockScroll from './modules/emergingBlockScroll';
import './components/gallery';
import './components/videoBlock';
import './components/reviewModal';
import './components/placeSaleOptionMore';
import './components/dropImage';
import './components/checkboard';
import './components/headerFixed';
import './components/mortgage';
document.addEventListener('DOMContentLoaded', () => {
    filterControl();
    uiSlider();
    uiSliderOne();
    filterSum();
    filterDropdownChoice();
    filterMobile();
    filterCustomSelectCheckboxes();
    // ==================================================

    simplebar('.simplebar-primary');
    simplebar('.simplebar-secondary');

    // ==================================================

    maps();

    // ==================================================

    linkCopy('.share-app-popup__btn');

    // ==================================================

    inputText();
    inputOnlyNumber();

    // ==================================================

    validateRadioPrimary('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-object-popup__form', '.textarea-primary__input', '.complaint-object-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.object-not-popup__form', '.textarea-primary__input', '.object-not-popup__btn', '.radio-primary__input');

    // ==================================================

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Меньше');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Меньше');
    dropdownDown('.object-data__text', '.object-data__more');

    // ==================================================

    emergingBlockScroll('.object-body__user .bid-user__btn--like', '.object-plate-bottom', 1112);
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1112);
    emergingBlockScroll('.agent .bid-user__btn', '.agent-plate-bottom', 1112);
    emergingBlockScroll('.develop-inner .object-body__user .bid-user__btn', '.object-plate-bottom', 1112, true);
})

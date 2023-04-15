import {
    filterControl,
    uiSlider,
    filterBudget,
    filterDropdownChoice,
    filterMobile,
} from './components/filter';
import {
    simplebar
} from './components/simplebar';
import maps from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    inputPrimary
} from './components/inputs';
import {
    complaintValidate
} from './components/formValidate';
import './components/calendar';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import './components/controlCards'
import emergingBlockScroll from './modules/emergingBlockScroll';
import './components/gallery';
document.addEventListener('DOMContentLoaded', () => {
    filterControl();
    uiSlider();
    filterBudget();
    filterDropdownChoice();
    filterMobile();
    // ==================================================

    simplebar('.simplebar-primary');

    // ==================================================

    maps();

    // ==================================================


    linkCopy('.share-app-popup__btn');


    // ==================================================

    inputPrimary();
    complaintValidate('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    complaintValidate('.complaint-two-popup__form', '.textarea-primary__input', '.complaint-two-popup__btn', '.radio-primary__input');

    // ==================================================

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Меньше');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Меньше');
    dropdownDown('.object-data', '.object-data__text', '.object-data__more');
    // ==================================================

    emergingBlockScroll('.object-body__user .bid-user__btn--dislike', '.object-plate-bottom', 1112);
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1112);
})

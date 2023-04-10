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
import dropdownText from './modules/dropdownText';
import './components/scrollBtn';
import './components/controlCards'


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
    dropdownText('.your-app-info__item--dropdown', 'ul span', 'button');
    // ==================================================
})

import {
    filterControl,
    uiSlider,
    uiSliderOne,
    filterSum,
    filterDropdownChoice,
    filterMobile,
    filterCustomSelectCheckboxes,
    dropdownDefault
} from './components/filter';
import getHeightBlock from './modules/getHeightBlock'
import choicesSelect from './components/choices';
import {
    simplebar
} from './components/simplebar';
import maps from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    inputText,
    inputOnlyNumber,
    textareaSecondary
} from './components/inputs';
import {
    validateRadioPrimary,
    validateCheckboxPrimary
} from './components/formValidate';
import {
    calendarPrimary
} from './components/calendar'
import {
    galleryPrimary
} from './components/gallery';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import emergingBlockScroll from './modules/emergingBlockScroll';
import controlCards from './components/controlCards';
import videoBlock from './components/videoBlock';
import reviewModal from './components/reviewModal';
import placeSaleOptionMore from './components/placeSaleOptionMore';
import dropImage from './components/dropImage';
import checkboard from './components/checkboard';
import headerFixed from './components/headerFixed';
import mortgage from './components/mortgage';
import choicePay from './components/choicePay';
import genplan from './components/genplan';
import mapMetro from './components/mapMetro';
import cardStockPopup from './components/cardStockPopup';
import tag from './components/tag';
import scrollDrag from './components/scrollDrag';
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================

    getHeightBlock('.header-fixed', '--header-fixed-height');
    getHeightBlock('.header', '--header-height');

    // ==================================================

    choicesSelect();

    // ==================================================

    filterControl();
    uiSlider();
    uiSliderOne();
    filterSum();
    filterDropdownChoice();
    filterMobile();
    filterCustomSelectCheckboxes();
    dropdownDefault('.presentation', '.presentation__btn', '.presentation__dropdown');

    // ==================================================

    simplebar('.simplebar-primary');
    simplebar('.simplebar-secondary');

    // ==================================================

    linkCopy('.share-app-popup__btn');

    // ==================================================

    inputText();
    inputOnlyNumber();
    textareaSecondary();

    // ==================================================

    maps();
    calendarPrimary('.request-calendar .calendar-primary', 'eventsCalendar.json', false);
    calendarPrimary('.calendar-page .calendar-primary', 'eventsCalendar.json', true);
    galleryPrimary();
    controlCards();
    videoBlock();
    reviewModal();
    placeSaleOptionMore();
    dropImage();
    checkboard();
    headerFixed();
    mortgage();
    choicePay();
    genplan();
    mapMetro();
    cardStockPopup('.stock-developer__content .cards-list__items');
    tag();
    scrollDrag('.chat__tags', 1000);
    // ==================================================

    validateRadioPrimary('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-object-popup__form', '.textarea-primary__input', '.complaint-object-popup__btn', '.radio-primary__input');
    validateCheckboxPrimary('.object-not-popup__form', '.textarea-primary__input', '.object-not-popup__btn', '.checkbox-secondary__input');

    // ==================================================

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Меньше');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Меньше');
    dropdownDown('.object-data__text', '.object-data__more');

    // ==================================================

    emergingBlockScroll('.object-body__user .bid-user__btn--message', '.object-plate-bottom', 1144);
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1144);
    emergingBlockScroll('.agent .bid-user__btn', '.agent-plate-bottom', 1144);
    emergingBlockScroll('.develop-inner .object-body__user .bid-user__btn', '.object-plate-bottom', 1144, true);
    emergingBlockScroll('.detailed-flat .object-body__user .bid-user__btn', '.object-plate-bottom', 1144, true);
    emergingBlockScroll('.object-base-inner .object-body__user .card-user__btn', '.object-plate-bottom', 1144, true);
})

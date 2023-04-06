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


import './components/scrollBtn';



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
    complaintValidate();

    // ==================================================
})

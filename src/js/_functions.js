import burgerMenu from './functions/burger';
import tabs from "./functions/tabs";
import spollers from "./functions/spollers";

burgerMenu();
tabs();
spollers();

// ========================================================================================

import "./functions/sliders";
import "./functions/dynamic-adapt";
import './functions/fix-fullheight';

// ========================================================================================

import popup from './functions/popup';
const city = new popup(null, '.popup-primary--city');
const add = new popup(null, '.popup-primary--add');
const personalArea = new popup(null, '.popup-secondary--personal');
const shareApp = new popup(null, '.popup-primary--share-app')
const complaint = new popup(null, '.popup-primary--complaint')
const complaintUser = new popup(null, '.popup-primary--complaint-user')
const complaintObject = new popup(null, '.popup-primary--complaint-object')
const thanks = new popup(null, '.popup-primary--thanks')
const objectNot = new popup(null, '.popup-primary--object-not')
const interestRate = new popup(null, '.popup-primary--interest-rate')
const constructProgress = new popup(null, '.popup-primary--construct-progress')
const genplan = new popup(null, '.popup-genplan')

// ========================================================================================

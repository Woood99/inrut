// ========================================================================================

import burgerMenu from './functions/burger';
burgerMenu();


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

// ========================================================================================


// Табы
import tabs from "./functions/tabs";
tabs();



// ========================================================================================


// Файл со слайдерами
import "./functions/sliders";


// ========================================================================================


// Спойлеры
import spollers from "./functions/spollers";
spollers();



// ========================================================================================



// Звёздный рейтинг 
// import formRating from "./functions/rating";
// formRating();



// ========================================================================================



// quantity
// import quantity from './functions/quantity'
// quantity();


// ========================================================================================


// Динамический адаптив
import "./functions/dynamic-adapt";


// ========================================================================================


// Фикс фулскрин-блоков
import './functions/fix-fullheight';


// ========================================================================================

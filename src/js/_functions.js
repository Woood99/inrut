// ========================================================================================

import burgerMenu from './functions/burger';
burgerMenu();


// ========================================================================================


import popup from './functions/popup';
const city = new popup(null, '.popup-primary--city');
const add = new popup(null, '.popup-primary--add');
const personalArea = new popup(null, '.popup-secondary--personal');


// ========================================================================================


// Табы
// import tabs from "./functions/tabs";
// tabs();



// ========================================================================================


// Файл со слайдерами
import "./functions/sliders";


// ========================================================================================


// import validateForms from './functions/validate-forms';
// const rules1 = [...];

// const afterForm = () => {
//   console.log('Произошла отправка');
// };

// validateForms('.form-1', rules1, afterForm);



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

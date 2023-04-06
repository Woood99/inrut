import {
    Calendar
} from 'fullcalendar';


calendarPrimary();









function calendarPrimary() {
    const calendarPrimaryEl = document.querySelector('.calendar-primary');
    if (!calendarPrimaryEl) return;
    const calendaryPrimary = new Calendar(calendarPrimaryEl, {
        initialView: 'dayGridMonth',
        locale: 'ru',
        dayMaxEvents: 1,
        moreLinkContent: (obj) => `+ еще ${obj.num}`,
        events: [{
                id: 1,
                title: '1-комн. квартира,55м², 4/5эт. ',
                start: '2023-04-03T09:45:00'
            },
            {
                id: 1,
                title: '1-комн. квартира,55м², 4/5эт. ',
                start: '2023-04-03T09:45:00'
            },
        ],
        // https://fullcalendar.io/api/demo-feeds/events.json?overload-day
    })

    calendaryPrimary.render();
}

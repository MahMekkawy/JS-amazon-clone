import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function deliveryDay(deliveryOption) {

    const today = dayjs();
    const deliveryDays = today.add(deliveryOption.deliveryDays, 'days');
    const weekDay = deliveryDays.format('dddd');
    let dateString = deliveryDays;

    if (weekDay === 'Saturday') {
        dateString = today.add((deliveryOption.deliveryDays + 2), 'days');
    } else if (weekDay === 'Sunday') {
        dateString = today.add((deliveryOption.deliveryDays + 1), 'days');
    }

    return dateString.format('dddd, MMMM D');
}

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCent: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCent: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCent: 999
    }
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}
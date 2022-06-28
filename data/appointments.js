const { faker } = require('@faker-js/faker');
const DOCTORS = require('./doctors');
const roundToNearest15 = require('../utils');

const APPOINTMENTS = [
    {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        date: roundToNearest15(faker.date.future()),
        kind: 'New Patient',
        doctor: DOCTORS[0].id
    },
    {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        date: roundToNearest15(faker.date.future()),
        kind: 'Follow-up',
        doctor: DOCTORS[1].id
    }
]

module.exports = APPOINTMENTS;
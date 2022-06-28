const { faker } = require('@faker-js/faker');

const DOCTORS = [
    {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
    {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
]

module.exports = DOCTORS;
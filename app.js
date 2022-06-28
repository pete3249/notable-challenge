const express = require('express');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DOCTORS = require('./data/doctors');
const APPOINTMENTS = require('./data/appointments');
const roundToNearest15 = require('./utils');

app.get('/doctors', async (req, res) => {
    let list = DOCTORS.map((doctor) => doctor.firstName + ' ' + doctor.lastName)
    console.log(DOCTORS)
    res.send(list);
})

app.get('/doctors/:id', async (req, res) => {
    let doctor = DOCTORS.find((doc) => doc.id === req.params.id)
    res.send(doctor.firstName + ' ' + doctor.lastName);
})

app.get('/doctors/:id/appointments', async (req, res) => {
    let doctorId = req.params.id;
    let date = req.query.date;
    let matching = APPOINTMENTS.filter((app) => app.doctor === doctorId);

    if (date) {
        let d = new Date(req.query.date);
        matching.filter((app) => new Date(app.date).toDateString() === d.toDateString())
    }
    res.send(matching);
})

app.delete('/doctors/:id/appointments/:app', async (req, res) => {
    let doctorId = req.params.id;
    let appId = req.params.app;
    const index = APPOINTMENTS.findIndex((app) => app.id === appId && app.doctor === doctorId);
    APPOINTMENTS.splice(index, 1 );
    res.send('Appointment removed');
})

app.post('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    const { firstName, lastName, date, kind } = req.body;
    const suggestedDate = roundToNearest15(new Date(date));

    const sameStartTime = APPOINTMENTS.filter((app) => app.doctor === doctorId && roundToNearest15(new Date(app.date)) === suggestedDate);
    if (sameStartTime.length < 2) {
        APPOINTMENTS.push({
            id: faker.datatype.uuid(),
            firstName,
            lastName,
            date: suggestedDate,
            kind,
            doctor: doctorId
        })
        res.send(APPOINTMENTS[-1]);
    } else {
        res.send('Appointment not available. Please try another time')
    }
})

app.get('/appointments', async (req, res) => {
    res.send(APPOINTMENTS);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
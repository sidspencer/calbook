var express = require('express');
var router = express.Router();
var CalBookRepo = require('../src/CalBookRepo');

/* GET home page. */
router.get('/', (req, res, next) => {
  CalBookRepo.getAllAppointments().then((appointments) => {
    res.send(appointments);
  });
});

router.get('/bydate/:dateCode', (req, res, next) => {
  let dc = req.params['dateCode'];
  if (!!dc && !!dc.length) {
    let yyyy = Number.parseInt(dc.substring(0,4));
    let mm = Number.parseInt(dc.substring(4,6));
    let dd = Number.parseInt(dc.substring(6));

    CalBookRepo.getAppointmentsByDate(yyyy, mm, dd).then((result) => {
      res.send(result);
    })
  } else {
    next();
  }
});

// create
router.put('/', (req, res, next) => {
  CalBookRepo.createNewAppointment(req.body).then((result) => {
    res.send(result);
  });
})

//update
router.post('/', (req, res, next) => {
  CalBookRepo.updateAppointment(req.body).then((result) => {
    res.send(result);
  });});

router.delete('/:id', (req, res, next) => {
  CalBookRepo.deleteAppointment(req.params['id']).then((result) => {
    res.send(result);
  });});

module.exports = router;

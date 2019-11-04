var express = require('express');
var router = express.Router();
var CalBookRepo = require('../src/CalBookRepo');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  CalBookRepo.getAllAppointments().then((appointments) => {
    res.send(appointments);
  });
});

router.get('/bydate/:dateCode', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let dc = req.params['dateCode'];
  if (!!dc && !!dc.length) {
    let yyyy = dc.substring(0,4);
    let mm = dc.substring(4,6);
    let dd = dc.substring(6);

    CalBookRepo.getAppointmentsByDate(yyyy, mm, dd).then((result) => {
      res.send(result);
    })
  } else {
    next();
  }
});

// create
router.put('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  CalBookRepo.createNewAppointment(req.body).then((result) => {
    res.send(result);
  });
})

//update
router.post('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  CalBookRepo.updateAppointment(req.body).then((result) => {
    res.send(result);
  });});

router.delete('/:id', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  CalBookRepo.deleteAppointment(req.params['id']).then((result) => {
    res.send(result);
  });});

module.exports = router;

const Clarifai = require('clarifai');
const api = require('../keys/clarifaiApi');

const app = new Clarifai.App({
  apiKey:api.key
 });

 const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
 }

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => {res.status(400).json('Unable to get entries!')})
};

module.exports = {
  handleImage:handleImage,
  handleApiCall:handleApiCall
}
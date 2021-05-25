const handleProfileGet = (req, res) => {
  const { id } = req.params;
  knex.select('*').from('users').where({ id: id })
  .then(user => {
    if(user.length) {res.json(user[0]);}
    else {res.status(400).json('User not found!')}
  })
  .catch(err => {
    res.status(400).json('Error retrieving user!')
  })
};

module.exports = {
  handleProfileGet:handleProfileGet
}
const handleSignIn = (req, res, knex, bcrypt) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  knex.select('email', 'hash')
  .from('login')
  .where('email', '=', email)
  .then(async data => {
    if(await bcrypt.compare(password, data[0].hash)) {
      knex.select('*')
      .from('users')
      .where('email', '=', email)
      .then(user => {
        res.json(user[0]);
      })
      .catch(err => res.status(400).json('Unable to fetch user.'))
    } else {
      res.status(400).json('Incorrect credentials.')
    }
  })
  .catch(err => res.status(400).json('Incorrect credentials.'))
};

module.exports = {
  handleSignIn: handleSignIn
}
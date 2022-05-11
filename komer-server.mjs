import express from 'express'
const app = express()
const PORT = 8080
app.use(express.json())



/* // Configure CRUD routes to manage jokes 
app.get('/api/jokes', gamesApi.getGames)           // Get all jokes
app.get('/api/jokes/:id', gamesApi.getGame)        // Get a joke details
app.delete('/api/jokes/:id', gamesApi.deleteGame)  // Delete a joke
app.put('/api/jokes/:id', gamesApi.updateGame)     // Update a joke
app.post('/api/jokes', gamesApi.createGame)        // Delete a joke */

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));

app.get('/tshirt', (req,res) => {
        res.status(200).send({
            tshirt: '👕',
            size: 'large'
        });
});

app.post('/tshirt/:id', (req,res)=>{

      const {id} = req.params;
      const {logo} = req.body;
      
      if(!logo){
          res.status(418).send({message : "Logo needded!"})
      }
      
      res.send({
          tshirt: `👕 with your ${logo} and ID of ${id}`,
      });

});
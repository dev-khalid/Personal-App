import express from 'express'; 
import data from './data/gymData.js'; 
const app = express(); 
app.use(express.json()); 

/**
 * @TASKS
 * 1.Send data to frontend
 */
 
app.get('/api/gym',(req,res) => {
  //req.body er moddhe month and year asbe sei onusare filter kore data send korte hobe db theke.  
  res.send(data); 
});


app.listen(5000, () => { 
  console.log(`Server is running on port 5000`)
}); 
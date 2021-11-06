import express from 'express'; 
import gymData from './data/gymData.js'; 
const app = express(); 
app.use(express.json()); 

/**
 * @TASKS
 * 1.Send data to frontend
 */
 

let data = gymData; 
app.get('/api/gym',(req,res) => {
  //req.body er moddhe month and year asbe sei onusare filter kore data send korte hobe db theke.  
  res.send(data); 
});
app.post('/api/gym',(req,res,next) => { 

  data.push({
    userId: req.body.userId, 
    // isDone: req.body.isDone, 
    gymDate: new Date(req.body.gymDate).getTime(),//pushing the timestamps the timestamp.
  }) 
  console.log(data); 
  res.send(data); 
})

app.listen(5000, () => { 
  console.log(`Server is running on port 5000`)
}); 
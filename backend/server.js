import express from 'express'; 
import datesToAddClassTo from './data/datesToAddClassTo.js';

const app = express(); 
app.use(express.json()); 
let d = datesToAddClassTo; 
app.get('/api/gymdates',async(req,res,next) => { 
  res.send(d); 
})
app.post('/api/gymDates',async(req,res,next) => { 

  d.push(req.body.day); 
  res.send(d); 
})
app.listen(5000, () => { 
  console.log(`Server is running on port 5000`)
}); 
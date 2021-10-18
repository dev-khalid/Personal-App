import express from 'express'; 
import datesToAddClassTo from './data/datesToAddClassTo.js';

const app = express(); 
app.use(express.json()); 
let d = datesToAddClassTo; 
app.get('/api/gymdates',async(req,res,next) => { 
  res.send(d); 
})
app.post('/api/gymDates',async(req,res,next) => { 

  if(d.includes(req.body.day)) { 
    d = d.filter(days => days !== req.body.day); 
  } else { 
    d.push(req.body.day); 
  }
  res.send(d); 
})
app.listen(5000, () => { 
  console.log(`Server is running on port 5000`)
}); 
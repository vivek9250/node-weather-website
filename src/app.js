const express=require('express');
const path=require('path');
const app=express();
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
//register paths
const publicdir = path.join(__dirname,'../public');
const viewDir=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');


app.use(express.static(publicdir));

//set up hbs engine and views path
app.set('views',viewDir);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
 res.render('index',{
   title:'Weather',
   name:'vivek sharma'
 });
});

app.get('/about',(req,res)=>{
res.render('about',{
  title:'About',
  name:'vivek sharma'
});
});
app.get('/help',(req,res)=>{
res.render('help',{
  title:'Help',
  name:'vivek sharma'
});
});

app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    res.send({
      "errorMessage":"location is not provided"
    });
  }
  else
  {
    geocode(req.query.address,({status,errorMessage,data})=>{
      if(status===200)
      {
         forecast(data[0],data[1],req.query.address,({status,errorMessage,data})=>{
           if(status===200)
           {
             res.send({
               image:data.image_icon,
               description:data.weatherDescription,
               searchlocation:data.searchlocation
             });
           }
           else{
             res.send({
               errorMessage
             });
           }

         });
      }
      else{
        res.send({
          status,
          errorMessage,
          data
        });
      }

    });

  }

});
app.get('/help/*',(req,res)=>{
res.render('404',{
  errorMessage:'Help Page not found in Help section',
  title:'help',
  name:'vivek sharma'
});
});
app.get('*',(req,res)=>{
  const url=req.url;
res.render('404',{
  errorMessage:url+' Page not found',
  title:'NOT FOUND',
  name:'vivek sharma'
});
});
app.listen(3000,()=>{
console.log('server is running at port 3000');
});

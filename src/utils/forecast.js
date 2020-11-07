const request=require('request');
const forecast=(longitude,latitude,city,callback)=>{
const url='http://api.weatherstack.com/current?access_key=e8d3f83dfeac00b85ff0d8463924b8f9&query='+latitude+','+longitude+'';
request({url,json:true},(error,response)=>{
  if(error)
  {
    const serverResponse={
      status:300,
      errorMessage:'Unable to connect to internet...',
      data:undefined
    };
    return callback(serverResponse);
  }
  else{
    const responseData=response.body.current;
    const searchlocation=response.body.location.name+','+response.body.location.region+','+response.body.location.country;
    const weatherDescription='It is '+responseData.weather_descriptions+' today with temperature of '+
    responseData.temperature+' degree celcius but you will feel outside as '+
    responseData.feelslike+' degree celcius';
    const image_icon=responseData.weather_icons;
    const data={
      searchlocation,
      city,
      weatherDescription,
      image_icon
    };
    const serverResponse={
      status:200,
      errorMessage:undefined,
      data
    };
    return callback(serverResponse);
  }
});
};
module.exports=forecast;

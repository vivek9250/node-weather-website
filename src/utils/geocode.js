const request=require('request');
const geocode=(address,callback)=>{
  address=encodeURI(address);
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoidml2ZWs5MjUwIiwiYSI6ImNrZ3E2ZHpocTIydWcydW5hc3A4YjZ6N3kifQ.Gvx49BErCG-965dOZAuvBg&limit=1';
  request({url,json:true},(error,response)=>{
    if(error)
    {
       const serverResponse = {
         status:300,
         errorMessage:"Unable to connect to Internet...",
         data:undefined
       };
      return callback(serverResponse);
    }
    else
    {
      response=response.body;
      if(response.features.length===0)
      {
        const serverResponse = {
          status:300,
          errorMessage:"No location found",
          data:[]
        };
       return callback(serverResponse);
      }
      else {
        {
          const serverResponse = {
            status:200,
            errorMessage:"Success",
            data:response.features[0].geometry.coordinates
          };
          return callback(serverResponse);
        }
      }

    }
  });
};
module.exports=geocode;

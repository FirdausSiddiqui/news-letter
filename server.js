const express=require("express");
const bodyParser=require("body-parser");

const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res)
{
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status : "subscribed",
        merge_fields : {
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }
   const jsonData=JSON.stringify(data);

   const url="https://us4.api.mailchimp.com/3.0/lists/4abfedc270";
   const option={
     method:"post",
     auth:"firdaus:c2ef06ff3fdf578e82cf49949a00e492-us4"
   }
  const request= https.request(url,option,function(response)
 {
   response.on("data",function(data)
 {
   console.log(JSON.parse(data));
 })
 })

 request.write(jsonData);
 request.end();
 res.send("submitted");
 })


app.listen(3000,function()
{
  console.log("server is working on port 3000");
});

const express = require('express');
const request = require('request');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/signup.html");
})
 
app.post('/', function (req, res) {
    const firstname = req.body.Firstname
    const lastname = req.body.Lastname
    const email = req.body.email
 
    const listId = "ab83b7d17e";
    const subscribingUser = {
        firstName: firstname,
        lastName: lastname,
        email: email
    };
 
    mailchimp.setConfig({
        apiKey: "2117a678f07511a5dacb797788a98a1e-us21",
        server: "us21",
    });
 
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    }
    function successCallback(result) {
        res.sendFile(__dirname + '/success.html')
 
    }
    function failureCallback(error) {
        res.sendFile(__dirname + '/failure.html')
 
    }
 
    run().then(successCallback, failureCallback);
 
});

app.listen(process.env.PORT || 3000, function(){
    console.log('server is ready');
})

//2117a678f07511a5dacb797788a98a1e-us21
//ab83b7d17e

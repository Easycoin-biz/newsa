var express = require('express');
var router = express.Router();

var app = express()
var axios = require('axios');
var qs = require('qs');
var crypto = require('crypto');

const { onValue, ref, set, orderByChild, equalTo, get } = require('firebase/database');
const { db } = require('../Firebase');

app.use(express.json({
  verify: (req, res, buf) => {
    if(url.startsWith("/getPaymentStatus")){
      req.rawBody = buf.toString();
    }
  }
}));

const { Client, Webhook, resources } = require('coinbase-commerce-node');
const { type } = require('os');
const coinbaseSecret = '6388117f-bfcb-453e-887a-13e3f3567f8b';
Client.init('32f4877f-39e4-451f-a26e-13c1d14878ac');

const checkAuthorization = (req, res, next) => {
  // Check if the user is authorized (e.g. check if they have a valid access token)
  if (req.headers.authorization === req.headers.authorization) {
    // If the user is authorized, call the next middleware in the chain
    next();
  } else {
    // If the user is not authorized, return a 401 Unauthorized response
    res.json({ error: 'Unauthorized' });
  }
}

router.get('/', (req, res) =>{

  res.send('hello world')

});

/* GET home page. */
router.get('/createPayment', function (req, res, next) {

  var { cmd, amount, currency1, currency2, buyer_email } = req.body

  var data = qs.stringify({
    'version': '1',
    'cmd': 'create_transaction',
    'format': 'json',
    'key': 'dfc9f8c37f6f0dea62481d40b67cc1bf083f2c44ec8e7e907f4b4d245d807b14',
    'amount': '1',
    'currency1': "USD",
    'currency2': "BTC",
    'buyer_email': 'saimimtiaz22@gmail.com'
  });
  const params = {
    version: '1',
    cmd: 'create_transaction',
    format: 'json',
    key: 'dfc9f8c37f6f0dea62481d40b67cc1bf083f2c44ec8e7e907f4b4d245d807b14',
    amount: '1',
    currency1: "USD",
    currency2: "BTC",
    buyer_email: 'saimimtiaz22@gmail.com'
  };
  API_key = 'dfc9f8c37f6f0dea62481d40b67cc1bf083f2c44ec8e7e907f4b4d245d807b14'
  const dataString = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&');


  const hmac = crypto
    .createHmac('sha512', API_key)
    .update(dataString)
    .digest('hex');
  console.log(hmac);  
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.coinpayments.net/api.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'HMAC': 'd4579b3785abdfa988672d8fe08dd7f9509f0de9cd45485b045f8fb58b65ce7731d67bc5d6f670c35560f2b9a992ecca90e3bcedfcb3d5e0db733bcd93ad15fc'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });



  res.render('index', { title: 'Express' });
});




/* GET home page. */
router.post('/createTransaction', async (req, res, next) => {

  const API_KEY = '32f4877f-39e4-451f-a26e-13c1d14878ac';
  const API_SECRET = '0A2342F2eC90E3bbF774359946780c41d2399819A20eba5217a3d9677Ef5BB09';
  const API_VERSION = '1';

  console.log(req.body)

  const { amount, currency1, currency2, buyer_email } = req.body;

  const command = 'create_transaction';
  const params = {
    key: API_KEY,
    cmd: command,
    version: API_VERSION,
    amount: amount,
    currency1: currency1,
    currency2: currency2,
    buyer_email: buyer_email,
  };

  try{
    const charge =await resources.Charge.create({
      name: "Test",
      description:"buyer_email",
      local_price:{
        amount:amount,
        currency:"USD"
      },
      pricing_type : 'fixed_price',
      metadata:{
        user_id: buyer_email
      }

    });
    res.status(200).json({
      charge:charge,
    })
  }
  catch(error){
    res.status(500).json({
      error:error,
    })
  }
  // res.render('index', { title: 'Express' });
});



/* GET home page. */
router.post('/getPaymentStatus', async (req, res, next) => {

  const API_KEY = '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af';
  const API_SECRET = '0A2342F2eC90E3bbF774359946780c41d2399819A20eba5217a3d9677Ef5BB09';
  const API_VERSION = '1';
  const { transactionId } = req.body;

  console.log(req.body)

  // const command = 'code';
  // const params = {
  //   key: API_KEY,
  //   cmd: command,
  //   version: API_VERSION,
  //   txid: transactionId
  // };
  //  try { const event = Webhook.verifyEventBody( JSON.stringify(req.body), req.headers['x-cc-webhook-signature'], process.env.COINBASE_WEBHOOK_SECRET ); 
  //  res.status(200).json({
  //   charge:"created",
  // }) 
  // } 
  //  catch (error)
  //   { console.error(error);res.json({ error }); 
  // }
  try { const event = Webhook.verifyEventBody( JSON.stringify(req.body), req.headers['x-cc-webhook-signature'], 
  process.env.COINBASE_WEBHOOK_SECRET ); 
  console.log(event);
 } 
  catch (error) 
  { res.json({ error }); } 
  // res.render('index', { title: 'Express' });
});


router.get('/updatePromotion', checkAuthorization, (req, res) => {
  console.log("hereeeeeeeinsindeeeeee");
  console.log(response);

  setInterval(() => {
    console.log("hereeeeeeeinsindeeeeee intervallll")
    
  const API_KEY = 'dfc9f8c37f6f0dea62481d40b67cc1bf083f2c44ec8e7e907f4b4d245d807b14';
  const API_SECRET = '0A2342F2eC90E3bbF774359946780c41d2399819A20eba5217a3d9677Ef5BB09';
  const API_VERSION = '1';
  const command = 'get_tx_info';

  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://easy-588b2-default-rtdb.firebaseio.com/promoted.json?orderBy="status"&equalTo=0',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    const result = response.data
    console.log(result);
    Object.entries(result).forEach((entry) => {
      const [key, value] = entry;

      console.log(`${key}: ${value.status}`);

      try { const event = Webhook.verifyEventBody( JSON.stringify(req.body), req.headers['x-cc-webhook-signature'], 
        process.env.COINBASE_WEBHOOK_SECRET ); 
        console.log(event);
        if(response.data.result.status == 1){

          axios.patch(`https://easy-588b2-default-rtdb.firebaseio.com/promoted/${key}.json`, {
            status: 1
          })
            .then(response => {
              console.log(response.data);
              console.log("Dataaa Updated")
            })
            .catch(error => {
              console.log(error);
            });
          }
      } 
      catch (error) 
        { res.json({ error }); } 
          

          // res.json(response.data);
        


    })
    // console.log(JSON.stringify(response.data));
  })
 


  }, 100000); 
});


router.get('/updateCoinData', checkAuthorization, (req, res) => {

  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://easy-588b2-default-rtdb.firebaseio.com/coins.json?orderBy="ownerId"&equalTo="sKsvOQnlk1WYfTuiYgdppT0nusH3"',
    headers: { }
  };

  setInterval(() => {

  axios(config)
  .then(function (response) {
    const result = response.data
    //console.log("result", result)
    Object.entries(result).forEach((entry) => {
      const [key, value] = entry;

      console.log(`${key}: ${value.symbol}`);

      axios.post('https://api.livecoinwatch.com/coins/single', {
        currency: 'USD',
        code: value.symbol,
        meta: true,
      }, {
        headers: {
          'content-type': 'application/json',
          'x-api-key': '7c029b9c-f2cd-4e2e-be6f-71d7a22b42f9',
        },
      })
      .then((response) => {
        console.log("Data hereee")
        console.log(response.data.name);


        axios.patch(`https://easy-588b2-default-rtdb.firebaseio.com/coins/${key}.json`, {
          price: response.data.rate,
          cap : response.data.cap
        })
          .then(response => {
            console.log(response.data);
            console.log("Dataaa Updated")
          })
          .catch(error => {
            console.log(error);
          });


      })
      .catch((error) => {
        console.error(error);
      });
    })
    // console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  }, 120000);
  

});

router.get('/verifyIp/:ip', async (req, res, next) => {
	try {
		const ip = req.params.ip;
		var point = 0;
		var id = null;
		const response = await axios.get(
			`https://pinkvote-436c5-default-rtdb.firebaseio.com/ipaddresses/.json`
		);
		const result = response.data;
		if (result) {
			var keys = [];
			var data = [];
			Object.entries(result).forEach(entry => {
				const [key, value] = entry;
				keys.push(key);
				data.push(value);
			});
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				console.log(data[i]);
				if (data[i].ip == ip) {
					point = i;
					id = keys[i];
					break;
				}
			}
		}
		if (!id) {
			await axios.post(
				`https://pinkvote-436c5-default-rtdb.firebaseio.com/ipaddresses/.json`,
				{
					ip: ip,
					n: 1,
					time: Date.now(),
				}
			);
			res.status(200).json({ success: true });
		} else {
			if (Date.now() - data[point].time >= 3600000 || data[point].n < 2) {
				if (data[point].n < 2) {
					await axios.patch(
						`https://pinkvote-436c5-default-rtdb.firebaseio.com/ipaddresses/${id}.json`,
						{
							ip: ip,
							n: 2,
						}
					);
					res.status(200).json({ success: true });
				} else {
					await axios.patch(
						`https://pinkvote-436c5-default-rtdb.firebaseio.com/ipaddresses/${id}.json`,
						{
							ip: ip,
							n: 1,
							time: Date.now(),
						}
					);
					res.status(200).json({ success: true });
				}
			} else {
				res.status(200).json({ success: false });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, err: err });
	}
});

router.post("/verify-token", async (req,res) => {
    try{
        let token = req.body;
        // replace APP_SECRET_KEY with your reCAPTCHA secret key
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${'6LexnLEkAAAAADplpiq3K3hHXVAGP4ZzeGz91W0_'}&response=${token}`);
        return res.status(200).json({
            success:true,
            message: "Token successfully verified",
            data: response.data
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Error verifying token"
        })
    }
});



module.exports = router;

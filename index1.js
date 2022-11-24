var express = require('express');
var app = express();

app.get('/orders', (request, response)=> {
   
    var sql = require("mssql");

    // config for your database
    var dbConfig=
    {
      server:'DESKTOP-91IU3IO\\MSSQL',
      database:'assignment',
      user :'sa',
      password :'Bujji@235',
      pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: false, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        },
      port : 51057
    }

    // connect to your database
    sql.connect(dbConfig, (err)=> {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from orders', (err, data)=> {
            
            if (err) console.log(err)

            // send records as a response
            response.send(data.recordset);            
        });
    });
});

app.get('/orders/:orderId', (request, response)=> {
   
  var sql = require("mssql");
  const{orderId}=request.params;
  // config for your database
  var dbConfig=
  {
    server:'DESKTOP-91IU3IO\\MSSQL',
    database:'assignment',
    user :'sa',
    password :'Bujji@235',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      },
    port : 51057
  }

  // connect to your database
  sql.connect(dbConfig, (err)=> {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query(`select * from orders where order_id=${orderId}`, (err, data)=> {
          
          if (err) console.log(err)

          // send records as a response
          response.send(data.recordset);            
      });
  });
});
//
app.use(express.json())

app.post('/orders', (request, response)=> {
   
    var sql = require("mssql");

    const orderDetails=request.body;
    const {Order_id,User_id,Product_name,Status,Created_date}=orderDetails
    
    // config for your database
    var dbConfig=
    {
      server:'DESKTOP-91IU3IO\\MSSQL',
      database:'assignment',
      user :'sa',
      password :'Bujji@235',
      pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: false, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        },
      port : 51057
    }

    // connect to your database
    sql.connect(dbConfig, (err)=> {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`insert into orders (Order_id,User_id,Product_name,Status,Created_date) values (${Order_id},${User_id},'${Product_name}','${Status}','${Created_date}')`, (err, data)=> {
            if (err) console.log(err)

            // send records as a response
            response.send(data);       
        });
    });
  });
//
app.put('/orders/:orderId', (request, response)=> {
   
  var sql = require("mssql");

  const {orderId}=request.params

  const orderDetails=request.body;

  const {Order_id,User_id,Product_name,Status,Created_date}=orderDetails
  
  // config for your database
  var dbConfig=
  {
    server:'DESKTOP-91IU3IO\\MSSQL',
    database:'assignment',
    user :'sa',
    password :'Bujji@235',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      },
    port : 51057
  }

  // connect to your database
  sql.connect(dbConfig, (err)=> {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query(`update orders set Order_id=${Order_id},User_id=${User_id},Product_name='${Product_name}',Status='${Status}',Created_date='${Created_date}' where order_id=${orderId}`, (err, data)=> {
          if (err) console.log(err)

          // send records as a response
          response.send(data);       
      });
  });
});

//
app.delete('/orders/:orderId', (request, response)=> {
   
  var sql = require("mssql");

  const {orderId}=request.params
  
  // config for your database
  var dbConfig=
  {
    server:'DESKTOP-91IU3IO\\MSSQL',
    database:'assignment',
    user :'sa',
    password :'Bujji@235',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      },
    port : 51057
  }

  // connect to your database
  sql.connect(dbConfig, (err)=> {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query(`delete from orders where order_id=${orderId}`, (err, data)=> {
          if (err) console.log(err)

          // send records as a response
          response.send("Book Deleted Sucessfully");       
      });
  });
});


app.listen(3000, ()=> {
    console.log('Server is running..');
});

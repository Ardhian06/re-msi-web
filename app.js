const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const upload = require('express-fileupload');
const session = require('express-session');
const flush = require('connect-flash');
const app = express();  

app.use(upload())
app.use(flush())
//mysql con
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'company_profile'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected');
});

//set view file
app.set('views', path.join(__dirname,'views'));
app.set('public', path.join(__dirname,'public'));
app.use(express.static('public'));

// Virtual Path Prefix '/static'


//set view engine
app.set('view engine', 'ejs');


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// index page
app.get('/', (req, res) => {
    let sql = "SELECT * FROM team";
    let review = "Select * from review"
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
            
        
   
    let query2 = connection.query(review, (err, row2) => {
        if(err) throw err;
            
    
    res.render('index',{
        title : 'MSI Official Page',
        team : rows ,
        review : row2
          })
      })
    })
})

//service page
app.get('/service', (req, res) => {
    res.render('service', {
        title : 'MSI Official Service Page'
    })
})

//login page
app.get('/login', (req, res) => {
    res.render('login', {
        title : 'MSI Official Login Page',
        message : ''
    })
})


//auth
app.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/dashboard');
			} else {
                res.render('login', {
                    title : 'MSI Official Login Page',
                    message : 'Username dan Password yang anda masukan  salah'                  
                })
			}			
		});
	} else {
        
		res.render('login', {
            title : 'MSI Official Login Page',
            message:''
        })
	}
});
//admin page
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        let sql = "SELECT * FROM admin";
        let query = connection.query(sql, (err, rows) => {
          if(err) throw err;
             res.render('admin', {
             title : 'Admin Page',
             admin : 'admin',
             admin : rows,
             message :'',
             ad : 'active',
             tm :'',
             rv :'',
             ct :''
        })
    })
    
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message :''
        })
	}
})

// logout
app.get('/logout', (req, res) => {
    req.session.loggedin = false;
    res.render('login', {
        message : 'Anda Telah Logout'
    })
})
//add admin
app.get('/add-admin', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        res.render('admin_add', {
            title : 'ADD-Admin',
            message : '',
            ad : 'active',
            tm :'',
            rv :'',
            ct :''
        })
    
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message : ''
        })
	}
})
    


//save admin
app.post('/save', (req, res) => {
    let data = {username: req.body.username, password: req.body.password};
    let sql = "INSERT INTO admin set ?";
    let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/dashboard')
    })
})

// edit admin
app.get('/edit-admin/:userId',(req, res) => {
    if (req.session.loggedin) {

        username = req.session.username;

        const userId = req.params.userId;
        let sql = `Select * from admin where id = ${userId}`;
        let query = connection.query(sql,(err, result) => {
            if(err) throw err;
                 if (userId == result[0].id) {
                        res.render('admin_edit', {
                      title : 'Edit Admin',
                     user : result[0],
                     ad : 'active',
                     tm :'',
                     rv :'',
                     ct :''
                    
                });
                } else {
                    req.session.loggedin = false;
                    res.render('login_edit', {
                    title : 'MSI Official Login Page',
                    message : ''
                })
            }

         });
    
	        } else {
		res.render('login_edit', {
            title : 'MSI Official Login Page',
            message : ''
        })
	}

});


// update admin
app.post('/update-admin', (req, res) => {
   
    const adminId = req.body.id;
    let sql = "update admin SET username='"+req.body.username+"',  password='"+req.body.password+"' where id ="+adminId;
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/dashboard');
    })
})
// delete admin
app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from admin where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboard');
    });
});

//team
app.get('/team', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        let sql = "SELECT * FROM team";
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
             res.render('team',{
                 title : 'Team',
                 team : rows,
                 message :'',
                 ad : '',
                 tm :'active',
                 rv :'',
                 ct :''
             })
        })    
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message:''
        })
	}
    
})

//add team
app.get('/add-team', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        res.render('team_add', {
            title : 'Add Anggota Team',
            ad : '',
            tm :'active',
            rv :'',
            ct :''
        })
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message :''
        })
	}
    
})

//save add team
app.post('/save-team', (req, res) => {
    var file =req.files.file
    let filename= file.name
    let data = {nama: req.body.nama_team, job: req.body.job, img_name: filename};
    let sql = "INSERT INTO team set ?";
    let query = connection.query(sql, data,(err, results) => {
        file.mv('./public/uploads/'+filename,(err) => {
        if(err) throw err;
        res.redirect('/team');
        })
    })
})

//edit team
app.get('/edit-team/:userId',(req, res) => {
    if (req.session.loggedin) {

        username = req.session.username;

        const userId = req.params.userId;
        let sql = `Select * from team where id_team = ${userId}`;
        let query = connection.query(sql,(err, result) => {
            if(err) throw err;
                 if (userId == result[0].id_team) {
                    res.render('team_edit', {
                        title : 'Edit Anggota Team',
                        team : result[0],
                        ad : '',
                        tm :'active',
                        rv :'',
                        ct :''
                        
                    });
                } else {
                    req.session.loggedin = false;
                    res.render('login_edit', {
                    title : 'MSI Official Login Page',
                    message:''
                })
            }

         });
    
	        } else {
		res.render('login_edit', {
            title : 'MSI Official Login Page',
            message:''
        })
	}

   
});

//update team
app.post('/update-team', (req, res) => {
        var file =req.files.file
        let filename= file.name
        const teamId = req.body.id_team;
       
        let img = `SELECT * FROM team WHERE id_team = `+teamId;
        let querydelete = connection.query(img, (err, rows) =>{
                     image=rows[0].img_name
                     const pathToFile = './public/uploads/'+image
    
                    fs.unlink(pathToFile, function(err) {
                     if (err) {
                      throw err
                     } else {
                      console.log("Successfully deleted the file.")
                     }
                })
             }) 
             let sql = "update team SET nama='"+req.body.nama+"', job='"+req.body.job+"', img_name='"+filename+"' where id_team ="+teamId;
             let query = connection.query(sql, (err, results) => {
                 file.mv('./public/uploads/'+filename,(err) => {
                     if(err) throw err;
                     res.redirect('/team');
                     })
             })
    })
    
// delete team
app.get('/delete-team/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from team where id_team = ${userId}`;
    let img = `SELECT * FROM team WHERE id_team = ${userId}`;
    let queryimage = connection.query(img, (err, rows) =>{
                 image=rows[0].img_name
                 const pathToFile = './public/uploads/'+image

                fs.unlink(pathToFile, function(err) {
                 if (err) {
                  throw err
                 } else {
                  console.log("Successfully deleted the file.")
            
                 }
            })
         }) 
        let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/team');
    })
})
//send email
app.post('/send-email', (req, res) => {
    let data = {email: req.body.email};
    let sql = "INSERT INTO email set ?";
    let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    })
})

// menu Email
app.get('/email', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        let sql = "SELECT * FROM email";
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
             res.render('email',{
                 title : 'E-mail',
                 mail : rows,
                 message :'',
                 ad : '',
                 tm :'',
                 rv :'',
                 ct :'active'
             })
        })    
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message:''
        })
	}
    
})
//delete email
app.get('/delete-mail/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from email where id_email = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/email');
    });
});
  
// menu review
app.get('/review', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        let sql = "SELECT * FROM review";
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
             res.render('review',{
                 title : 'Review',
                 review : rows,
                 message :'',
                 ad : '',
                 tm :'',
                 rv :'active',
                 ct :''
             })
        })    
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message:''
        })
	}
    
})

//add review
app.get('/add-review', (req, res) => {
    if (req.session.loggedin) {
        username = req.session.username;

        res.render('review_add', {
            title : 'Add Review',
            ad : '',
            tm :'',
            rv :'active',
            ct :''
        })
	} else {
		res.render('login', {
            title : 'MSI Official Login Page',
            message :''
        })
	}
    
})
//save add review
app.post('/save-review', (req, res) => {
    var file =req.files.file
    let filename= file.name
    let data = { reviewer: req.body.reviewer, job_reviewer: req.body.job_reviewer, testimonial: req.body.testimonial, img_reviewer: filename};
    let sql = "INSERT INTO review set ?";
    let query = connection.query(sql, data,(err, results) => {
        file.mv('./public/uploads/'+filename,(err) => {
        if(err) throw err;
        res.redirect('/review');
        })
    })
})

//edit review
app.get('/edit-review/:userId',(req, res) => {
    if (req.session.loggedin) {

        username = req.session.username;

        const userId = req.params.userId;
        let sql = `Select * from review where id_review = ${userId}`;
        let query = connection.query(sql,(err, result) => {
            if(err) throw err;
                 if (userId == result[0].id_review) {
                    res.render('review_edit', {
                        title : 'Edit review',
                        review : result[0],
                        ad : '',
                        tm :'',
                        rv :'active',
                        ct :''
                        
                    });
                } else {
                    req.session.loggedin = false;
                    res.render('login_edit', {
                    title : 'MSI Official Login Page',
                    message:''
                })
            }

         });
    
	        } else {
		res.render('login_edit', {
            title : 'MSI Official Login Page',
            message:''
        })
	}

   
});

//update review
app.post('/update-review', (req, res) => {
        var file =req.files.file
        let filename= file.name
        const reviewId = req.body.id_review;
       
        let img = `SELECT * FROM review WHERE id_review = `+reviewId;
        let querydelete = connection.query(img, (err, rows) =>{
                     image=rows[0].img_reviewer
                     const pathToFile = './public/uploads/'+image
    
                    fs.unlink(pathToFile, function(err) {
                     if (err) {
                      throw err
                     } else {
                      console.log("Successfully deleted the file.")
                     }
                })
             }) 

             let sql = "update review SET reviewer='"+req.body.reviewer+"', job_reviewer='"+req.body.job_reviewer+"', testimonial='"+req.body.testimonial+"', img_reviewer='"+filename+"' where id_review ="+reviewId;
             let query = connection.query(sql, (err, results) => {
                 file.mv('./public/uploads/'+filename,(err) => {
                     if(err) throw err;
                     res.redirect('/review');
                     })
             })
    })

    // delete review
app.get('/delete-review/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from review where id_review = ${userId}`;
    let img = `SELECT * FROM review WHERE id_review = ${userId}`;
    let queryimage = connection.query(img, (err, rows) =>{
                 image=rows[0].img_reviewer
                 const pathToFile = './public/uploads/'+image

                fs.unlink(pathToFile, function(err) {
                 if (err) {
                  throw err
                 } else {
                  console.log("Successfully deleted the file.")
            
                 }
            })
         }) 
        let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/review');
    })
})
//Server listening
app.listen(3000, () => {
    console.log('Server running at port 3000')
})
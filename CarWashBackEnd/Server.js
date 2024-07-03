import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";
import nodemailer from "nodemailer";
import crypto from "crypto";
import multer from "multer";
import path from 'path';
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
const app = express();
// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'kadikazi', 'public', 'Assets', 'Images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.body.Name}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const allowedTypes = /jpeg|jpg|png|gif/;
const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format




// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gimarach@22",
  database: "carwash",
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

// Use the cors middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
secret: 'secret',
resave: false,
saveUninitialized: false,
cookie:{
  secure: false,
  maxAge: 1000 * 60 * 60 *24
}
}))

// JWT secret key
const secretKey = "jwt-secret-key";

// Start the server
const myPort = 8081;
app.listen(myPort, () => {
  console.log(`Listening on port ${myPort}`);
});

// Verify user middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token not Correct" });
      } else {
        req.EmailAddress = decoded.EmailAddress;
        
        next();
      }
    });
  }
};
app.get('/',verifyUser,(req,res)=>{
  
  if(req.session.userId)
    {
    return res.json({Status: "Success", valid:true, userName: req.session.Name, userId: req.session.userId, EmailAddress: req.session.EmailAddress, userType: req.session.userType, profilePhoto: req.session.profilePhoto }) 
    }else{
      return res.json({valid:false})
    }
      })
      app.get('/home',verifyUser,(req,res)=>{
        const token = req.session.token;
        if(req.session.userId)
          {
          return res.json({Status: "Success", valid:true, userName: req.session.Name, userId: req.session.userId, EmailAddress: req.session.EmailAddress, userType: req.session.userType, profilePhoto: req.session.profilePhoto }) 
          }else{
            return res.json({valid:false})
          }
            })
// Login API
app.post("/login", (req, res) => {
    const { EmailAddress, Password } = req.body;
    const sql = "SELECT * FROM users WHERE EmailAddress=?";
    db.query(sql, [EmailAddress], (err, result) => {
      if (err) {
        console.error("Internal Server Error:", err);
        return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
      }
  
      if (result.length === 0) {
        console.log("Email does not exist");
        return res.status(404).json({ Status: "Error", Message: "Email does not exist" });
      }
  
      const user = result[0];
  
      if (user.isActive === 0) {
        console.log("Please Activate Your Account to Proceed");
        return res.status(403).json({ Status: "Error", Message: "Please Activate Your Account to Proceed" });
      }
  
      bcrypt.compare(Password, user.Password, (err, response) => {
        if (err) {
          console.error("Error comparing Password:", err);
          return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
        }
  
        if (!response) {
          console.log("Incorrect Password");
          return res.status(401).json({ Status: "Error", Message: "Incorrect Password" });
        }
  req.session.Name = result[0].Name;
  req.session.userType = result[0].userType;
  req.session.userId = result[0].userId;
  req.session.EmailAddress = result[0].EmailAddress;
  req.session.profilePhoto = result[0].profilePhoto;
  
  console.log(req.session.Name)
        const users_id = user.userId;
        const email = user.EmailAddress;
        const userType = user.userType; // Get userType from the database
  
        const token = jwt.sign({ EmailAddress: email }, secretKey, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true });
  console.log(token);
  req.session.token = token;
        // Insert login information into logintime table
        let loginTime = new Date();
        loginTime.setHours(loginTime.getHours() + 3);
        loginTime = loginTime.toISOString().slice(0, 19).replace("T", " ");
        const currentDate = new Date().toISOString().slice(0, 10);
        const lastLoginSql = "INSERT INTO logintime (userId, EmailAddress, Time, Date, userType) VALUES (?, ?, ?, ?, ?)";
        db.query(lastLoginSql, [users_id, email, loginTime, currentDate, userType], (err) => {
          if (err) {
            console.error("Error saving last login information:", err);
            return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
          }
  
          console.log("Login successful");
          console.log(req.session.userType);
          // console.log(email)
          return res.status(200).json({ Status: "Success", Message: "Login successful" });
        });
      });
    });
  });
  
  
// Logout API
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// Reset password API
app.post("/reset-password", (req, res) => {
  const { EmailAddress, Password } = req.body;

  if (!EmailAddress || !Password) {
    return res.status(400).json({ Status: "Error", message: "Email and Password are required" });
  }

  // Check if email exists
  const checkEmailQuery = "SELECT * FROM users WHERE EmailAddress = ?";
  db.query(checkEmailQuery, [EmailAddress], (err, results) => {
    if (err) {
      console.error("Error checking email in the database:", err);
      return res.status(500).json({ Status: "Error", message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ Status: "Error", message: "User not found" });
    }

    const saltRounds = 10;
    // Hash the new password
    bcrypt.hash(Password.toString(), saltRounds, (err, hash) => {
      if (err) {
        console.error("Error during hashing Password:", err);
        return res.status(500).json({ Status: "Error", message: "Internal Server Error" });
      }

      // Update user's password in the database
      const updatePasswordQuery = "UPDATE users SET Password = ? WHERE EmailAddress = ?";
      db.query(updatePasswordQuery, [hash, EmailAddress], (error) => {
        if (error) {
          console.error("Error updating password in the database:", error);
          return res.status(500).json({ Status: "Error", message: "Error updating password in the database" });
        }

        res.status(200).json({ Status: "Success", message: "Password reset successfully" });
      });
    });
  });
});

// Activate account API
app.get("/activate/:activationHash", (req, res) => {
    const activationHash = req.params.activationHash;
    const sql = "UPDATE users SET `isActive` = 1, `Activation_Hash` = NULL WHERE `Activation_Hash` = ?";
  
    db.query(sql, [activationHash], (err, result) => {
      if (err) {
        console.error("Error updating the database:", err);
        res.status(500).send("Server error");
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).send("Activation hash not found");
      } else {
        console.log("Account activated successfully");
        res.status(200).send("Account activated successfully");
      }
    });
  });
  app.post('/registerStaff',(req,res)=>{
    const sql = 'INSERT INTO staff (`fName`, `lName`, `Address`, `Telephone`, `Gender`, `Specialty`, `EmailAddress`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      req.body.fName,
      req.body.lName,
      req.body.Address,
      req.body.Telephone,
      req.body.Gender,
      req.body.Specialty,
      req.body.EmailAddress
  ];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error during database insertion:', err);
          return res.status(500).json({ Error: "Internal Server Error" });
      }

      console.log('Registration Successful:', req.body.EmailAddress);
      return res.json({ Status: 'Success' });
  });
});
app.post('/registerAdmin',(req,res)=>{
  const sql = 'INSERT INTO admin (`fName`, `lName`, `Address`, `Telephone`, `Gender`, `EmailAddress`) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [
    req.body.fName,
    req.body.lName,
    req.body.Address,
    req.body.Telephone,
    req.body.Gender,
    req.body.EmailAddress
];

db.query(sql, values, (err,result)=>{
  if (err) {
    console.error('Error during database insertion:', err);
    return res.status(500).json({ Error: "Internal Server Error" });
}

console.log('Registration Successful:', req.body.EmailAddress);
return res.json({ Status: 'Success' });
});
});
app.post('/registerClient', (req, res)=>{
  const sql='INSERT into client(`client_fName`,`client_lName`,`client_gender`,`client_pAddress`,`carRegistrationNo`,`client_telephoneNo`,`client_emailAddress`,`client_sEmailAddress` ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    req.body.fName,
    req.body.lName,
    req.body.Gender,
    req.body.Address,
    req.body.CarRegistrationNo,
    req.body.Telephone,
    req.body.EmailAddress,
    req.body.SemailAddress
];
db.query(sql, values, (err,result)=>{
  if (err) {
    console.error('Error during database insertion:', err);
    return res.status(500).json({ Error: "Internal Server Error" });
}

console.log('Registration Successful:', req.body.EmailAddress);
return res.json({ Status: 'Success' });
});
});
  app.post('/check-adminEmail', (req, res) => {
    const { EmailAddress } = req.body;
    const sql = 'SELECT * FROM admin WHERE EmailAddress = ?';
    
    db.query(sql, [EmailAddress], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ exists: false, Message: 'Internal Server Error' });
        }

        if (result.length > 0) {
            return res.status(200).json({ exists: true, Message: 'Email address already exists' });
        } else {
            return res.status(200).json({ exists: false, Message: 'Email address is available' });
        }
    });
});
  app.post('/check-clientEmail', (req, res) => {
    const { EmailAddress } = req.body;
    const sql = 'SELECT * FROM client WHERE CLIENT_emailAddress = ?';
    
    db.query(sql, [EmailAddress], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ exists: false, Message: 'Internal Server Error' });
        }

        if (result.length > 0) {
            return res.status(200).json({ exists: true, Message: 'Email address already exists' });
        } else {
            return res.status(200).json({ exists: false, Message: 'Email address is available' });
        }
    });
});
//API for first registration process
app.post('/check-staffEmail', verifyUser, (req, res) => {
  const { EmailAddress } = req.body;
  const sql = 'SELECT * FROM staff WHERE EmailAddress = ?';
  
  db.query(sql, [EmailAddress], (err, result) => {
      if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).json({ exists: false, Message: 'Internal Server Error' });
      }

      if (result.length > 0) {
          return res.status(200).json({ exists: true, Message: 'Email address already exists' });
      } else {
          return res.status(200).json({ exists: false, Message: 'Email address is available' });
      }
  });
});

app.post('/check-email', (req, res) => {
    const { EmailAddress } = req.body;
    const sql = 'SELECT * FROM users WHERE EmailAddress = ?';
    
    db.query(sql, [EmailAddress], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ exists: false, Message: 'Internal Server Error' });
        }

        if (result.length > 0) {
            return res.status(200).json({ exists: true, Message: 'Email address already exists' });
        } else {
            return res.status(200).json({ exists: false, Message: 'Email address is available' });
        }
    });
});

// Add your registration endpoint here
app.get("/activate/:activationHash", (req, res) => {
    const activationHash = req.params.activationHash;
    const sql = "UPDATE users SET `isActive` = 1, `Activation_Hash` = NULL WHERE `Activation_Hash` = ?";
  
    db.query(sql, [activationHash], (err, result) => {
        if (err) {
            console.error("Error updating the database:", err);
            return res.status(500).send("Server error");
        }
  
        if (result.affectedRows === 0) {
            return res.status(404).send("Activation hash not found");
        } else {
            console.log("Account activated successfully");
            return res.status(200).send("Account activated successfully");
        }
    });
});
app.put('/updateAdminPassword', (req, res) => {
  const { EmailAddress, NewPassword, CurrentPassword, userId } = req.body;
  
  const sql = "SELECT * FROM users WHERE EmailAddress = ?";
  
  db.query(sql, [EmailAddress], (err, result) => {
    if (err) {
      console.error("Internal Server Error:", err);
      return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
    }

    const user = result[0];

    bcrypt.compare(CurrentPassword, user.Password, (err, response) => {
      if (err) {
        console.error("Error comparing Password:", err);
        return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
      }

      if (!response) {
        console.log("Incorrect Password");
        return res.status(401).json({ Status: "Error", Message: "Incorrect Password" });
      }

      console.log("Password match successful");

      bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
        if (err) {
            console.error('Error during hashing Password:', err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        
        
        const values = [
            
            hash,
           userId,
        ];
const sql2='UPDATE users SET `Password`=? WHERE `userId`=?'
        db.query(sql2, values, (err, result) => {
            if (err) {
                console.error('Error during database insertion:', err);
                return res.status(500).json({ Error: "Internal Server Error" });
            }

           

            console.log('Registration Successful:', req.body.EmailAddress);
            return res.json({ Status: 'Success' });
        });
    });
    });
  });
});

// Registration endpoint
app.post('/fregister', (req, res) => {
    const sql = 'INSERT INTO users (`EmailAddress`, `userType`, `Password`, `Activation_Hash`, `isActive`) VALUES (?, ?, ?, ?, ?)';
    
    const randomString = crypto.randomBytes(16).toString('hex');
    const activationHash = crypto.createHash('sha256').update(randomString).digest('hex').substring(0, 10);
    
    const salt = 10;
    bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
        if (err) {
            console.error('Error during hashing Password:', err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        
        const userType = "client";
        const values = [
            req.body.EmailAddress,
            userType,
            hash,
            activationHash,
            0 // isActive set to false initially
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error during database insertion:', err);
                return res.status(500).json({ Error: "Internal Server Error" });
            }

            // Send activation email
            sendActivationEmail(req.body.EmailAddress, activationHash);

            console.log('Registration Successful:', req.body.EmailAddress);
            return res.json({ Status: 'Success' });
        });
    });
});
app.get('/readStaff/:id', verifyUser, (req,res)=>{
  const sql="SELECT * FROM staff WHERE StaffId=?"
  const id= req.params.id;
  db.query(sql,[id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
app.get('/readUser/:id', (req,res)=>{
  const sql="SELECT * FROM users WHERE userId=?"
  const id= req.params.id;
  db.query(sql,[id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
app.post('/readAdminProfile', (req, res) => {
  const sql = "SELECT * FROM admin WHERE userId=?";
  const id = req.body.userId;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Internal Server Error" });
    return res.json(result);
  });
});

app.post('/readProfile', (req, res) => {
  const sql = "SELECT * FROM users WHERE userId=?";
  const id = req.body.userId;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Internal Server Error" });
    return res.json(result);
  });
});
app.get('/readClient/:id', (req,res)=>{
  const sql="SELECT * FROM client WHERE clientId=?"
  const id= req.params.id
  db.query(sql,[id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
app.get('/readAdmin/:id', (req,res)=>{
  const sql="SELECT * FROM admin WHERE AdminId=?"
  const id= req.params.id;
  db.query(sql,[id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
// app.get('/readAdminProfile', (req,res)=>{
//   const sql="SELECT * FROM admin WHERE userId=?"
//   const id= req.body.userId;
//   db.query(sql,[id], (err,result)=>{
//     if (err)return res.json({Message: "Internal Server Error"});
//     return res.json(result);
    
//   })
// })
app.put('/updateStaff/:id', (req,res)=>{
  const sql="Update staff SET `fName`=?, `lName`=?, `Address`=?, `Telephone`=?, `Gender`=?, `Specialty`=?, `EmailAddress`=? WHERE StaffId=?"
  const id= req.params.id;
  db.query(sql,[req.body.userId, req.body.fName, req.body.lName, req.body.Address, req.body.Telephone, req.body.Gender, req.body.Specialty, req.body.EmailAddress, id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
app.put('/updateAdmin/:id', (req,res)=>{
  const sql="Update admin SET `userId`=?, `fName`=?, `lName`=?, `Address`=?, `Telephone`=?, `Gender`=?, `EmailAddress`=? WHERE AdminId=?"
  const id= req.params.id;
  db.query(sql,[req.body.userId,  req.body.fName,req.body.lName, req.body.Address, req.body.Telephone, req.body.Gender, req.body.EmailAddress, id], (err,result)=>{
    if (err)return res.json({Message: "Internal Server Error"});
    return res.json(result);
    
  })
})
app.put('/updateAdminDetails', (req, res) => {
  const sql = "UPDATE admin SET `fName`=?, `lName`=?, `Address`=?, `telephone`=?, `Gender`=?, `EmailAddress`=? WHERE `AdminId`=?";
  console.log(req.body.AdminId);
  
  const values = [
    req.body.fName,
    req.body.lName,
    req.body.Address,
    req.body.telephone,
    req.body.Gender,
    req.body.EmailAddress,
    req.body.AdminId
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Message: "Internal Server Error" });
    return res.json(result);
  });
});

app.put('/updateClient/:id', (req, res) => {
  const sql = "UPDATE client SET `client_fName`=?, `client_lName`=?, `client_gender`=?, `client_pAddress`=?, `carRegistrationNo`=?, `client_telephoneNo`=?, `client_emailAddress`=?, `client_sEmailAddress`=? WHERE `clientId`=?";
  const id = req.params.id;
  const values = [
    req.body.fName,
    req.body.lName,
    req.body.Gender,
    req.body.Address,
    req.body.CarRegistrationNo,
    req.body.Telephone,
    req.body.EmailAddress,
    req.body.SemailAddress,
    id
  ];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ Message: "Internal Server Error" });
    }
    return res.status(200).json({ Message: "Client updated successfully", Result: result });
  });
});

app.put('/updateUser/:id', upload.single('profilePhoto'), (req, res) => {
  const { Name, EmailAddress, isActive, Password, userType } = req.body;
  const id = req.params.id
  const profilePhotoPath = req.file ? `/assets/images/${req.file.filename}` : null;
  

  const sql = `UPDATE users SET Name = ?, EmailAddress = ?, userType = ?, isActive = ?, Password=?, profilePhoto=? WHERE userId = ?`;
    const activationHash = crypto.randomBytes(16).toString('hex');

  const salt = 10;
 
  

  bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    if (err) {
      console.error('Error during hashing Password:', err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    const values = [Name, EmailAddress, userType, isActive, hash, profilePhotoPath, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ Message: "Internal Server Error", Error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ Message: "User not found" });
    }

    return res.status(200).json({ Message: "User updated successfully", Result: result });
  });
});
});



app.post('/registerUser', upload.single('profilePhoto'), (req, res) => {
  const sql = 'INSERT INTO users (`Name`, `EmailAddress`, `userType`, `Password`, `Activation_Hash`, `isActive`, `profilePhoto`) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  const randomString = crypto.randomBytes(16).toString('hex');
    const activationHash = crypto.createHash('sha256').update(randomString).digest('hex').substring(0, 10);

  const salt = 10;
  bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    if (err) {
      console.error('Error during hashing Password:', err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }

    const profilePhotoPath = req.file ? `/Components/Assets/images/${req.file.filename}` : null;
    
    const values = [
      req.body.Name,
      req.body.EmailAddress,
      req.body.userType,
      hash,
      activationHash,
      1, // isActive set to 1 since it is the admin registering the user
      profilePhotoPath
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error during database insertion:', err);
        return res.status(500).json({ Error: "Internal Server Error" });
      }

      console.log('Registration Successful:', req.body.EmailAddress);
      return res.json({ Status: 'Success' });
    });
  });
});


function sendActivationEmail(email, activationHash) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kadikazi600@gmail.com',
            pass: 'njdd urxk wcjb maih' // Consider using environment variables for sensitive data
        }
    });

    const mailOptions = {
        from: 'kadikazi600@gmail.com',
        to: email,
        subject: 'Account Activation',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Account Activation</title>
            </head>
            <body>
                <h1>Account Activation</h1>
                <p>Please activate your account by clicking the link below:</p>
                <a href="http://localhost:8081/activate/${activationHash}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                    Activate
                </a>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending activation email:', err);
        } else {
            console.log('Activation email sent:', info.response);
        }
    });
} 


// Login API for demonstration purposes

     

// LockScreen API to compare password
app.post("/lockscreen", (req, res) => {
  const { EmailAddress, Password } = req.body;
  
  const sql = "SELECT * FROM users WHERE EmailAddress = ?";
  
  db.query(sql, [EmailAddress], (err, result) => {
    if (err) {
      console.error("Internal Server Error:", err);
      return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
    }

    if (result.length === 0) {
      console.log("Email does not exist");
      return res.status(404).json({ Status: "Error", Message: "Email does not exist" });
    }

    const user = result[0];

    if (user.isActive === 0) {
      console.log("Please Activate Your Account to Proceed");
      return res.status(403).json({ Status: "Error", Message: "Please Activate Your Account to Proceed" });
    }

    bcrypt.compare(Password, user.Password, (err, response) => {
      if (err) {
        console.error("Error comparing Password:", err);
        return res.status(500).json({ Status: "Error", Message: "Internal Server Error" });
      }

      if (!response) {
        console.log("Incorrect Password");
        return res.status(401).json({ Status: "Error", Message: "Incorrect Password" });
      }

      console.log("Password match successful");
      return res.status(200).json({ Status: "Success", Message: "Password match successful" });
    });
  });
});
app.post('/send-reset-link', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ Status: 'Error', Message: 'Email is required' });
  }

  const randomString = crypto.randomBytes(16).toString('hex');
  const resetHash = crypto.createHash('sha256').update(randomString).digest('hex').substring(0, 10);
  
  // Store resetHash in the database with the user's email

  sendResetEmail(email)
    .then(() => res.json({ Status: 'Success', Message: 'Reset link sent' }))
    .catch(err => {
      console.error('Error sending reset email:', err);
      res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    });
});

function sendResetEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kadikazi600@gmail.com',
      pass: 'njdd urxk wcjb maih' // Use environment variables for sensitive data
    }
  });

  const mailOptions = {
        from: 'kadikazi600@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Reset Password</title>
            </head>
            <body>
                <h1>Password Reset</h1>
                <p>Please Reset your account Password by clicking the button below:</p>
                <a href="http://localhost:3000/reset-password" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                    Reset
                </a>
            </body>
            </html>
        `
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending activation email:', err);
        } else {
            console.log('Reset password email sent:', info.response);
        }
    });
  } 

app.get('/getUser/:id', (req, res) => {
  const userId = req.query.id;
  pool.query('SELECT * FROM users WHERE userId = ?', [userId], (error, results) => {
    if (error) {
      res.status(500).json({ Status: 'Error', Error: 'Database query failed' });
    } else {
      res.json({ Status: 'Success', user: results[0] });
    }
  });
});
app.get('/getAllUsers', (req, res) =>{
  const sql = `SELECT * FROM users`;
  
  db.query(sql,(err, result) =>{
      if(err) return res.json({Message:"Error connecting to the database"});
      return res.json(result);
  })
})
app.get('/getAllStaff', (req, res) =>{
  const sql = `SELECT * FROM staff`;
  
  db.query(sql,(err, result) =>{
      if(err) return res.json({Message:"Error connecting to the database"});
      return res.json(result);
  })
})
app.get('/getAllClients', (req, res) =>{
  const sql = `SELECT * FROM client`;
  
  db.query(sql,(err, result) =>{
      if(err) return res.json({Message:"Error connecting to the database"});
      return res.json(result);
  })
})
app.get('/getAllAdmins', (req, res) =>{
  const sql = `SELECT * FROM admin`;
  
  db.query(sql,(err, result) =>{
      if(err) return res.json({Message:"Error connecting to the database"});
      return res.json(result);
  })
})

app.put('/updateProfile', upload.single('profilePhoto'), (req, res) => {
  const { Name, EmailAddress, userId } = req.body;
  const profilePhotoPath = req.file ? `./Assets/Images/${req.file.filename}` : null;
console.log(Name);
  // Check if all required fields are present
  if (!Name || !EmailAddress || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Use a parameterized query to prevent SQL injection
  const sql = 'UPDATE users SET Name = ?, EmailAddress = ?, profilePhoto = ? WHERE userId = ?';
  db.query(sql, [Name, EmailAddress, profilePhotoPath, userId], (err, results) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ status: 'Success' });
    
  });
});
app.put('/updateAdminProfile', upload.single('profilePhoto'), (req, res) => {
  const { Name, EmailAddress, userId } = req.body;
  const profilePhotoPath = req.file ? `./Assets/Images/${req.file.filename}` : null;
console.log(Name);
  // Check if all required fields are present
  if (!Name || !EmailAddress || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Use a parameterized query to prevent SQL injection
  const sql = 'UPDATE users SET Name = ?, EmailAddress = ?, profilePhoto = ? WHERE userId = ?';
  db.query(sql, [Name, EmailAddress, profilePhotoPath, userId], (err, results) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ status: 'Success' });
    
  });
});

app.delete('/deleteAdmin/:id', (req, res) => {
  
  db.query("DELETE FROM admin WHERE AdminId ='"+req.params.id+"'",(err, result)=>{
    if(!err)
      {
      res.status(200).json({success:'user record deleted successfully'});
    } else{
console.log(err);
    };
  });
 
});
app.get('/totalUsers', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalUsers FROM users"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalUsers = result[0].totalUsers; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalUsers });
  });
});
app.get('/totalAdmins', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalAdmins FROM admin"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalAdmins = result[0].totalAdmins; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalAdmins });
  });
});
app.get('/totalClients', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalClients FROM client"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalClients = result[0].totalClients; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalClients });
  });
});
app.get('/totalStaff', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalStaff FROM staff"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalStaff = result[0].totalStaff; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalStaff });
  });
});
app.get('/totalActiveUsers', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalActiveUsers FROM users where isActive = 1"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalActiveUsers = result[0].totalActiveUsers; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalActiveUsers });
  });
});
app.get('/totalInactiveUsers', (req, res) => {
  const sql = "SELECT COUNT(*) AS totalInactiveUsers FROM users where isActive = 0"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const totalInactiveUsers = result[0].totalInactiveUsers; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ totalInactiveUsers });
  });
});
app.get('/newBookings', (req, res) => {
  const sql = "SELECT COUNT(BookingId) AS newBookings FROM booking where Status = 'Pending'"; // Assuming 'users' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Internal Server Error' });
    }
    const newBookings = result[0].newBookings; // Assuming the query returns a single row with 'totalUsers' column
    return res.json({ newBookings });
  });
});

app.get('/totalPayments', (req, res) => {
  const sql = "SELECT SUM(Amount) AS totalAmount FROM payment"; // Assuming 'payment' is your table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    const totalAmount = result[0]?.totalAmount || 0; // Handling the case when the result is empty
    return res.status(200).json({ totalAmount });
  });
});    // Assuming 'users' is your table name
  app.get('/totalCars', (req, res) => {
 
    const sql = "SELECT COUNT(carId) AS totalCars FROM car "; // Assuming 'users' is your table name
    db.query(sql, (err, result) => {
      if (err) {
        return res.json({ message: 'Internal Server Error' });
      }
      const totalCars = result[0].totalCars; // Assuming the query returns a single row with 'totalUsers' column
      return res.json({ totalCars });
    });
  });;
  app.get('/totalWashes', (req, res) => {
 
    const sql = "SELECT COUNT(WashId) AS totalWashes FROM washes "; // Assuming 'users' is your table name
    db.query(sql, (err, result) => {
      if (err) {
        return res.json({ message: 'Internal Server Error' });
      }
      const totalWashes = result[0].totalWashes; // Assuming the query returns a single row with 'totalUsers' column
      return res.json({ totalWashes });
    });
  });;



   
    
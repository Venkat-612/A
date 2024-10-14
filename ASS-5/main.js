
const http = require('http');
const fs = require("fs");
const path = require("path");
const PORT = 5487;

const app = http.createServer((req,res)=>{

    if(req.url === '/' && req.method === "GET"){
        const myPath = path.join(__dirname,"main1.html")
        console.log(myPath);

        fs.readFile(myPath,'utf8',(err,data)=>{
            if(!err){
                res.end(data);
            }
        })
    }

    else if(req.url === '/login' && req.method === "GET"){
        const myPath = path.join(__dirname,"login.html")
        console.log(myPath);

        fs.readFile(myPath,'utf8',(err,data)=>{
            if(!err){
                res.end(data);
            }
        })
    }

    else if(req.url === '/register' && req.method === "GET"){
        const myPath = path.join(__dirname,"register.html")
        console.log(myPath);

        fs.readFile(myPath,'utf8',(err,data)=>{
            if(!err){
                res.end(data);
            }
        })
    }

    else if (req.url === '/register' && req.method === "POST") {
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const registrationData = {
                name: formData.get('fullname'),
                email: formData.get('email'),
                password: formData.get('password'), // Ensure to handle passwords securely!
            };
    
            const jsonFilePath = path.join(__dirname, '/registrations.json');
            fs.readFile(jsonFilePath, 'utf8', (err, data) => {
                let registrations = [];
                if (!err && data) {
                    registrations = JSON.parse(data);
                }
    
                const email = formData.get('email');
                const emailExist = registrations.find(registration => registration.email === email);
    
                if (emailExist) {
                    const page = path.join(__dirname, '/alreadyRegistered.html');
                    fs.readFile(page, 'utf8', (err, data) => {
                        if (!err) {
                            res.end(data);
                        }
                    });
                } 
                else {
                    registrations.push(registrationData);
    
                    fs.writeFile(jsonFilePath, JSON.stringify(registrations, null, 2), (err) => {
                        if(!err)
                        {
                            const page = path.join(__dirname, '/login.html');
                            fs.readFile(page, 'utf8', (err, data) => {
                                if (!err) {
                                    res.end(data);
                                }
                            });
                        }
                    });
                }
            });
        });
    }





  
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}...`);
});

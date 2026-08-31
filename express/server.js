const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({extended: false}));

app.use(express.json())


//for serving static files - css, images and all or anything in the public folder
app.use(express.static(path.join(__dirname, '/public')))

app.get(['/', '/index{.html}'], (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get(['/about', '/about{.html}'], (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

app.get(['/contact', '/contact{.html}'], (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'))
})

app.get(['/old-page', '/old-page{.html}'], (req, res) => {
    res.redirect(301, '/index.html')
})

app.get('/*catchall', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");

const Artigo = mongoose.model("artigo");
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/celke',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Conexão com o MongoDB realizada com sucesso");
}).catch((erro)=>{
    console.log("Erro: Conexão com MongoDB não realizada.")
});

app.get("/", (req, res)=>{
    return res.json({titulo:"Como criar API"});
});

app.get("/artigo", (req, res)=>{
    Artigo.find({}).then((artigo)=>{
        return res.json(artigo);
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:"Nenhum artigo encontrado!"
        })

    });
});

app.get("/artigo/:id", (req, res)=>{
    console.log(req.params.id);
    Artigo.findOne({_id:req.params.id}).then((artigo)=>{
        return res.json(artigo);
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:"Artigo não encontrado!"
        })

    });
});


app.post("/artigo",(req,res)=>{
    const artigo = Artigo.create(req.body, (err)=>{

    if(err) 
        return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        })
    return res.status(200).json({
        error: false,
        message: "Artigo foi cadastrado com sucesso!"
    })
   }); 

});

app.listen(8080,()=>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
} )
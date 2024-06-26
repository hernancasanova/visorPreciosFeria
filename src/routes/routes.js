const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
import req from 'express/lib/request';
import res, { type } from 'express/lib/response';
import app from '../../main';//?
const express=require('express')
const Prices2020Schema = require('../models/2020') 
const Prices2021Schema = require('../models/2021') 
const Prices2022Schema = require('../models/2022') 
const Prices2023Schema = require('../models/2023') 
const router=express.Router()
const axios= require ('axios')
const XLSX = require("xlsx")
const multer = require('multer')


const storage = multer.memoryStorage()
const upload = multer({storage, limits: {
    fieldNameSize: 255,
    fileSize: 500000,
    files: 1,
    //fields: 1
  }})
//dest: 'uploads/' 

var url;
const urlAntigua = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false';
//const urlAñoActual = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6u9XsgS-4enVYHmgDMr-81vPRAk0uGbALOQoYS5WssXo_61Y8tUewgxnLgjmG87wwKpT9iAFV-7aL/pubhtml?widget=false&headers=false';
//https://docs.google.com/spreadsheets/d/e/2PACX-1vTSo-1KPD56-n3r2gIuoGZM4QE03cWYygWPM7MJg6u3gq4YObW5P30AUWhyRk_b9JC4kmi8dL8km3N8/pubhtml?widget=true&headers=false
//url 2024
const urlAñoActual='https://docs.google.com/spreadsheets/d/e/2PACX-1vRUsoWLd4Zf5SujuyD8Gi9BFhSYzDlX94o5L_GexvhXrGwakGHUWItzdPqIlrAdMGCOISDCPNchhqdX/pubhtml?widget=false&headers=false';
const urlAñoActualOsorno='https://docs.google.com/spreadsheets/d/e/2PACX-1vR1bQGPP723u3NzMw7ohonbPod9W47IQHEN3EB1kMu3hlOVQmrTUBHXgCqteynWtbb63be36U4-wo4B/pubhtml?widget=false&headers=false';

const getPrices = async (bovine, year, stablishment) => {
    var arrPreciosSubastas = [], arrDates=[], types=[];
    //app.listen(4000)
    if(year==2024){
        //const data;
        if(stablishment==="osorno"){
            const {data} = await axios.get(urlAñoActualOsorno);
            var $ = cheerio.load(data);
        }else{
            const { data } = await axios.get(urlAñoActual);
            var $ = cheerio.load(data);
        }
        const ids=[];
        $('#sheet-menu li a').each((i,e)=>{
            arrDates.push($(e).text())
        })
        $('#sheets-viewport').children().each((i,e) => {
            ids.push($(e).attr('id'));
            // $('#'+$(e).attr('id')+' td').each((j,el) => {
            //     if($(el).parent().text().indexOf(bovine)!=-1 && $(el).attr('class')=='s9' && j%2==0){
            //         arrPreciosSubastas.push($(el).text());
            //     }
            // });
            $('#'+$(e).attr('id')+' tr').each((j,el) => {
                // if($(el).parent().text().indexOf(bovine)!=-1 && $(el).attr('class')=='s9' && j%2==0){
                //     arrPreciosSubastas.push($(el).text());
                // }
                if($(el).children().first().text()==bovine){
                    stablishment!="osorno"?arrPreciosSubastas.push($(el).children('.s9').first().text()):arrPreciosSubastas.push($(el).children('.s10').first().text())
                }
            });
        });
        //return {types, arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()};
    }else{
        var prices;
        //const MyModel = mongoose.model('2021');
        if(year == 2023){
            prices = await Prices2023Schema.find({type: bovine}).sort({"_id": "desc"});
        }else if(year == 2022){
            prices = await Prices2022Schema.find({type: bovine}).sort({"_id": "desc"});
        }else if(year == 2021){
            prices = await Prices2021Schema.find({type: bovine}).sort({"_id": "desc"});
        }else if(year == 2020){
            prices = await Prices2020Schema.find({type: bovine}).sort({"_id": "desc"});
        }
        prices.forEach(p=>{
            arrPreciosSubastas.push(p.price);
            arrDates.push(p.date);
        })
        //return {types, arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()}
    }
    if(year==2020 || year==2021 || year == 2022 || year == 2023){
        return {arrPreciosSubastas,arrDates};
    }else{
        return {arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()};
    }
}


async function blob_to_wb(blob) {
    return XLSX.read(await blob.arrayBuffer());
}

const saveData = y => {
    var workbook, workbookSheets, precio, sheet, dataExcel;
    if(y==2023){
        workbook = XLSX.readFile("./src/routes/PP2023.xlsx");
    }else if(y==2022){
        workbook = XLSX.readFile("./src/routes/PP2022.xlsx");
    }else if(y==2021){
        workbook = XLSX.readFile("./src/routes/PP2021.xlsx");
    }else{
        workbook = XLSX.readFile("./src/routes/PP2020.xlsx");
    }
    workbookSheets = workbook.SheetNames;
    for(var i = 0; i<workbookSheets.length; i++){
        sheet = workbookSheets[i];
        dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        dataExcel.forEach(async (e,m) => {
            if(m>4){
                if(y==2023){
                    precio = new Prices2023Schema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                }else if(y==2022){
                    precio = new Prices2022Schema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                }else if(y==2021){
                    precio = new Prices2021Schema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                }else{
                    precio = new Prices2020Schema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                } 
                await precio.save();  
            }  
        });
    }
}

const insertData = async () => {
    try {
        var testLoadData2023=await Prices2023Schema.find({})
        var testLoadData2022=await Prices2022Schema.find({})
        var testLoadData2021=await Prices2021Schema.find({})
        var testLoadData2020=await Prices2020Schema.find({})
        if(testLoadData2023.length==0){
            console.log("Se cargarán datos del 2023")
            saveData(2023)
        }
        if(testLoadData2022.length==0){
            console.log("Se cargarán datos del 2022")
            saveData(2022)
        }
        if(testLoadData2021.length==0){
            console.log("Se cargarán datos del 2021")
            saveData(2021)
        }
        if(testLoadData2020.length==0){
            console.log("Se cargarán datos del 2020")
            saveData(2020)
        }
        /*var years=[2021,2020];
        for(var y in years){
            if(years[y]==2021){
                //const data = await (await fetch(url)).arrayBuffer();
                //workbook = XLSX.read(file);
                //console.log("cargando 2021")
                workbook = XLSX.readFile("./src/routes/PP2021.xlsx");
            }else{
                workbook = XLSX.readFile("./src/routes/PP2020.xlsx");
            }
            //workbook = await blob_to_wb(file);
            //workbook = XLSX.read(file.buffer, {type:'buffer'});
            var workbookSheets = workbook.SheetNames;
            for(var i = 0; i<workbookSheets.length; i++){
                var sheet = workbookSheets[i];
                var dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                var precio;
                dataExcel.forEach((e,m) => {
                    if(m>4){
                        if(years[y]==2021){
                            precio = new Prices2021Schema(
                                //{type: e['FERIA GANADEROS OSORNO S.A. (RECINTO DE PAILLACO)'],date: sheet, price: e['__EMPTY_7']}
                                {type: m+3,date: sheet, price: e['__EMPTY_7']}
                            )
                        }else{
                            precio = new Prices2020Schema(
                                //{type: e['FERIA GANADEROS OSORNO S.A. (RECINTO DE PAILLACO)'],date: sheet, price: e['__EMPTY_7']}
                                {type: m+3,date: sheet, price: e['__EMPTY_7']}
                            )
                        }
                        precio.save()  
                    }  
                });
            }
        }*/
        return "200";    
    } catch (error) {
        return "500";    
    }
    
} 

const getTypes = async (year,stablishment) => {
    var url;
    if(year==2024 && stablishment!="osorno"){
        url=urlAñoActual;
    }else if(stablishment=="osorno"){
        url=urlAñoActualOsorno;
    }else{
        url=urlAntigua;
    }
    //url=(year==2024)?urlAñoActual:urlAntigua;//verificar
    console.log("URL: ",url)
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);
    var types = [];
    let divModel =$('#sheets-viewport').children().first().attr('id');
    var names=[], keys=[];
    $("#"+divModel+" th div").each((i,el) => {
        if(i>6) keys.push($(el).text())
    });
    $("#"+divModel+" td.s7").each((j,el) => {
        types.push({name: $(el).text(), key: keys[j]})
    });
    return {types}
}

router.get('/types/:year/:stablishment', async (req, res) =>{
    const {year,stablishment} = req.params;
    let {types}= await getTypes(year, stablishment);
    //console.log(types)
    res.json({types})
});

//router.post('/importdata/:year',upload.single('excel'), async (req, res, next) =>{
router.get('/importdata', async (req, res, next) =>{
    try{
        //const {year} = req.params
        // var file=req.file;
        //const resp= await insertData(null,year)//pass a file
        const resp= await insertData()//pass a file
        res.json({resp})
    }catch(e){
        res.json({resp:'500'})
    }
});

router.get('/prices/:bovine/:year/:stablishment', async (req,res)=>{

    let { bovine, year, stablishment }= req.params;
    // if(!bovine){
    //     console.log("bovine antes: ",bovine)
    //     bovine='TERNEROS'
    // }

    let { arrPreciosSubastas, arrDates, types}= await getPrices(bovine, year, stablishment);
    res.json({arrPreciosSubastas, arrDates, types})

    //let {types}= await getTypes();
    // if(year==2022){
    //     let { arrPreciosSubastas, arrDates}= await getPrices(bovine, year);
    //     res.json({arrPreciosSubastas, arrDates})
    // }else{
    //     let { test}= await getPricesType(bovine, year);
    //     res.json({test})
    // }
    
    //console.log(prices)
    //res.json({arrPreciosSubastas, arrDates})
    //res.send(JSON.parse(prices));
    //res.send(JSON.parse("{prices:"+prices+"}"));
})

module.exports = router;
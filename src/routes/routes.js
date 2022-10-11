const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
import req from 'express/lib/request';
import res, { type } from 'express/lib/response';
import app from '../../main';//?
const express=require('express')
const PriceSchema = require('../models/prices') 
const Prices2020Schema = require('../models/2020') 
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

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false';

const getPrices = async (bovine, year=2022) => {
    var arrPreciosSubastas = [], arrDates=[], types=[];
    //app.listen(4000)
    if(year==2022){
        const { data } = await axios.get(url);
        var $ = cheerio.load(data);
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
                    arrPreciosSubastas.push($(el).children('.s9').first().text())
                }
            });
        });
        //return {types, arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()};
    }else{
        var prices;
        //const MyModel = mongoose.model('2021');
        if(year == 2021){
            prices = await PriceSchema.find({type: bovine});
        }else if(year == 2020){
            prices = await Prices2020Schema.find({type: bovine});
        }
        prices.forEach(p=>{
            arrPreciosSubastas.push(p.price);
            arrDates.push(p.date);
        })
        //return {types, arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()}
    }
    return {arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()};
}


async function blob_to_wb(blob) {
    return XLSX.read(await blob.arrayBuffer());
}

const saveData = y => {
    var workbook, workbookSheets, precio;
    if(y==2021){
        workbook = XLSX.readFile("./src/routes/PP2021.xlsx");
    }else{
        workbook = XLSX.readFile("./src/routes/PP2020.xlsx");
    }
    workbookSheets = workbook.SheetNames;
    for(var i = 0; i<workbookSheets.length; i++){
        var sheet = workbookSheets[i];
        var dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        dataExcel.forEach((e,m) => {
            if(m>4){
                if(y==2021){
                    precio = new PriceSchema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                }else{
                    precio = new Prices2020Schema(
                        {type: m+3,date: sheet, price: e['__EMPTY_7']}
                    )
                }
                precio.save()  
            }  
        });
    }
}

const insertData = async () => {
    try {
        var testLoadData2021=await PriceSchema.find({})
        var testLoadData2020=await Prices2020Schema.find({})
        if(testLoadData2021.length==0){
            console.log("Se cargaran datos del 2021")
            saveData(2021)
        }else if(testLoadData2020.length==0){
            console.log("Se cargaran datos del 2020")
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
                            precio = new PriceSchema(
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

const getTypes = async () => {
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

router.get('/types', async (req, res) =>{
    let {types}= await getTypes();
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

router.get('/prices/:bovine/:year', async (req,res)=>{

    let { bovine, year }= req.params;
    // if(!bovine){
    //     console.log("bovine antes: ",bovine)
    //     bovine='TERNEROS'
    // }

    let { arrPreciosSubastas, arrDates, types}= await getPrices(bovine, year);
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
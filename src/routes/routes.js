const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
import app from '../../main';//?
const express=require('express')
const router=express.Router()
const axios= require ('axios')

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false';

const getPrices = async (bovine) => {
    //app.listen(4000)
    let arrPreciosSubastas = [];let arrDates=[];
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);
    const ids=[];
    getTypes();
    let types = [];
    $('#sheet-menu li a').each((i,e)=>{
        arrDates.push($(e).text())
    })
    $('#sheets-viewport').children().each((i,e) => {
        ids.push($(e).attr('id'));
        $('#'+$(e).attr('id')+' td').each((j,el) => {
            if($(el).parent().text().indexOf(bovine)!=-1 && $(el).attr('class')=='s9' && j%2==0){
                arrPreciosSubastas.push($(el).text());
            }else if($(el).attr('class')=='s7'){
                types.push($(el).text())
            }
        });
    });
    return {types, arrPreciosSubastas: arrPreciosSubastas.reverse(),arrDates:arrDates.reverse()};
}

const getTypes = async () => {
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);
    var types = [];
    let divModel =$('#sheets-viewport').children().first().attr('id');
    $("#"+divModel+" td.s7").each((j,el) => {
        console.log($(el).text())
        types.push($(el).text())
    });
    return {types}
    //let a =$('#sheets-viewport').children().each((i,e) => {
        // ids.push($(e).attr('id'));
        // $('#'+$(e).attr('id')+' td').each((j,el) => {

        //     // if($(el).parent().text().indexOf(bovine)!=-1 && $(el).attr('class')=='s9' && j%2==0){
        //     //     arrPreciosSubastas.push($(el).text());
        //     // }
        // });
    //});
    //return {}
    //console.log("a: ",a)
}

router.get('/prices/:bovine', async (req,res)=>{
    let { bovine }= req.params;
    // if(!bovine){
    //     console.log("bovine antes: ",bovine)
    //     bovine='TERNEROS'
    // }
    let {types}= await getTypes();
    let { arrPreciosSubastas, arrDates}= await getPrices(bovine);
    //console.log(prices)
    res.json({types, arrPreciosSubastas, arrDates})
    //res.send(JSON.parse(prices));
    //res.send(JSON.parse("{prices:"+prices+"}"));
})

module.exports = router;
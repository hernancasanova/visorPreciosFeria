const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
import app from '../../main';//?
const express=require('express')
const router=express.Router()
const axios= require ('axios')


const getPrices = async (callback=()=>{}) => {
    //app.listen(4000)
    let arrPreciosSubastas = [];let arrDates=[];
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false';
    //let a= request(url,(err,res,body)=>{
    // request('https://fegosa-wixsite-com.filesusr.com/html/c674bc_21ffe6c8206a519d13371de7c7ba93e9.html',(err,res,body)=>{
    // //request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml/sheet?headers=false&gid=1662410034',(err,res,body)=>{
        const { data } = await axios.get(url);
        let $ = cheerio.load(data);
        const ids=[];
        // $('#sheet-menu li a').each((i,e)=>{
        //     arrDates.push($(e).text())
        // })
        $('#sheets-viewport').children().each((i,e) => {
            ids.push($(e).attr('id'));
            $('#'+$(e).attr('id')+' td').each((j,el) => {
                if($(el).parent().text().indexOf('TERNEROS')!=-1 && $(el).attr('class')=='s9' && j%2==0){
                    arrPreciosSubastas.push($(el).text());
                }
            });
        });
        // for(let p of arrPreciosSubastas){
            
        // }
        //return JSON.parse(arrPreciosSubastas);
        //return arrPreciosSubastas;
        //res=arrPreciosSubastas;
        return arrPreciosSubastas;
        //return {arrPreciosSubastas,arrDates};
        //let aa = await returnPrices(arrPreciosSubastas);
        //callback(arrPreciosSubastas);
        //return;
        //return callback(arrPreciosSubastas);
    //});
    //return a;
    // .on('data', function(data) {
    //     // decompressed data as it is received
    // }); 
}

router.get('/prices/', async (req,res)=>{
    let prices = await getPrices();
    //let { arrPreciosSubastas, arrDates}= await getPrices();
    //console.log(prices)
    res.json({prices})
    //res.send(JSON.parse(prices));
    //res.send(JSON.parse("{prices:"+prices+"}"));
})

module.exports = router;
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');

let arrPreciosSubastas = [];
//esta url de abajo incluye los botones con las fechas
//let ids=[];
request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false',(err,res,body)=>{
// request('https://fegosa-wixsite-com.filesusr.com/html/c674bc_21ffe6c8206a519d13371de7c7ba93e9.html',(err,res,body)=>{
// //request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml/sheet?headers=false&gid=1662410034',(err,res,body)=>{
    let $ = cheerio.load(body);
    //let preciosSubastas= $('.switcherOuter')
    //let preciosSubastas=$('.widget-viewport')
    const ids=[];
    $('#sheets-viewport').children().each((i,e) => {
        //console.log($(e).attr('id'))
        ids.push($(e).attr('id'));
        $('#'+$(e).attr('id')+' td').each((j,el) => {
            if($(el).parent().text().indexOf('TERNEROS')!=-1 && $(el).attr('class')=='s9' && j%2==0){
                arrPreciosSubastas.push(el);
            }
        });
    });
    //console.log(arrPreciosSubastas)
    for(let p of arrPreciosSubastas){
        console.log($(p).text())
    }
    /*const precios=$(' td').each((i,e) => {
        //console.log($(e).children().text())
        if($(e).parent().text().indexOf('TERNEROS')!=-1 && $(e).attr('class')=='s9' && i%2==0){
            // if($(e).attr('class')){

            // }
            //console.log(i,$(e).text())
            //console.log($(e).children().text())
            arrPrecios.push(e);
        }
        //return arrPrecios;
        //let a=$(this).html();
        // if($(e).children().html()=='TERNEROS'){
        //     console.log(i)
        // }
        //console.log(i,$(el).html(), $(el).attr('class'))
    });*/
    //console.log(ids)
    //return ids;
    //console.log($('#sheets-viewport').children())  
    //console.log(preciosSubastas.length)
    //console.log(preciosSubastas.text())
});
// console.log(typeof(sheets))
// console.log(sheets.);

// for(let sheet in sheets){
//     console.log(sheet.text())
// }

//console.log($('#sheets-viewport').children())  


//promedio de 5 mejores precios de terneros 
let arrPrecios = []; 
/*request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml?widget=false&headers=false',(err,res,body)=>{
//request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml/sheet?headers=false&gid=1662410034',(err,res,body)=>{
//request('https://fegosa-wixsite-com.filesusr.com/html/c674bc_21ffe6c8206a519d13371de7c7ba93e9.html',(err,res,body)=>{
    if(!err && res.statusCode == 200){
        let $ = cheerio.load(body);
        //console.log("bien")
        // $('td.s8','#sheets-viewport').each(function(){
        //     let a=$(this).html();
        //     console.log("a: ",a)
        // });

        const precios=$('tbody td').each((i,e) => {
            //console.log($(e).children().text())
            if($(e).parent().text().indexOf('TERNEROS')!=-1 && $(e).attr('class')=='s9' && i%2==0){
                // if($(e).attr('class')){

                // }
                //console.log(i,$(e).text())
                //console.log($(e).children().text())
                arrPrecios.push(e);
            }
            //return arrPrecios;
            //let a=$(this).html();
            // if($(e).children().html()=='TERNEROS'){
            //     console.log(i)
            // }
            //console.log(i,$(el).html(), $(el).attr('class'))
        });
        //console.log(arrPrecios)
        //console.log($(arrPrecios).children().html())
        //const a= $('.waffle no-grid');
        //const a =  $('td.s8','#sheets-viewport');
        //const datos =  $('tbody td.s8');
        for(let precio of arrPrecios){
            //console.log($(precio).text()) 
            //console.log($(precio).children().text())
            // if($(precio).attr('class')=='s9'){
            //     console.log($(precio))
            // }
        }
        //console.log(datos.html())
        // $('td .s8').each(function(){
        //     console.log("pase")
        //     let a=$(this).attr('class');
        //     console.log("a: ",a)
        // });
    }
});*/

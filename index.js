const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');

request('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml/sheet?headers=false&gid=1662410034',(err,res,body)=>{
//request('https://fegosa-wixsite-com.filesusr.com/html/c674bc_21ffe6c8206a519d13371de7c7ba93e9.html',(err,res,body)=>{
    if(!err && res.statusCode == 200){
        let $ = cheerio.load(body);
        //console.log("bien")
        // $('td.s8','#sheets-viewport').each(function(){
        //     let a=$(this).html();
        //     console.log("a: ",a)
        // });
        let arrPrecios = []; 
        const precios=$('tbody td').each((i,e) => {
            //console.log($(e).children().text())
            if($(e).parent().text().indexOf('TERNEROS')!=-1 && $(e).attr('class')=='s9'){
                // if($(e).attr('class')){

                // }
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
            console.log($(precio).text()) 
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
});

// const getAnimeVideo = async (id: string, chapter: number) => {
//     const BASE_URL = `${url}${id}/${chapter}/`  // => https://jkanime.net/tokyo-ghoul/1/
//     const browser = await puppeteer.launch() 
//     const page = await browser.newPage()
//     await page.goto(BASE_URL);
//     const elementHandle = await page.$('.player_conte')
//     const frame = await elementHandle.contentFrame();
//     const video = await frame.$eval('#jkvideo_html5_api', el =>
//     Array.from(el.getElementsByTagName('source')).map(e => e.getAttribute("src")));
//     return video;
//    }

 /*(async () =>{
    const browser = await puppeteer.launch();
    const page= await browser.newPage();
    //await page.goto('https://fegosa.wixsite.com/misitio/paillaco', {timeout: 0});
    await page.goto('https://docs.google.com/spreadsheets/d/e/2PACX-1vQI2YwwXBUN8ZYrgxDVsblBKOtVMfH_GMmu05jPXIW7Rw9XPBXdg4iFnHPe1KeRrJ6EU_-PxrMiNxUG/pubhtml/sheet?headers=false&gid=1662410034', {timeout: 0});
    //await frame.goto('https://fegosa-wixsite-com.filesusr.com/html/c674bc_21ffe6c8206a519d13371de7c7ba93e9.html', {timeout: 0});

    const precios = await page.evaluate(()=>{
        const elementos=document.querySelectorAll('tbody td.s8');
        console.log(elementos)
        const values=[];
        for(let val in elementos){
            values.push(val)
        }
        return values;
    }); 
    console.log(precios)
    // for(let precio in precios){
    //     console.log(precio.val())
    // }

    //console.log(page.$eval())

    let preciosFrame // this will be populated later by our identified frame

    //console.log(page.mainFrame().content())

    for (const frame of page.mainFrame().childFrames()){
        // Here you can use few identifying methods like url(),name(),title()
        //console.log(frame.url())
        if (frame.url().includes('fegosa')){
            //console.log("bien: ",frame.childFrames())
            // console.log('we found the Twitter iframe')
            // preciosFrame = frame 
            // we assign this frame to myFrame to use it later
             for(const nestedFrame of frame.childFrames()){
               console.log(nestedFrame.url())
                const preciosList = await nestedFrame.$('#sheets-viewport')
                if(preciosList){
                    //console.log('We found the frame with tweet list')
                    console.log(preciosList)
                    //twitterFrame = nestedFrame
                }
            }

            //test
            //console.log(frame.url())
            // const pageSource= await browser.newPage();
            // await pageSource.goto(frame.url(), {timeout: 0});
            // const datos= await pageSource.select('body')
            // const preciosList = await pageSource.evaluate(()=>{
            //     const datos = document.querySelectorAll('iframe[data-src]');
            //     //const datos= await pageSource.$('td')
            //     const elements = []
            //     for(let e of datos){
            //         elements.push(e)
            //     }
            //     return elements;
            // })
            //console.log(datos)
            // if(preciosList){
            //     //console.log('We found the frame with tweet list')
            //     console.log(preciosList)
            //     //twitterFrame = nestedFrame
            // }
            
        }
    }

    //const frame = page.frames().find(frame => frame.url().includes('fegosa'));
    //const divTd = await frame.$$eval('body table', td => td.length);
    //const  total= await frame.$$('div')
    //console.log(total.length)
    //const text = await frame.$eval('.waffle no-grid', element => element.textContent);
    //console.log(text);
    //console.log(precios.length)


    // const preciosList = await frame.evaluate(()=>{
    //     const datos = document.querySelectorAll('td');
    //     //const datos= await pageSource.$('td')
    //     const elements = []
    //     for(let e of datos){
    //         elements.push(e)
    //     }
    //     return elements;
    // })
    //var a = await getPageContent(frame.url());
    //console.log(a)
    await browser.close();
})();*/
import React, {useEffect, useState, useContext} from 'react'
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { Spinner } from 'reactstrap';
import PricesContext from "../context/prices/PricesContext";

Exporting(Highcharts);

//var Highcharts = require('highcharts');
 
const Highchart = () => {
    const {getPrices, prices, dates, bovine} = useContext(PricesContext)
    // const prices= [];
    //var dates=[];
    // const [prices, setPrices] = useState([])
    // const [dates, setDates] = useState([])
    // const convertToNumbers = (arPrices) => {
    //     let pricesInNumber = arPrices.map(price=>{
    //         //console.log(parseFloat((price.replace('.', '')).replace(',','.')));
    //         return parseFloat((price.replace('.', '')).replace(',','.'))})
    //     return pricesInNumber;
    // }
    const loadGraph = (p,dates) =>{
        console.log("p: ",p)
        Highcharts.chart('grafico', {
            // options - see https://api.highcharts.com/highcharts
            title: {
                text: 'Precio promedio de cinco primeros precios (5pp) '
            },
        
            // subtitle: {
            //     text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>'
            // },
        
            yAxis: {
                title: {
                    text: '$'
                }
            },
        
            xAxis: {
                //type: "datetime",
                categories: dates,
                accessibility: {
                    rangeDescription: 'Range: 3010 to 3020'
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    //pointStart: 2010
                }
            },
        
            series: [{
                name: '2022',
                data: p
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 5000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
          });
    }
    useEffect(()=>{
        //console.log("bovine en highcharts: ",bovine)
        //getPrices(bovine);
        // fetch('http://localhost:5000/prices')
        // .then(x=>x.json())
        // .then(data=>{
        //     let pricesConvertes=convertToNumbers(data.arrPreciosSubastas)
        //     //sleep(1000);
        //     setPrices(pricesConvertes)
        //     loadGraph(prices, data.arrDates)
        // })
        // .catch(error=>console.log("error: ",error));

        // const fetchData = async () => {
        //     const data = await fetch('http://localhost:5000/prices').then(x=>x.json()).catch(error=>console.log("error: ",error));
        //     console.log("data: ",data)
        //     let pricesConvertes=await convertToNumbers(data.arrPreciosSubastas)
        //     setPrices([...prices, pricesConvertes])
        //     setDates([...dates, data.arrDates])
            //dates=data.dates;
            //loadGraph(prices, data.arrDates)
            //loadGraph(pricesConvertes, data.arrDates)
        //}
        //fetchData();
        // if(prices.length>0 && dates.length>0){
        //     loadGraph(prices[0], dates[0]) 
        // }
        
    },[])

    useEffect(()=>{
        // console.log("se ha cambiado a: ",bovine)
        // console.log("valor de prices: ",prices)
        // console.log("valor de dates: ",dates)
        //loadGraph(prices[0], dates[0])
        if(prices.length>0 && dates.length>0){
            loadGraph(prices[0], dates[0]) 
        }
        //console.log("prices: ",prices)
    },[prices])
    
    return (<>
        <div id="grafico" >{prices.length===0?(<div style={{paddingTop:'30%'}}><Spinner  color='primary'/>   Loading...</div>):""}</div>
        {/* <div id="grafico" style={{height:"calc(100vh-52px)", margin:"0 auto", width:"100%", textAlign:"center"}} >{prices.length===0?(<div style={{paddingTop:'50%'}}><Spinner  color='primary'/>   Loading...</div>):""}</div> */}
    {/* <div id="grafico" style={{width: "100px", height: "100px", backgroundColor: "orange"}}></div> */}
    </>);
}

export default Highchart
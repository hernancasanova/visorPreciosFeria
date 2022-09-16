import React, {useEffect} from 'react'
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

//var Highcharts = require('highcharts');
 
const Highchart = () => {
    var prices;
    const convertToNumbers = (arPrices) => {
        //console.log("prices: ",arPrices)
        let pricesInNumber = arPrices.map(price=>{
            //console.log(parseFloat((price.replace('.', '')).replace(',','.')));
            return parseFloat((price.replace('.', '')).replace(',','.'))})
        return pricesInNumber;
    }
    const loadGraph = p =>{
        console.log("p: ",p)
        Highcharts.chart('grafico', {
            // options - see https://api.highcharts.com/highcharts
            title: {
                text: 'Precio promedio de terneros (5pp) durante el año 2022 '
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
                    pointStart: 2010
                }
            },
        
            series: [{
                name: '5PP',
                data: p
                //data: prices
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
        fetch('http://localhost:5000/prices')
        .then(x=>x.json())
        .then(data=>{
            //prices=x.prices;
            //console.log("y",y.json())
            prices=convertToNumbers(data.prices)
            loadGraph(prices)
        })
        .catch(error=>console.log("error: ",error));
        
    },[])
    
    return (
        <div id="grafico" ></div>
    // <div id="grafico" style={{width: "100px", height: "100px", backgroundColor: "orange"}}></div>
    )
}

export default Highchart
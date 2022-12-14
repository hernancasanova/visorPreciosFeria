import React, {useEffect, useState, useContext} from 'react'
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { Spinner } from 'reactstrap';
import PricesContext from "../context/prices/PricesContext";

Exporting(Highcharts);

//var Highcharts = require('highcharts');
 
const Highchart = () => {
    const {prices, dates, bovine, loading, yearSelected, types} = useContext(PricesContext)
    //var bovineSelected = types.length>0?document.getElementById('selectBovine').options[bovineSelected.selectedIndex].text: "";
    const loadGraph = (p,dates) =>{
        //console.log("p: ",p)
        Highcharts.chart('g', {
            // options - see https://api.highcharts.com/highcharts
            title: {
                text: '<b>Precio promedio de cinco primeros precios (5pp) del año '+yearSelected+'</b>'   
            },
        
            // subtitle: {
            //     text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>'
            // },
            
            formatter: function(){
                console.log(this)
                return this.point.name
            },
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
            tooltip: {
                formatter: function () {
                    return "<b>"+this.x+"<br>$ "+this.y+"</b>"
                }
            },
        
            series: [{
                name: yearSelected,
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
    //useEffect(()=>{
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
        
    //},[])

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
    
    //console.log("loading en gráfico: ",loading)
    return (
        <div id="grafico" >
            {loading?<div style={{paddingTop:'30%'}}><Spinner  color='primary'/>   Cargando información...</div>:<div id="g" >
                {!loading && prices.length==0?<p>Seleccione un tipo de vacuno y un periodo.<br/> Luego presione el botón "Visualizar datos" para desplegar resultados</p>:""}</div>}
            {/* (!prices?"":<div style={{paddingTop:"30%"}}>Presiona el botón "Visualizar datos" para cargar información {loading?"true":"false"}</div>)} */}
        </div>
        );
}

export default Highchart
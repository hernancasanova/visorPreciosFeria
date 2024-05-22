import React, {useEffect, useState, useContext} from 'react'
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { Spinner } from 'reactstrap';
import PricesContext from "../context/prices/PricesContext";

Exporting(Highcharts);

//var Highcharts = require('highcharts');
 
const Highchart = () => {
    const {prices, dates, bovine, establishments, loading, yearSelected, types} = useContext(PricesContext)
    //var bovineSelected = types.length>0?document.getElementById('selectBovine').options[bovineSelected.selectedIndex].text: "";
    const loadGraph = (p,dates,arrEstablishments) =>{
        //console.log("p: ",p)
        var colors=["#8085e9","#f15c80"]
        var s=[];
        p.map((pr,i)=>{
            s.push({
                //type: 'scatter',
                name: arrEstablishments[i],
                data: pr,
                color:colors[i]
            });
        })
        console.log("S: ",arrEstablishments)
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
        
            series: s,
        
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
        // console.log("se ha cambiado a: ",bovine)
        // console.log("valor de prices: ",prices)
        // console.log("valor de dates: ",dates)
        //loadGraph(prices[0], dates[0])
        if(prices.length>0 ){
            //loadGraph(prices[0], dates[0]) 
            loadGraph(prices,dates[0],establishments)
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
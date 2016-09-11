import React, { Component, PropTypes } from 'react'
import ListItem from './ListItem'
// import {RadialChart} from 'react-vis'
// import {DiscreteColorLegend} from 'react-vis'
import '../../divcss.css'
import {Doughnut} from 'react-chartjs-2'
export default class ListItemsManager extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }

  render () {

    const { items } = this.props;
    var data = {};

    var list = [];
    var result_data_list = [];
    var legend_list = [];
    var result_legend_list = [];
    return (
        <div className="wrapper">

            <div className="first">
              <span>

              {
                [...items].map((item, index) => {


                  if(item.hasOwnProperty('cont')){
                      // console.log("item cont: " + item.cont);
                    var cont = item.cont;
                    var cont1 = cont.split(";");


                    for (var k = 0; k < cont1.length-1; k++) {
                      // var tinymap = {};

                      var cont2 = cont1[k].split(",");
                      // tinymap['angle'] = cont2[1];
                      legend_list.push(cont2[0]);
                      list.push(cont2[1]);
                        // console.log("cont: " + cont3);
                    }

                  }
                  if(legend_list != []) result_legend_list = legend_list;
                  if (list != []) result_data_list = list;
                  console.log('legend: ' + result_legend_list);
                  console.log('data: ' + result_data_list);

                  data = {
                    labels:
                      result_legend_list,
                    datasets: [{
                      data: result_data_list,
                      backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF8463',
                        '#63FF84',
                        '#6384FF',
                        '#84FF63',
                        '#8463FF',
                        '#63FFDE',
                        '#63D2FF',
                        '#63FF90',
                        '#FF9063'

                      ],
                      hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF8463',
                        '#63FF84',
                        '#6384FF',
                        '#84FF63',
                        '#8463FF',
                        '#63FFDE',
                        '#63D2FF',
                        '#63FF90',
                        '#FF9063'
                      ]
                    }]
                  };
                  // console.log("list: " + JSON.stringify(list));
                  return (
                    <ListItem
                      key={index}
                      item={item.title}
                    />

                  )
                })

              }
                </span>
              </div>
            <div className="second">


              <Doughnut
                  data={data}
                  width={100}
                  height={100}
                  options={{}}
              />

            </div>




        </div>



    )

  }
}

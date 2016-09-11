import React, { Component, PropTypes } from 'react'
import ListItem from './ListItem'
import {RadialChart} from 'react-vis'
import {DiscreteColorLegend} from 'react-vis'
import '../../divcss.css'
import {Doughnut} from 'react-chartjs-2'
export default class ListItemsManager extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }

  render () {

    const { items } = this.props;
    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };
    // const ITEMS = [
    //   {title: "hello",  disabled: false}
    //   // 'Select boxes',
    //   // 'Date inputs',
    //   // 'Password inputs',
    //   // 'Forms',
    //   // 'Other'
    // ];
    var list = [];
    var result_list = [];
    var legend_list = [];
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
                      var tinymap = {};

                      var cont2 = cont1[k].split(",");
                      tinymap['angle'] = cont2[1];
                      legend_list.push(cont2[0]);
                      list.push(tinymap);
                        // console.log("cont: " + cont3);
                    }

                  }
                  if (list != []) result_list = list;
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

              <RadialChart
                data={result_list}
                width={200}
                height={200}
              />
              <Doughnut
                  data={data}
                  width={100}
                  height={100}
                  options={{}}
              />

            </div>
            <div className="third">
              <DiscreteColorLegend
                  height={1000}
                  width={400}
                  // items={ITEMS}
                  items={legend_list}
              />
            </div>



        </div>



    )

  }
}

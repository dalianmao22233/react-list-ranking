import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactExpandableListView from '..'
import '../../react-expandable-listview.css'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDzxaoMZmV_N-YjhNr1bbWRXPi4SGrQzhA",
  authDomain: "firstproject-a737a.firebaseio.com",
  databaseURL: "https://firstproject-a737a.firebaseio.com"
};

firebase.initializeApp(config);
var preDATA_repo_name = [];
var preDATA_fork = [];
var preDATA_star = [];
var preDATA_teamurl = [];
var firebaseRef = firebase.database().ref('repo_list');
var total_cont_list = [];
firebaseRef.on('value', function (dataSnapshot) {
  var items = [];
  dataSnapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    // console.log("items: " + item);
    items.push(item);
    preDATA_repo_name.push(item['repo_name']);
    preDATA_fork.push(item['forks_count']);
    preDATA_star.push(item['stargazers_count']);
    preDATA_teamurl.push(item['teams_url']);

    var cont_len = item['contributors'].length;
    var cont_tiny_str = "";
    for(var i = 0; i < cont_len; i++) {
        cont_tiny_str += item['contributors'][i]['contributor'] + "," +  item['contributors'][i]['total'] + ";";
    }
    if(cont_tiny_str == "") cont_tiny_str = "no_user,1;";
    total_cont_list.push(cont_tiny_str);


  });

  // console.log(total_cont_list);
  var DATA = [];
  for(var i = 0; i < preDATA_star.length; i++) {
    var eachmap = {};
    var tinymap1 = {};
    var tinymap2 = {};
    var tinymap3 = {};
    var tinymap4 = {};
    eachmap['headerName'] = preDATA_repo_name[i];
    eachmap['isOpened'] = true;

    eachmap['items'] = [];
    tinymap1['title'] = 'Fork: ' + preDATA_fork[i];
    tinymap2['title'] = 'Star: ' + preDATA_star[i];
    tinymap3['title'] = 'Team url: ' + preDATA_teamurl[i];
    tinymap4['cont'] = total_cont_list[i];
    eachmap['items'].push(tinymap1);
    eachmap['items'].push(tinymap2);
    eachmap['items'].push(tinymap3);
    eachmap['items'].push(tinymap4);


    eachmap['height'] = 400;
    DATA.push(eachmap);

  }

  class App extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired
    }

    render () {
      const { data } = this.props
      return (
          <div>
          <ReactExpandableListView
              data={data}
              headerAttName="headerName"
              itemsAttName="items"
          />
            </div>

      )
    }
  }

  const appRoot = document.createElement('div')
  appRoot.id = 'app'
  document.body.appendChild(appRoot)

  render(<App data={DATA} />, appRoot)

});

/**
 * Created by dalianmao22233 on 8/12/16.
 */
var config = {
   apiKey: "AIzaSyCdxGmqWURL8YUfGPK3OVANsyvsE0cHV5s",
   authDomain: "reactfiretodoapp.firebaseapp.com",
   databaseURL: "https://reactfiretodoapp.firebaseio.com"
};
firebase.initializeApp(config);

var TodoList2 = React.createClass({
    render: function() {
        // var _this = this;
        var createItem = function(item, index) {
            return (
                <p key={ index }>
                    { item.text }

                </p>
            );
        };
        return <p>{ this.props.items.map(createItem) }</p>;
    }
});

var TodoApp2 = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            text: ''
        };
    },

    componentWillMount: function() {
        this.firebaseRef = firebase.database().ref('todoApp/items');
        this.firebaseRef.on('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                console.log("item:" + item);
                items.push(item);
            }.bind(this));
            this.setState({
                items: items
            });
            console.log("items: " + items);
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                <TodoList2 items={ this.state.items }  />

            </div>
        );
    }
});

ReactDOM.render(<TodoApp2 />, document.getElementById('todoApp2'));
// {"t":"d","d":{"b":{"p":"item-react","d":{"first":{"1":"first11"},"second":{"2":"second22"},"third":{"3":"third33"}}},"a":"d"}}
// {"t":"d","d":{"b":{"p":"todoApp/items","d":{"-KP2QwmB_K72tDr4Tm0K":{"text":"1"},"-KP2Qxmf4I8-JoT5c8HA":{"text":"1"},"-KP2eh4SKiVqVurCq6EP":{"text":"df"},"-KP2jY0rz0jgLCkbcsBh":{"text":"ss"},"-KP38T7zOV52tC__r0Us":{"text":"ddd"}}},"a":"d"}}
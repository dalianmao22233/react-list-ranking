
var TodoList2 = React.createClass({
    render: function() {
        // var _this = this;
        var createItem = function(item, index) {
            return (
                <p key={ index }>
                    { item['repo_name']}

                </p>
            );
        };
        return <p>{ this.props.items.map(createItem) } </p>;
    }
});

var TodoApp2 = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        return {
            items: [],
            // text: ''
        };
    },

    componentWillMount: function() {
        // this.firebaseRef = firebase.database().ref('item-react');
        this.firebaseRef = firebase.database().ref('repo_list');


        this.firebaseRef.on('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                // item['.key'] = childSnapshot.key;
                // console.log("item:" + item);
                items.push(item);
            }.bind(this));
            this.setState({
                items: items
            });
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

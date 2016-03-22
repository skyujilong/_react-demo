/**
 * Created by YU on 2016/3/22.
 */
/*[
    {"author": "Pete Hunt", "text": "This is one comment"},
    {"author": "Jordan Walke", "text": "This is *another* comment"}
]*/
var CommentList = React.createClass({
    render: function(){
        var comments = this.props.data.map(function(item){
            return (
                <ul>
                    <li> author:{item.author} </li>
                    <li> text:{item.text} </li>
                </ul>
            );
        });

        return (
            <div>
                {comments}
            </div>
        );
    }
});


var Comment = React.createClass({
    getInitialState: function(){
        return {data:[]};
    },
    render: function(){
        return (
            <div className="comment">
                <h1>Commnets</h1>
                <CommentList data={this.state.data}/>
            </div>
        );
    },
    componentDidMount:function(){

        setTimeout(function(){
            this.setState({data:[
                {"author": "Pete Hunt", "text": "This is one comment"},
                {"author": "Jordan Walke", "text": "This is *another* comment"}
            ]});
        }.bind(this),3000);
    }
});

ReactDOM.render(<Comment/>,document.getElementById('test'));
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
        //在组件初始化的时候执行一次，可以用来初始化 state 当内置对象state发生改变的时候自动重绘当前组件。
        // （可以用来请求服务器获取对应的数据）
        /*setTimeout(function(){
            this.setState({data:[
                {"author": "Pete Hunt", "text": "This is one comment"},
                {"author": "Jordan Walke", "text": "This is *another* comment"}
            ]});
        }.bind(this),3000);*/
        //箭头函数，会获取器所在上下文的this作为自己的this值。 下面的代码等同于上面的代码
        setTimeout(()=>{
            this.setState({data:[
                {"author": "Pete Hunt", "text": "This is one comment"},
                {"author": "Jordan Walke", "text": "This is *another* comment"}
            ]});
        },3000);
    }
});

ReactDOM.render(<Comment/>,document.getElementById('test'));
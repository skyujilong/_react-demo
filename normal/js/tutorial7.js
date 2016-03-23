/**
 * Created by YU on 2016/3/23.
 */
var CommentForm = React.createClass({
    /**
     * 初始化state
     * @returns {{author: string, text: string}}
     */
    getInitialState: function () {
        return {author: '', text: ''};
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="Say something...." value={this.state.text} onChange={this.handleTextChange}/>
                <input type="submit" value="Post"/>
            </form>
        );
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();//阻止默认行为
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!author || !text) {
            return;
        }
        console.log(this.state);
        //将数据回退给上层控件 CommentBox
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: "", text: ""});
    }
});

var CommentList = React.createClass({
    render: function () {
        //数组型的必须要有key属性
        console.log('commentList : %o',this.props.data);
        var common = this.props.data.map(function (item) {
            return (
                <li key={item.id}>
                    <div>name:{item.author}</div>
                    <div>word:{item.text}</div>
                </li>
            );
        });
        return (
            <ul className="commentList">{common}</ul>
        );
    }
});

var CommentBox = React.createClass({
    //初始化
    componentDidMount: function () {
        setTimeout(()=> {
            this.setState({
                data: [
                    {author: 'yjl', text: 'success', id: 0},
                    {author: 'cxn', text: 'success too', id: 1}
                ]
            });
        }, 3000);
    },
    getInitialState: function () {
        return {data: []};
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    },
    handleCommentSubmit: function (comment) {
        console.log(this.state.data);
        //注意一点 这里如果发生变化 可以采用两种方式去更新 state
        //一种是全局更新，全局更新如下：
        /*this.state.data.push({
            author: comment.author,
            text: comment.text,
            id: new Date().getTime()
        });
        this.setState(this.state);*/
        //一种是局部更新，局部更新如下：
        var data = React.addons.update(this.state,{
            data:{
                $push:[{
                    author: comment.author,
                    text: comment.text,
                    id: new Date().getTime()
                }]
            }
        });
        this.setState(data);

    }
});
ReactDOM.render(<CommentBox/>, document.getElementById('view'));
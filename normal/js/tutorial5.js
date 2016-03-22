/**
 * Created by YU on 2016/3/22.
 */
var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({
    render: function(){
        return (
            <ul className="comment">
                <li>name:{this.props.auther}</li>
                <li>id:{this.props.key}</li>
                <li>{this.props.children.toString()}</li>
            </ul>

        );
    }
});


var CommentList = React.createClass({
    render: function(){

        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment auther={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});


var CommentForm = React.createClass({
    render: function(){
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});


var CommentBox = React.createClass({
    render: function(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data}/>
                <CommentForm />
            </div>
        );
    }
});


ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('test')
);





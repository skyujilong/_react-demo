/**
 * Created by YU on 2016/2/26.
 */
var CommentBox = React.createClass({
    render: function(){
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);
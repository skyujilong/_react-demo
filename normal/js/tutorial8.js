/**
 * Created by YU on 2016/3/24.
 */
var TextComment = React.createClass({
    getInitialState: function(){
        return {html:'<ul><li>hello world</li></ul>'}
    },
    render: function(){
        //为了防止xss注入攻击 默认的方式是不可以渲染html内容的
        //采用如下的方式 可以进行html的注入  下面的方式 必须采用dangerouslySetInnerHTML 与 __html
        return (
            <div className="textComment" dangerouslySetInnerHTML={{__html:this.state.html}}></div>
        );
    }
});
ReactDOM.render(<TextComment/>,document.getElementById('test'));
/**
 * Created by YU on 2016/3/24.
 */
var TestComment = React.createClass({
    getInitialState: function(){
        return {userInput:'hello world'}
    },
    render: function(){
        return (
            <div className="testComment">
                <h3>text:{this.state.userInput}</h3>
                <a href="javascript:void(0);" onClick={this.clearAndFocusInput}>Click to Focus and Reset</a>
                {/*代码注释*/}
                <input ref={(ref)=>this.myInput = ref} value={this.state.userInput} onChange={this.handleChange}/>
            </div>
        );
    },
    clearAndFocusInput: function(){
        this.setState({userInput:''});
        this.myInput.focus();
        //this.refs.myInput.getDOMNode().focus();
    },
    handleChange: function(e){
        console.log(e.target.value);
        this.setState({userInput:e.target.value});
    }
});



ReactDOM.render(<TestComment/>,document.getElementById('test'));


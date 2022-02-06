
import React from "react"
import Todo from './Todo';
import AddTodo from './AddTodo';
import './App.css';
import {Paper, List, Container} from "@material-ui/core";
import {call} from "./service/ApiService";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: 0, title: "Hello World", done: true},
                {id: 1, title: "Hello World2", done: false},
            ],
        };
    }
    componentDidMount(){
        call("/todo", "GET", null).then((response)=>
        this.setState({items: response.data})
        );
    }


//add
    add = (item) => {
        /*
        const thisItems = this.state.items;
        item.id = "ID-" + thisItems.length;
        item.done = false;
        thisItems.push(item);
        this.setState({items: thisItems});
        console.log("items : ", this.state.items);
         */
        call("/todo", "POST", item).then((response) =>
        this.setState({items: response.data})
        );
    }

    delete = (item) => {
      call("/todo", "DELETE", item).then((response)=>
        this.setState({items: response.data})
      );
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response)=>
        this.setState({items: response.data})
        );
    }
    render() {
      //  let todoItems = this.state.items.map((item,idx)=>(
      //      <Todo item={item} key={item.id}/>
      //  ));
        let todoItems = this.state.items.length > 0 && (
            <Paper style={{margin:16}}>
                <List>
                    {this.state.items.map((item, idx)=>(
                        <Todo item={item}
                              key={item.id}
                              delete={this.delete}
                              update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
  }
}

export default App;

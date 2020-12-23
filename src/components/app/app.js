import React from 'react';

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css';

export default class App extends React.Component {

  startId = 0;

  state = {
    todoData: [
      this.createTodoItem('Work one year'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build Awesome App'),
      this.createTodoItem('Become a Senior')
    ],
    term: '',
    sortProp: 'all'
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.startId++
    }
  };

  findItem(id, todoData) {
    return todoData.findIndex((el) => el.id === id)
  }

  addItem = (text) => {

    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {

      const idx = this.findItem(id, todoData);

      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      };

    });

  };

  onSearched = (term) => {
    this.setState({term});
  };

  onSorted = (sortProp) => {
    this.setState({sortProp});
  };

  toggleProperty(arr, id, propName) {
    const idx = this.findItem(id, arr);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  onToggleImportant = (id) => {

    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });

  };

  onToggleDone = (id) => {

    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });

  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  sort(items, prop) {

    switch (prop) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }

  }

  render() {

    const {todoData, term, sortProp} = this.state;
    const visibleItems = this.sort(this.search(todoData, term), sortProp);

    const doneCount = todoData
                          .filter((el)=>el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel onSearched={this.onSearched} />
          <ItemStatusFilter onSorted={this.onSorted} />
        </div>

        <TodoList todos={visibleItems}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onAdded={this.addItem}/>
      </div>
    );
  }
}
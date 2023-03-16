import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../app-search-panel/app-search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeeList from "../app-employee-list/app-employee-list";
import EmployeeAddForm from "../app-employee-add-form/app-employee-add-form";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John Week", salary: 1800, increase: false, like: true, id: 1 },
        {
          name: "Robert Zemeckis",
          salary: 400,
          increase: true,
          like: false,
          id: 2,
        },
        { name: "Olaf Wolf", salary: 200, increase: false, like: false, id: 3 },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      like: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "like":
        return items.filter((item) => item.like);
      case "moreThen1k":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increase = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo employees={employees} increase={increase} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeeList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeeAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
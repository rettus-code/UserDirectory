import API from "../../utility/API";
import React, {Component} from 'react';

class EmployeeData extends Component {
    state = {
      result: [],
      search: "",
    };
  
    fullName() {
      API.search()
        .then((res) => {
          const resultsWithFullName = res.data.results.map(employee=> {
            let fullName =  `${employee.name.first} ${employee.name.last}`
          employee.fullName= fullName
          return employee;
        })
            this.setState({ result: resultsWithFullName });
          })
        .catch((err) => console.log(err));
    }
  
    handleChange = (e) => {
      this.setState({search: e.target.value})
    }
  
    handleSort = (choice) => {
      const newResult = [...this.state.result];
      newResult.sort((a,b) => (a[choice] > b[choice]) ? 1: -1);
  
      console.log( { newResult } );
  
      this.setState({result: newResult})
    }
  
    render() {
      const {result, search} = this.state;
  
      const filteredResult = result.filter((result) =>
      result.fullName.toLowerCase().includes(search.toLowerCase())
    );
     
      return (
        <div>
        <h1>Employee Directory</h1>
          <br></br>
          <div>
            <h4>Search By Name</h4>
            <SearchBar 
            placeholder="search by name"
            handleChange={this.handleChange}
            value={this.state.search}
            />
          </div>
          <br></br>
          <br></br>
          <div className="tableDiv">
              <ResultTable employees={filteredResult} handleSort={this.handleSort}/>
          </div>
          <div className="footer">
          </div>
        </div>
      );
    }
  }
  
  export default EmployeeData

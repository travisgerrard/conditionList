import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
const myData = require('./conditionJSON/HemeOnc.json');

const DeleteButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: red;
  color: white;
  border: 2px solid red;
`;

const ListItem = styled.p`
  cursor: pointer;

  font-family: Georgia;
  font-size: 20px;
  font-weight: ${props => props.withData ? 'bold' : 'normal'};
`;

const ListWrapper = styled.section`
  padding-left: 50px;
  background: white;
`;

const InputWrapper = styled.section`
  background: Cornsilk;
  border-radius: 3px;
`;

const SelectedLabel = styled.label`
  font-family: Georgia;
  font-size: 18px;
  padding-left: 15px;
`;

const SelectedInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: white;
  border: none;
  border-radius: 3px;
  font-family: Georgia;
  font-size: 18px;

`;

const SelectedTextArea = styled.textarea`
  color: black;
  margin-left: 0.5em;
  background: white;
  border: none;
  border-radius: 3px;
  font-family: Georgia;
  font-size: 18px;
  resize: both;

`;

class App extends Component {
  state = {
    diseaseData: localStorage.myData ? JSON.parse(localStorage.myData) : myData,
    addConditionInputBox: '',
  }

  headerTapped = (index) => {
    index = index - 1;
    const diseaseData = this.state.diseaseData;
    //diseaseData[index].selected ? true : false;
    if(diseaseData[index].selected) {
      diseaseData[index].selected = false;
    } else {
      diseaseData[index].selected = true;
    }
    this.setState({ diseaseData });
    //localStorage.setItem('myData', this.state.diseaseData);
    localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
  }

  handleChangePreceptor = (element, e) => {
    console.log(e.target.name);
    const index = element.id - 1;
    const diseaseData = this.state.diseaseData;
    diseaseData[index].preceptor = e.target.value;
    this.setState({ diseaseData });
    localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
  };

  handleChangeDate = (element, e) => {
    console.log(e.target.name);
    const index = element.id - 1;
    const diseaseData = this.state.diseaseData;
    diseaseData[index].date = e.target.value;
    this.setState({ diseaseData });
    localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
  };

  handleChangeWhatWasLearned = (element, e) => {
    console.log(e.target.name);
    const index = element.id - 1;
    const diseaseData = this.state.diseaseData;
    diseaseData[index].whatWasLearned = e.target.value;
    this.setState({ diseaseData });
    localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
  }

  deleteDisease = (element, e) => {
    //eslint-disable-next-line
    if (confirm(`Are you sure you want to delete "${element.name}"`) == true) {
      const index = element.id - 1;
      console.log(index);
      console.log(element);
      const diseaseData = this.state.diseaseData;
      diseaseData[index].hidden = true;
      this.setState({ diseaseData });
      localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
    }
  }

  handleChangeSearchBox = (element, e) => {
    console.log(e.target.name);
  };

  handleClickAddConditionBox = (e) => {
    if (this.state.addConditionInputBox === "") return;
    const diseaseData = this.state.diseaseData;
    const lastElementInArray = diseaseData[diseaseData.length - 1];
    console.log(lastElementInArray);
    var newDisease = {
      id: lastElementInArray.id + 1,
      Catagory: lastElementInArray.Catagory,
      name: this.state.addConditionInputBox,
      preceptor: "",
      date: "",
      selected: true
    };
    diseaseData.push(newDisease);
    this.setState({ diseaseData });
    localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.

    this.setState({
      addConditionInputBox: ""
    });
  }

  handleAddConditionBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const inputData = (element) => (
      <div>
        <InputWrapper>
          <SelectedLabel>Seen with </SelectedLabel>
          <SelectedInput
            name="preceptor"
            id="preceptor"
            defaultValue={element.preceptor ? element.preceptor : ""}
            onChange={this.handleChangePreceptor.bind(this, element)}
          />
        <br />
        <SelectedLabel> Date</SelectedLabel>
          <SelectedInput
            name={element.date}
            id={element.date}
            placeholder="mm/dd/yy"
            defaultValue={element.date ? element.date : ""}
            onChange={this.handleChangeDate.bind(this, element)}
          />
        <br />
        <SelectedLabel>Learned</SelectedLabel>
        <SelectedTextArea rows="6" cols="50"
          name="whatWasLearned"
          id="whatWasLearned"
          defaultValue={element.whatWasLearned ? element.whatWasLearned : ""}
          onChange={this.handleChangeWhatWasLearned.bind(this, element)}/>
        <br />
        <DeleteButton onClick={this.deleteDisease.bind(this, element)}>Delete</DeleteButton>
      </InputWrapper>
      </div>
    );
    var diseaseNames = this.state.diseaseData.map((element) =>
        <div key={element.id}>
          <ListWrapper>
          {element.hidden ? "" :
            element.preceptor === "" ?
              <ListItem onClick={this.headerTapped.bind(this, element.id)}>{element.name}</ListItem> :
                <ListItem withData onClick={this.headerTapped.bind(this, element.id)}>{element.name}</ListItem> }
          {element.selected && !element.hidden ? inputData(element) : "" }
          </ListWrapper>
        </div>
    )

    // const searchBox = () => (
    //   <div>
    //     <label>Search For Term</label>
    //       <input
    //         name="searchBox"
    //         id="searchBox"
    //         placeholder="Type search term here"
    //         onChange={this.handleChangeSearchBox.bind(this, this.props.diseaseData)}
    //       />
    //   </div>
    // )

    const addCondition = () => (
      <div>
      <input
        name="addConditionInputBox"
        id="addCondition"
        value={this.state.addConditionInputBox}
        placeholder="Condition"
        onChange={this.handleAddConditionBoxChange}
      />
    <button onClick={this.handleClickAddConditionBox}>Add</button>
    </div>
    )

    //Add a "what was learned" section

    return (
      <div>
        <br/>

         {diseaseNames}
         <br/>
         {addCondition()}
      </div>
    );
  }
}

export default App;

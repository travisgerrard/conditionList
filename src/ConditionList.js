import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchDiseases, updateDisease, saveDisease } from './actions/diseaseActions';

//const myData = require('./conditionJSON/HemeOnc.json');


const DeleteButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: red;
  color: white;
  border: 2px solid red;
`;

const AddButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: green;
  color: white;
  border: 2px solid gree;
`;

const ListTitle = styled.h1`
  font-family: Georgia;
  font-size: 30px;
  font-weight: bold;
  padding-left: 15px;
`;

const ListItem = styled.p`
  cursor: pointer;

  font-family: Georgia;
  font-size: 20px;
  padding-bottom: 2.5px;
  font-weight: ${props => props.withData ? 'bold' : 'normal'};
`;

const ListWrapper = styled.section`
  padding-left: 30px;
  padding-right: 30px;
  background: White;
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
  border: 2px solid Gainsboro;

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
    diseaseData: this.props.diseases,//localStorage.myData ? JSON.parse(localStorage.myData) : myData,
    addConditionInputBox: '',
    searchInputBox: '',
  }

  // Runs at initial loading of patient info. uses action to call server for data
  componentDidMount () {
    this.props.fetchDiseases();
  }

  headerTapped = (element) => {
    element.selected ? element.selected = false : element.selected = true;
    this.props.updateDisease(element);
  }

  handleChangePreceptor = (element, e) => {
    element.preceptor = e.target.value;
    this.props.updateDisease(element);
  };

  handleChangeDate = (element, e) => {
    element.date = e.target.value;
    this.props.updateDisease(element);
  };

  handleChangeWhatWasLearned = (element, e) => {
    element.whatWasLearned = e.target.value;
    this.props.updateDisease(element);
  }

  deleteDisease = (element, e) => {
    //eslint-disable-next-line
    if (confirm(`Are you sure you want to delete "${element.name}"`) == true) {
      element.hidden = true;
      this.props.updateDisease(element);
    }
  }

  handleChangeSearchBox = (element, e) => {
    console.log(e.target.name);
  };

  handleClickAddConditionBox = (e) => {
    if (this.state.addConditionInputBox === "") return;
    const diseaseData = this.props.diseases;
    const lastElementInArray = diseaseData[diseaseData.length - 1];
    var newDisease = {
      id: lastElementInArray.id + 1,
      Catagory: lastElementInArray.Catagory,
      name: this.state.addConditionInputBox,
      preceptor: "",
      date: "",
      selected: true
    };
    this.props.saveDisease(newDisease);
    // diseaseData.push(newDisease);
    // this.setState({ diseaseData });
    // localStorage.myData = JSON.stringify(this.state.diseaseData); //Using localStorage to persist data.
    //
    this.setState({
      addConditionInputBox: ""
    });
  }

  handleAddConditionBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSearchBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    var diseaseNames = this.props.diseases.length ? this.props.diseases.map((element) =>
        <div key={element.id}>
          <ListWrapper>
          {element.hidden ? "" :
            element.preceptor === "" ?
              <ListItem onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> :
                <ListItem withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> }
          {element.selected && !element.hidden ? inputData(element) : "" }
          </ListWrapper>
        </div>
      ) : <div></div>

    var searchNames = this.props.diseases.length ? this.props.diseases.filter(x => x.name.toLowerCase().includes(this.state.searchInputBox.toLowerCase())).map((element) =>
        <div key={element.id}>
          <ListWrapper>
          {element.hidden ? "" :
            element.preceptor === "" ?
              <ListItem onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> :
                <ListItem withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> }
          {element.selected && !element.hidden ? inputData(element) : "" }
          </ListWrapper>
        </div>
    ) : <div></div>

    const addCondition = () => (
      <div>
      <SelectedInput
        name="addConditionInputBox"
        id="addCondition"
        value={this.state.addConditionInputBox}
        placeholder="Condition"
        onChange={this.handleAddConditionBoxChange}
      />
    <AddButton onClick={this.handleClickAddConditionBox}>Add</AddButton>
    </div>
    )

    const searchBox = () => (
      <div>
      <SelectedInput
        name="searchInputBox"
        id="searchInputBox"
        value={this.state.searchInputBox}
        placeholder="Search term"
        onChange={this.handleSearchBoxChange}
      />
    </div>
    )

    //Add a "what was learned" section

    return (
      <div>
        <br/>
        <ListTitle>Heme-Onc</ListTitle>
        {searchBox()}
         {this.state.searchInputBox === '' ? diseaseNames : searchNames}
         <br/>
         {addCondition()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    diseases: state.diseases
  };
}

export default connect(mapStateToProps, { fetchDiseases, updateDisease, saveDisease })(App);

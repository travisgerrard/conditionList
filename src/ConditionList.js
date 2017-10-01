import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchDiseasesWithCondition, updateDisease, saveDisease, tempDisease } from './actions/diseaseActions';
import ConditionListLearningForm from './ConditionListLearningForm';
import ConditionListLearningDisplay from './ConditionListLearningDisplay';
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
    specialty: this.props.pageTitle,
  }

  // Runs at initial loading of patient info. uses action to call server for data
  componentDidMount () {
    this.props.fetchDiseasesWithCondition(this.state.specialty);
    console.log("This did run");
    console.log(this.props.pageTitle);
  }

  headerTapped = (element) => { //Toggle isSelected
    var foundIndex = element.selected.findIndex(x => x.user == this.props.userID);
    // If user was found in the index, then update, otherwise add user
    if (foundIndex >= 0) {
      if (element.selected[foundIndex].isSelected) {
        element.selected[foundIndex] = { user: this.props.userID, isSelected: false }
      } else {
        element.selected[foundIndex] = { user: this.props.userID, isSelected: true }
      }
    } else {
      element.selected.push({ user: this.props.userID, isSelected: true });
    }
    this.props.updateDisease(element);
  }

  isSelected = (element) => { //Returns is item is selected by user.
    var foundIndex = element.selected.findIndex(x => x.user == this.props.userID);
    if (foundIndex >= 0) {
      return element.selected[foundIndex].isSelected;
    } else {
      return false;
    }
  }

  handleChangePreceptor = (element, e) => {
    // element.preceptor = e.target.value;
    // this.props.updateDisease(element);
  };

  handleChangeDate = (element, e) => {
    // element.date = e.target.value;
    // this.props.updateDisease(element);
  };

  handleChangeWhatWasLearned = (element, e) => {
    // element.whatWasLearned = e.target.value;
    // this.props.updateDisease(element);
  }

  deleteDisease = (element, e) => {
    //eslint-disable-next-line
    if (confirm(`Are you sure you want to delete "${element.name}"`) == true) {
      element.hidden = true;
      this.props.updateDisease(element);
    }
  }

  handleClickAddConditionBox = (e) => {
    if (this.state.addConditionInputBox === "") return;
    const diseaseData = this.props.diseases;
    const lastElementInArray = diseaseData[diseaseData.length - 1];
    var newDisease = {
      Catagory: this.state.specialty,
      name: this.state.addConditionInputBox,
      preceptor: "",
      date: "",
      selected: true
    };
    this.props.saveDisease(newDisease);
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

  handleAddPostPressed = (e) => {
    console.log(`Add post pressed`);
  }

  addPostClicked = (element, preceptor, date, whatWasLearned) => {
    var post = {
      _creator: this.props.userID,
      preceptor: preceptor,
      date: date,
      whatWasLearned: whatWasLearned
    }
    element.post.push(post);
    this.props.updateDisease(element);
  }

  hasPosts = (element) => {
    var foundIndex = element.post.findIndex(x => x._creator == this.props.userID);
    if (foundIndex >= 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var diseaseNames = this.props.diseases.length ? this.props.diseases.map((element) =>
        <div key={element._id}>
          <ListWrapper>
          {element.hidden ? "" :
            this.hasPosts(element) ?
                <ListItem withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> :
                <ListItem onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> }
          {this.isSelected(element) && !element.hidden ?
            <ConditionListLearningForm addClicked={this.addPostClicked} element={element} />
            :
              "" }
          {this.hasPosts(element) && this.isSelected(element) ? element.post.filter(x => x._creator == this.props.userID).map((post) =>
            <ConditionListLearningDisplay key={post._id} preceptor={post.preceptor} date={post.date} whatWasLearned={post.whatWasLearned} />)
            :
            "" }
          </ListWrapper>
        </div>
      ) : <div></div>

    var searchNames = this.props.diseases.length ? this.props.diseases.filter(x => x.name.toLowerCase().includes(this.state.searchInputBox.toLowerCase())).map((element) =>
        <div key={element._id}>
          <ListWrapper>
          {element.hidden ? "" :
            element.post ?
              <ListItem onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> :
                <ListItem withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem> }
          {this.isSelected(element) && !element.hidden ? <ConditionListLearningForm addClicked={this.addPostClicked} element={element} /> : "" }
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

    return (
      <div>
        <br/>
        <ListTitle>{this.state.specialty}</ListTitle>
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
    username: state.auth.user.username,
    userID: state.auth.user.id,
    diseases: state.diseases
  };
}

export default connect(mapStateToProps, { fetchDiseasesWithCondition, updateDisease, saveDisease, tempDisease })(App);

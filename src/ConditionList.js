import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchDiseasesWithCondition, updateDisease, saveDisease, tempDisease } from './actions/diseaseActions';
import ConditionListLearningForm from './ConditionListLearningForm';
import ConditionListLearningDisplay from './ConditionListLearningDisplay';
import lodashFindIndex from 'lodash.findindex';

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
  margin-bottom: 1px;
  font-weight: ${props => props.withData ? 'bold' : 'normal'};
`;

// Color coded user created content
// Green if you create the dx
// Blue if you did not create dx
const ListItemColor = ListItem.extend`
	color: ${props => props.didCreate ? 'green' : 'blue'};
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

const ConditionListLearningFormStyle = styled.section`
  display: block;
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
    var foundIndex = lodashFindIndex(element.selected, function(x) { return x.user == this.props.userID; }.bind(this) );
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
    var foundIndex = lodashFindIndex(element.selected, function(x) { return x.user == this.props.userID;}.bind(this) );
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

  deleteDisease = (element) => {
    //eslint-disable-next-line
    if (confirm(`Are you sure you want to delete "${element.name}"`) == true) {
      element.hidden = true;
      this.props.updateDisease(element);
    }
  }

  handleClickAddConditionBox = (e) => {
    if (this.state.addConditionInputBox === "") return;
    var newDisease = {
      catagory: this.state.specialty,
      name: this.state.addConditionInputBox,
      hidden: false,
      _creator: this.props.userID
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
      whatWasLearned: whatWasLearned,
      postHidden: false
    }
    element.post.push(post);
    this.props.updateDisease(element);
  }

  updatePostClicked = (element, postID, preceptor, date, whatWasLearned) => {
    var foundIndex = lodashFindIndex(element.post, function(x) {return x._id === postID; }.bind(this) );
    element.post[foundIndex].preceptor = preceptor;
    element.post[foundIndex].date = date;
    element.post[foundIndex].whatWasLearned = whatWasLearned;
    this.props.updateDisease(element);
  }

  hasPosts = (element) => {
    var foundArray = element.post.filter(x => x._creator === this.props.userID);
    var foundIndex = lodashFindIndex(foundArray, function(x) {return x.postHidden !== true; }.bind(this));
    if (foundIndex >= 0) {
      return true;
    } else {
      return false;
    }
  }

  canDelete = (element) => {
    var foundIndex = lodashFindIndex(element.post, function(x) { x._creator !== this.props.userID; }.bind(this));
    if (foundIndex < 0 && element._creator === this.props.userID) {
      return true;
    } else {
      return false;
    }
  }

  deletePost = (element, postID) => {
    var foundIndex = lodashFindIndex(element.post, function(x) {return x._id === postID;}.bind(this) );
    console.log(foundIndex);
    element.post[foundIndex].postHidden = true;
    this.props.updateDisease(element);
  }

  render() {
    var listItem = (element) => {
      var masterUser = "59d3ac5c1f318e150a601c63";
      if (this.hasPosts(element)) {
        if (element._creator === masterUser) {
          return <ListItem withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem>
        } else if (element._creator === this.props.userID) {
          return <ListItemColor didCreate withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItemColor>
        } else {
          return <ListItemColor withData onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItemColor>
        }
      } else {
        if (element._creator === masterUser) {
          return <ListItem onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItem>
        } else if (element._creator === this.props.userID) {
          return <ListItemColor didCreate onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItemColor>
        } else {
          return <ListItemColor onClick={this.headerTapped.bind(this, element)}>{element.name}</ListItemColor>
        }
      }
    }

    var diseaseNames = this.props.diseases.length
  ? this.props.diseases.map((element) => <div key={element._id}>
    <ListWrapper>
      {element.hidden ? "" : listItem(element)}
      {this.hasPosts(element) && this.isSelected(element) && !element.hidden
        ? element.post.filter(x => x._creator == this.props.userID).map((post) => post.postHidden
          ? ""
          : <ConditionListLearningFormStyle>
            <ConditionListLearningDisplay
              key={post._id}
              preceptor={post.preceptor}
              date={post.date}
              whatWasLearned={post.whatWasLearned}
              updatePostClicked={this.updatePostClicked}
              deletePost={this.deletePost}
              element={element}
              postID={post._id}/>
          </ConditionListLearningFormStyle>)
        : ""}
      {this.isSelected(element) && !element.hidden
        ? <ConditionListLearningForm
          addClicked={this.addPostClicked}
          showDeleteButton={this.canDelete(element)}
          deleteDisease={this.deleteDisease}
          element={element}/>
        : ""}
    </ListWrapper>
  </div>)
  : <div></div>

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

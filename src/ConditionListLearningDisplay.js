import React, { Component } from 'react';
import styled from 'styled-components';

const InputWrapperDisplay = styled.section`
  background: DodgerBlue;
  padding: 10px;
  border-radius: 3px;
  color: White;
  font-size: 18px;
  border: 5px solid white;
  width: 100%;
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

const DisplayLabel = styled.label`
  font-family: Georgia;
  padding-left: 5px;
  padding-right: 5px;
`;

const LearnedLine = styled.label`
  padding-left: 5px;
`;

const LearnedText = styled.pre`
  background: SteelBlue;
  font-family: Georgia;
  font-size: 20px;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
`;

const DeleteButton = styled.button`
  border-radius: 3px;
  margin: 0.1em;
  background: IndianRed;
  color: white;
  border: 2px solid IndianRed;
`;

const AddButton = styled.button`
  border-radius: 3px;
  margin: 5px;
  background: MediumSeaGreen;
  color: white;
  border: 2px solid MediumSeaGreen;
`;

// Added by you
// Added by someone else
// If a person deletes a term that someone else has added to, what happens?
// - Perhaps if there are comments on it, you can no longer delete.

class ConditionListLearningDisplay extends Component {

  state = {
    edit: false,
    preceptor: this.props.preceptor,
    date: this.props.date,
    whatWasLearned: this.props.whatWasLearned
  }

  handleEditPostPressed = (e) => {
    if (this.state.edit === false) {
      this.setState({
        edit: true
      });
    } else {
      this.setState({
        edit: false,
        preceptor: this.props.preceptor,
        date: this.props.date,
        whatWasLearned: this.props.whatWasLearned
      });
    }
  }

  handleDeletePostPressed = (e) => {
    console.log("Delete pressed");
    this.props.deletePost(this.props.element, this.props.postID);
  }

  handleSaveUpdatedPostPressed = (e) => {
    this.props.updatePostClicked(this.props.element, this.props.postID, this.state.preceptor, this.state.date, this.state.whatWasLearned);
    this.handleEditPostPressed();
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  render() {

    var displayMode = (
      <div>
      <InputWrapperDisplay>
        <DisplayLabel>Seen with: {this.props.preceptor}</DisplayLabel>
        <DisplayLabel> Date: {this.props.date}</DisplayLabel>
        <br />
        <DisplayLabel>Learning Points: </DisplayLabel>
        <LearnedText>{this.props.whatWasLearned}</LearnedText>
        <AddButton onClick={this.handleEditPostPressed} name="edit">Edit</AddButton>
        <DeleteButton onClick={this.handleDeletePostPressed}>Delete</DeleteButton>
      </InputWrapperDisplay>
      </div>
    )

    var editMode = (
    <div>
      <InputWrapperDisplay>
        <SelectedLabel>Seen with </SelectedLabel>
        <SelectedInput
          name="preceptor"
          id="preceptor"
          value={this.state.preceptor}
          onChange={this.handleChange}
        />
      <br />
      <SelectedLabel> Date</SelectedLabel>
        <SelectedInput
          name="date"
          id="date"
          placeholder="mm/dd/yy"
          value={this.state.date}
          onChange={this.handleChange}
        />
      <br />
      <SelectedLabel>Learning Points</SelectedLabel>
      <SelectedTextArea rows="6" cols="50"
        name="whatWasLearned"
        id="whatWasLearned"
        value={this.state.whatWasLearned}
        onChange={this.handleChange}/>
      <br />
      <AddButton onClick={this.handleSaveUpdatedPostPressed}>Save</AddButton>
      <DeleteButton onClick={this.handleEditPostPressed}>Cancel</DeleteButton>
    </InputWrapperDisplay>
    </div>
    )

    return (
      <div>
        {this.state.edit ? editMode : displayMode}
      </div>
    )

  }

}

export default ConditionListLearningDisplay;

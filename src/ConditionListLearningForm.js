import React, { Component } from 'react';
import styled from 'styled-components';

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

const AddButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: green;
  color: white;
  border: 2px solid gree;
`;

const DeleteButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: red;
  color: white;
  border: 2px solid red;
`;

class ConditionListLearningForm extends Component {

  state = {
    preceptor: '',
    date: '',
    whatWasLearned: ''
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  handleAddPostPressed = (e) => {
    console.log(`Add post pressed`);
    this.props.addClicked(this.props.element, this.state.preceptor, this.state.date, this.state.whatWasLearned);
    this.setState({
      preceptor: '',
      date: '',
      whatWasLearned: ''
    });
  }

  deleteListItem = (e) => {
    console.log(`Delete pressed`);
    this.props.deleteDisease(this.props.element);
  }

  render() {
    return (
      <div>
        <InputWrapper>
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
        <AddButton onClick={this.handleAddPostPressed}>Add</AddButton>
        {this.props.showDeleteButton ? <DeleteButton onClick={this.deleteListItem}>Delete</DeleteButton> : ""}
      </InputWrapper>
      </div>
    )

  }

}

export default ConditionListLearningForm;

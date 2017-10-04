import React, { Component } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.section`
  background: Cornsilk;
  padding: 10px;
  border-radius: 3px;
  font-size: 18px;
  border: 5px solid white;
  width: 100%;
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
  font-family: Georgia;
  font-size: 18px;
  border-radius: 3px;
  border: 2px solid Gainsboro;
  padding: 5px;
  margin: 5px;
  width: 98%;
`;

const AddButton = styled.button`
  border-radius: 3px;
  margin: 5px;
  background: MediumSeaGreen;
  color: white;
  border: 2px solid MediumSeaGreen;
`;

const DeleteButton = styled.button`
  border-radius: 3px;
  margin: 0.1em;
  background: IndianRed;
  color: white;
  border: 2px solid IndianRed;
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
        <br />
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

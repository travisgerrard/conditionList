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

class ConditionListLearningDisplay extends Component {

  render() {
    return (
      <div>
        <InputWrapper>
          <SelectedLabel>Seen with </SelectedLabel>
          {this.props.preceptor}
        <br />
        <SelectedLabel> Date</SelectedLabel>
          {this.props.date}
        <br />
        <SelectedLabel>Learned</SelectedLabel>
          {this.props.whatWasLearned}
        <br />
      </InputWrapper>
      </div>
    )

  }

}

export default ConditionListLearningDisplay;

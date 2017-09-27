import React, { Component } from 'react';

const primaryJSON = [
 {
   "term": "Macule"
 },
 {
   "term": "Patch"
 },
 {
   "term": "Papule"
 },
 {
   "term": "Plaque"
 },
 {
   "term": "Vesicle"
 },
 {
   "term": "Bulla"
 },
 {
   "term": "Pustule"
 },
 {
   "term": "Petechia"
 },
 {
   "term": "Purpura"
 },
 {
   "term": "Telangiectasia"
 },
 {
   "term": "Wheal/Urticaria"
 },
 {
   "term": "Nodule"
 },
 {
   "term": "Tumor"
 }
]

const secondaryJSON = [
  {
    "term": "Scale"
  },
  {
    "term": "Crust"
  },
  {
    "term": "Erosion"
  },
  {
    "term": "Ulcer"
  },
  {
    "term": "Fissure"
  },
  {
    "term": "Atrophy"
  },
  {
    "term": "Lichenification"
  },
  {
    "term": "Hypopigmentation"
  },
  {
    "term": "Hyperpigmentation"
  },
]

const specialLesion = [
  {
    "term": "Cyst"
  },
  {
    "term": "Burrow"
  },
  {
    "term": "Sinus"
  },
  {
    "term": "Excoriation"
  },
  {
    "term": "Comedone"
  },
]

const colorJSON =[
  {
    "term": "white",
  },
  {
    "term": "yellow",
  },

  {
    "term": "gray",
  },

  {
    "term": "blue",
  },

  {
    "term": "green",
  },
  {
    "term": "violaceous",
  },
  {
    "term": "red",
  },
  {
    "term": "erythematous",
  },
]

const distributionJSON = [
  {
    "term": "Generalized",
  },
  {
    "term": "Flexural",
  },
  {
    "term": "Extensor",
  },
  {
    "term": "Seborrheic",
  },
  {
    "term": "Chest",
  },
  {
    "term": "Scalp",
  },
  {
    "term": "Upper back",
  },
  {
    "term": "Acral",
  },
  {
    "term": "Dermatomal",
  },
  {
    "term": "Photoexposed",
  },
  {
    "term": "Follicular",
  },
  {
    "term": "Bilateral LE",
  },
]

const majorCategories = [
  {
    "term": "Papulosquamous",
    "description": "psoriasis, lichen planus, pityriasis rosea"
  },
  {
    "term": "Eczematous",
    "description": "atopic, contact dermatitis, nummular, Id"
  },
  {
    "term": "Vesiculobullous",
    "description": "pemphigus vulgaris, bullous pemphigoid, dermatitis Herpetiformis"
  },
  {
    "term": "Vascular",
    "description": "vasculitis, urticaria, cryoglobulinemia"
  },
]

class DermTerm extends Component {

  state = {
    primary: "",
    secondary: "",
    color: "",
    distribution: "",
  }

  primaryButtonTapped = (e) => {
    this.setState({
      primary: e.target.name
    });
  }

  secondaryButtonTapped = (e) => {
    this.setState({
      secondary: `with ${e.target.name}`
    });
  }

  colorButtonTapped = (e) => {
    this.setState({
      color: e.target.name
    });
  }

  distributionButtonTapped = (e) => {
    this.setState({
      distribution: `on ${e.target.name}`
    });
  }

  clearDescriptors = (e) => {
    this.setState({
      primary: "",
      secondary: "",
      color: "",
      distribution: "",
    })
  }

  copyToClipboard = () => {
    var textField = document.createElement('textarea')
    textField.innerText = `${this.state.color} ${this.state.primary} ${this.state.secondary} ${this.state.distribution}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

  }


  // <h3>Special Lesions</h3>
  // { specialLesion.map((element, key) =>
  // <button key={key}>{element.term}</button>
  // ) }
  // <h3>Major Catagories</h3>
  // { majorCategories.map((element, key) =>
  // <button key={key}>{element.term} ({element.description})</button>
  // ) }

  render() {
    console.log(`Primary is ${this.state.primary} Secondary is ${this.state.secondary}`);
    return (
      <div>
        <h3>Color</h3>
        { colorJSON.map((element, key) =>
        <button key={key} name={element.term} onClick={this.colorButtonTapped}>{element.term}</button>
        ) }
        <h3>Primary Lesion</h3>
        { primaryJSON.map((element, key) =>
        <button key={key} name={element.term} onClick={this.primaryButtonTapped}>{element.term}</button>
        ) }
        <h3>Secondary Lesion</h3>
        { secondaryJSON.map((element, key) =>
          <button key={key} name={element.term} onClick={this.secondaryButtonTapped}>{element.term}</button>
        ) }
        <h3>Distribution</h3>
        { distributionJSON.map((element, key) =>
          <button key={key} name={element.term} onClick={this.distributionButtonTapped}>{element.term}</button>
        ) }
        <br />
        <h3>Lesion Description</h3>
        <p>{this.state.color} {this.state.primary} {this.state.secondary} {this.state.distribution}</p>
        <button onClick={this.copyToClipboard}>Copy</button>
        <button onClick={this.clearDescriptors}>Clear</button>
      </div>
    );
  }

}

export default DermTerm;

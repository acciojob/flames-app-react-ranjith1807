import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name1: "",
            name2: "",
            result: ""
        };
    }

    calculateRelationship = () => {
        const { name1, name2 } = this.state;

        // Validation
        if (name1.trim() === "" || name2.trim() === "") {
            this.setState({ result: "Please Enter valid input" });
            return;
        }

        let arr1 = name1.split("");
        let arr2 = name2.split("");

        // FLAMES Logic: Remove common characters
        for (let i = 0; i < arr1.length; i++) {
            const char = arr1[i];
            const indexInArr2 = arr2.indexOf(char);

            if (indexInArr2 !== -1) {
                arr1.splice(i, 1);
                arr2.splice(indexInArr2, 1);
                i--; 
            }
        }

        const remainingLength = (arr1.length + arr2.length) % 6;
        const statusMap = {
            1: "Friends",
            2: "Love",
            3: "Affection",
            4: "Marriage",
            5: "Enemy",
            0: "Siblings"
        };

        this.setState({ result: statusMap[remainingLength] });
    };

    clearForm = () => {
        this.setState({ name1: "", name2: "", result: "" });
    };

    render() {
        return (
            <div id="main">
                <input
                    type="text"
                    value={this.state.name1}
                    name="name1"
                    placeholder="First Name"
                    data-testid="input1"
                    onChange={(e) => this.setState({ name1: e.target.value })}
                />
                <input
                    type="text"
                    value={this.state.name2}
                    name="name2"
                    placeholder="Second Name"
                    data-testid="input2"
                    onChange={(e) => this.setState({ name2: e.target.value })}
                />
                <button
                    name="calculate_relationship"
                    data-testid="calculate_relationship"
                    onClick={this.calculateRelationship}
                >
                    Calculate Relationship Future
                </button>
                <button
                    name="clear"
                    data-testid="clear"
                    onClick={this.clearForm}
                >
                    Clear
                </button>

                <h3 data-testid="answer">{this.state.result}</h3>
            </div>
        );
    }
}

export default App;
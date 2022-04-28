import React, { Component } from "react";
import firebaseConfig from "./firebaseConfig";
class memo_repo extends Component {
  saveCard(title, address) {
    firebaseConfig.database().ref(`/cards/${title}`).set(title);
  }
}

export default memo_repo;

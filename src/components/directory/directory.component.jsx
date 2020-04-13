import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "hats",
          imageUrl: "https://i.ibb.co/cvtnpL1/hats.png",
          id: 1,
        },
        {
          title: "jackets",
          imageUrl: "https://i.ibb.co/cvtnpL1/jackets.png",
          id: 2,
        },
        {
          title: "sneakers",
          imageUrl: "https://i.ibb.co/cvtnpL1/sneakers.png",
          id: 3,
        },
        {
          title: "womens",
          imageUrl: "https://i.ibb.co/cvtnpL1/womens.png",
          id: 4,
        },
        {
          title: "mens",
          imageUrl: "https://i.ibb.co/cvtnpL1/mens.png",
          id: 5,
        },
      ],
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ title, imageUrl, id }) => (
          <MenuItem title={title} key={id} />
        ))}
      </div>
    );
  }
}

export default Directory;

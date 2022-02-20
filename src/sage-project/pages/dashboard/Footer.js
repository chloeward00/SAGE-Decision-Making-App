import React from "react";
import Router from "next/router";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function Footer() {
  //const history = useHistory();

  return (
    <div className="footer">
    
    
     
      <IconButton
        className="fav"
        onClick={() => {
          Router.push("/dashboard/Fav");
        }}
      >
        <FavoriteIcon fontSize="large" />
      </IconButton>
    
    </div>
  );
}

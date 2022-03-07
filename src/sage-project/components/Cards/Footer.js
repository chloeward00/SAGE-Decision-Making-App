import React from "react";
import Router from "next/router";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Footer() {
  //const history = useHistory();

  return (
    <div className="footer">

        <FavoriteIcon
        className="fav"
        onClick={() => {
          Router.push("/swipecards/fav");
         
        }}
      >
        <FavoriteIcon fontSize="large" />
      </FavoriteIcon>

    </div>
  );
}

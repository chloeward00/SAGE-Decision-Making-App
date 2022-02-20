import React from "react";
import Router from "next/router";
import Link from 'next/link'


export default function Footer() {
  //const history = useHistory();

  return (
    <div className="footer">
              
    <li>
            <Link href="/Cards/Fav">
            <a>Tinder: Movies</a>
            </Link>
            </li>
     
    
    </div>
  );
}

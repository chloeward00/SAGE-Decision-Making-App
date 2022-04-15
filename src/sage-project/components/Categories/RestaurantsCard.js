
import * as React from 'react';
import DialogCards from "./DialogCards";
import fire from 'firebase/app';
import 'firebase/firestore';

const url = 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'

const title = 'FOOD';

const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

const alt = 'burger fries';

const category = 'food';

const RestaurantCard = ({ groupID }) => {

    // const link = '/categories/activity/' + groupID
    const link = `/map/${category}` + '&' + groupID

    return (
        <DialogCards imageURL={url} title={title} caption={caption} alt={alt} link={link} category={category}/>
    );
}
 
export default RestaurantCard;
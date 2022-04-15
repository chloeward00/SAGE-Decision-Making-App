
import * as React from 'react';
import DialogCards from "./DialogCards";
import fire from 'firebase/app';
import 'firebase/firestore';

const url = 'https://images.unsplash.com/photo-1573811363987-13f5bb00dec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

const title = 'ACTIVITIES';

const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

const alt = 'rock climbing';

const category = 'activity';

const ActivityCard = ({ groupID }) => {

    // const link = '/categories/activity/' + groupID
    const link = '/map/activity' + '&' + groupID

    return (
        <DialogCards imageURL={url} title={title} caption={caption} alt={alt} link={link} category={category}/>
    );
}

export default ActivityCard;
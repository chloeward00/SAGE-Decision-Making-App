import CardComponent from "./Card";

const url = 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'

const title = 'RESTAURANTS';

const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

const alt = 'burger fries';

const RestaurantComponent = () => {

    return (  
        <CardComponent imageURL={url} title={title} caption={caption} alt={alt}/>
    );
}
 
export default RestaurantComponent;
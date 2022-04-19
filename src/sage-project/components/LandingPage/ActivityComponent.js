import CardComponent from "./Card";

const url = 'https://images.unsplash.com/photo-1573811363987-13f5bb00dec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

const title = 'ACTIVITIES';

const caption = `Can't decide what activity to do with your friends? SAGE has a wide range of activities to choose from such as sports, museums, or any indoor or outdoor activities!`

const alt = 'rock climbing';

const ActivityComponent = () => {

    return (
        <CardComponent imageURL={url} title={title} caption={caption} alt={alt}/>
    );
}
 
export default ActivityComponent;
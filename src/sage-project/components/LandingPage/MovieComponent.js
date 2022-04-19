import CardComponent from "./Card";

const url = 'https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80'

const title = 'MOVIES';

const caption = 'Choose from our many available genres to watch a movie with your friends such as Romance, Comedy, Action, and many more!'

const alt = 'movie setting';

const MovieComponent = () => {

    return (  
        <CardComponent imageURL={url} title={title} caption={caption} alt={alt}/>
    );
}
 
export default MovieComponent;
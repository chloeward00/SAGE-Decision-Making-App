import DialogCards from "./DialogCards";

const url = 'https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80'

const title = 'MOVIES';

const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

const alt = 'movie setting';

const link = '/categories/movies'

const MovieCard = () => {

    return (  
        <DialogCards imageURL={url} title={title} caption={caption} alt={alt} link={link}/>
    );
}
 
export default MovieCard;
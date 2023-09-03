import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './singleChar.scss'

const SingleChar = ({data}) => {

    const {thumbnail, name, description, homepage, wiki, comics} = data;

    return (
        <div className="single-char">
            <Helmet>
                <meta
                    name="description"
                    content={`Character ${name}`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img" />
            <div className="single-char__info">
                <h1 className="single-char__name">{name}</h1>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to='/' className="single-char__back">Back to all</Link>
        </div>
    );
}

export default SingleChar;
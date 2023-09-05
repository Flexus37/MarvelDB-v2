import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'

import setContent from '../../utils/setContent';

import './charInfo.scss'

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {clearError, process, setProcess, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    );
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? {'objectFit': 'unset'} : {'objectFit': 'cover'};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className="char__info-img" style={imgStyle} />
                <div>
                    <h1 className="char__info-name">{name}</h1>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>

            </div>
            <div className="char__desc">
                {description}
            </div>
            <h2 className="char__comics">Comics:</h2>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.slice(0, 11).map((item, i) => {
                        return (
                            <Link to={`/comics/${item.resourceURI.match(/\/(\d+)$/)[1]}`} key={i} className="char__comics-item">
                                {item.name}
                            </Link>
                        )
                    })
                }
            </ul>
        </>

    );
}

// Использование библиотеки PropTypes для типизации данных
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
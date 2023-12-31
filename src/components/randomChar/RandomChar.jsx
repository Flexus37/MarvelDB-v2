import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import mjolnir from '../../resources/img/mjolnir.png'
import './randomChar.scss'

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 600000);

        return () => {
            clearInterval(timerId);
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                Random character for today!
                <br />
                Do you want to get to know him better?</p>
                <p className="randomchar__subtitle">
                Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img className="randomchar__decoration" src={mjolnir} alt="" />
            </div>
        </div>
    );
}

// Этот компонент будет отображать кусочек вёрстки
// Это простой рендерящий компонент
// Все логические действия происходят в основном компоненте
const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? {'objectFit': 'unset'}
            : {'objectFit': 'cover'};

    return (

            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"  />
                <div className="randomchar__info">

                    <h1 className="randomchar__name">{name}</h1>
                    <p className="randomchar__desc">{description}</p>

                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>

                </div>
            </div>

    )

}

export default RandomChar;
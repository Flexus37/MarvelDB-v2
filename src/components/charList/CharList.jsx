import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss'

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    // Зависит от предыдущего состояния
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const charRefs = useRef([]);

    const focusChar = id => {
        charRefs.current.forEach(item => item.classList.remove('selected'));
        charRefs.current[id].classList.add('selected');
    }

    function renderCharList(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <CSSTransition key={item.id} timeout={300} classNames="char__item">
                    <li
                        className="char__item"
                        ref={el => charRefs.current[i] = el}
                        key={item.id}
                        tabIndex={0}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusChar(i);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(item.id);
                                focusChar(i);
                            }
                        }}>
                            <img className='char__img' src={item.thumbnail} alt={item.name} style={imgStyle} />
                            <h1 className="char__name">{item.name}</h1>
                    </li>
                </CSSTransition>

            )
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderCharList(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner style={{'min-height': '101.4rem'}} /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className='inner'>load more</div>
            </button>
        </div>
    );

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
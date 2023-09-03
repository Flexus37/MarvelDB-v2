import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss';

const ComicsList = () => {
    // const storageOffset = Number(sessionStorage.getItem('storageOffset'));
    // const storageComicsList = JSON.parse(sessionStorage.getItem('storageComicsList'));

    // const [comicsList, setComicsList] = useState(!storageComicsList ? [] : storageComicsList);
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    // const [offset, setOffset] = useState(!storageOffset ? 0 : storageOffset);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComicsList} = useMarvelService();



    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComicsList(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.lenght < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);

        // sessionStorage.setItem('storageOffset', offset);
        // sessionStorage.setItem('storageComicsList', JSON.stringify(comicsList));
    }

    function createComicsList(arr) {
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img className='comics__img' src={item.thumbnail} alt={item.title} />
                        <h1 className="comics__title">{item.title}</h1>
                        <h2 className="comics__price">{item.price}</h2>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = createComicsList(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;
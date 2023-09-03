import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearch.scss';

const CharSearch = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (value) => {
        clearError();
        getCharacterByName(value)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/character/${char[0].id}`} className='button button__secondary'>
                            <div className="inner">to page</div>
                        </Link>
                    </div> :
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;


    return (
        <Formik
            initialValues={{
                charName: ''
            }}
            validationSchema = {Yup.object({
                charName: Yup.string()
                        .required('This field is required!')
            })}
            onSubmit={({charName}) => {
                updateChar(charName)
            }}
        >
            <Form className="char__search">
                <h1>Or find a character by name:</h1>
                <div className="char__search-inner">
                    <Field
                        className='char__input'
                        id='search' type='search'
                        name='charName'
                        placeholder='Enter name'/>
                    <button className='button button__main' type='submit' disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikErrorMessage className='char__search-result' name='charName' component='p' />
                {errorMessage}
                {results}
            </Form>
        </Formik>

    );
}

export default CharSearch;
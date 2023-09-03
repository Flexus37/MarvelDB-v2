import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearch/CharSearch";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import bgDecoration from '../../resources/img/bg-decoration.png'

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className="char__content-item">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <CharSearch />
                </div>
            </div>
            <img className="bg-decoration" src={bgDecoration} alt="" />
        </>
    )
}

export default MainPage;
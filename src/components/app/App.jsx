import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'
import Spinner from '../spinner/Spinner';

// import { MainPage, ComicsPage, SingleComicPage } from "../pages";

// React.lazy() - динамический импорт или ленивая загрузка
// Элемент будет подгружен только тогда, когда он появится на страничке
// Динамические импорты нужно вставлять после статических!!!
// Не получится обработать ошибку с помощью catch. Для этого нужен компонент React.Suspense (запасной компонент)
// Оптимизация работает на самом сайте. Файлы будут подгружаться сами. Но на серверной части файлов и вес станет больше, но это не критично
// Не увлекаться ленивой загрузкой
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicPage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharLayout/SingleChar'));
const SinglePage = lazy(() => import('../pages/SinglePage'))


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id"
                                element={<SinglePage Component={SingleComicLayout}
                                dataType='comic' />}/>
                            <Route path="/character/:id"
                                element={<SinglePage Component={SingleCharacterLayout}
                                dataType='character' />}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;
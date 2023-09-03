// Предохранители ловят ошибки только при:
// 1) Запуске метода render()
// 2) В методах жизненного цикла
// 3) В конструкторах дочерних компонентов

// Предохранители НЕ ловят ошибки в :
// 1) В обработчиках событий (потому что событие происходит вне метода render)
// 2) Ассинхронном коде (потому что мы не знаем, когда закончится. Есть доп. метод для отлова таких ошибок)
// 3) В самом предохранители

import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // SetState, который работает только с ошибкой. Обновляет только состояние
    // static getDerivedStateFromError() {
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: '25rem', height: '25rem', objectFit: 'contain', margin: '0 auto'}} src={img} alt="Error" />
    )
}

export default ErrorMessage;

// Если в папке src (public) нужен статический файл, то можно обратиться через следующую конструкцию:
// const ErrorMessage = () => {
//     return (
//         <img src={procces.env.PUBLIC_URL + '/error.gif'} />
//     )
// }
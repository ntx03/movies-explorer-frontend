import { setMovies, setCounter, setMore, width } from '../components/App/App';


export function widthFilmFilter(i) {
    if (width > 850) {
        if (i.length <= 12) {
            setMovies(i);
            setMore(false);
        } else {
            setMovies(i.slice(0, 12));
            setCounter(12);
            setMore(true);
        }

    } else if (450 > width <= 850) {
        if (i.length <= 8) {
            setMovies(i);
            setMore(false);
        } else {
            setMovies(i.slice(0, 8));
            setCounter(8);
            setMore(true);
        }
    }
    if (width <= 450) {
        if (i.length <= 5) {
            setMovies(i);
            setMore(false);
        } else {
            setMovies(i.slice(0, 5));
            setCounter(5);
            setMore(true);
        }
    }
}
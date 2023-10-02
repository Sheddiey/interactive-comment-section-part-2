import { data } from './data.json'
import plus from './images/icon-plus.svg'
import minus from './images/icon-minus.svg'

export default function InteractiveComments() {
    return <Score />
}

function Score({ score}) {
    return (
        <div>
            <img src={plus} alt='plus' />
            <p>{score}</p>
            <img src={minus} alt='minus' />
        </div>
    );
}

function Comment() {

}

function YouReply() {

}

function Reply() {

}

function AddComment() {

}
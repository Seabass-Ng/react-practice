type Props = {
    startOver: () => void;
};

const Congratulation = ({
    startOver
}: Props) => (
    <>
        <div>Congratulations! You won</div>
        <button onClick={startOver}>Start Over</button>
    </>
);

export default Congratulation;
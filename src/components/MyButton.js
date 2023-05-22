const MyButton = ({ text, type, onClick }) => {

    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

    return (
        <button
            className={["MyButton", `MyButton_${btnType}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    )
};
//className={["MyButton", `MyButton MyButton_${type}`].join(" ")}
MyButton.defaultProps = {
    type: "default",
};

export default MyButton;
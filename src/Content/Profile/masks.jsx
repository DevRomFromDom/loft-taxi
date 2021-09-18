import MaskedInput from "react-text-mask";

export const MaskedCardNumber = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            placeholderChar={"0"}
            guide={false}
            mask={[
                /[0-9]/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
            ]}
        />
    );
};

export const MaskedDateNumber = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            guide={false}
            mask={[
                /[0-9]/,
                /\d/,
                "/",
                /\d/,
                /\d/,
            ]}
        />
    );
};
export const MaskedCvcNumber = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            guide={false}
            mask={[
                /[0-9]/,
                /\d/,
                /\d/,
               
            ]}
        />
    );
};

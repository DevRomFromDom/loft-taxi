export const serverLogin = async (email, password) => {
    return fetch(`http://loft-taxi.glitch.me/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => data);
};

export const serverRegistration = async (email, password, name, surname) => {
    return fetch("https://loft-taxi.glitch.me/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            surname: surname,
        }),
    })
        .then((res) => res.json())
        .then((data) => data);
};
export const serverGetCard = async (token) => {
    return fetch(`https://loft-taxi.glitch.me/card?token=AUTH_TOKEN`)
        .then((res) => res.json())
        .then((data) => data);
};

export const serverSetCard = async (
    cardNumber,
    expiryDate,
    cardName,
    cvc,
    token
) => {
    return fetch("https://loft-taxi.glitch.me/card", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cardNumber,
            expiryDate,
            cardName,
            cvc,
            token,
        }),
    })
        .then((res) => res.json())
        .then((data) => data);
};

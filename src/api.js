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
    return fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
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

export const getAddressesFromServer = async () => {
    return fetch("https://loft-taxi.glitch.me/addressList")
        .then((res) => res.json())
        .then((data) => data);
};
export const getRouteFromServer = async (address1, address2) => {
    return fetch(
        `https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`
    )
        .then((res) => res.json())
        .then((data) => data);
};

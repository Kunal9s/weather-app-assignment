//  const apiKey = "57073734d878ee3bcd2a9368fd10a486";

//  export const fetchWeather = async (city) => {

//     const response = await fetch (
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//     )

//     return response.json();
//  }

//  export const fetchForecast = async (city) => {

//     const response = await fetch (
//         `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
//     )

//     return response.json();
//  }

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);


export const fetchWeather = async (city) => {
    const response = await fetch(`${API_URL}/api/weather`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
    });

    return response.json();
}

export const fetchForecast = async (city) => {
    const response = await fetch(`${API_URL}/api/weather/forecast`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
    });

    return response.json();
}



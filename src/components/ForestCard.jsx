function ForestCard({item}) {

    return (
        <div className="forest-card">
            <p>
                {new Date(item.dt_txt).toLocaleDateString()}
            </p>
            <h3>
                {Math.round(item.main.temp)}°C
            </h3>
            <p>
                {item.weather[0].main}
            </p>
        </div>
    )
};

export default ForestCard;
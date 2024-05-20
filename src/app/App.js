import React, { useEffect } from "react";


const App = () => {
    useEffect(() => {
        fetch("https://dummyapi.online/api/movies")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return <div>App</div>

}

export default App;
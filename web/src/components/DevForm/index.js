import React, { useState, useEffect } from "react";
import "./style.css"


function DevForm({ onSubmit }) {

    const [github_username, setGithubUser] = useState("");
    const [techs, setTechs] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000
            }
        )
    }, [])



    async function handleAddDev(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithubUser("");
        setTechs("");
    }


    return (<form onSubmit={handleAddDev}>
        <strong>Cadastrar</strong>
        <div className="input-block">
            <label htmlFor="">Usuário do Github</label>
            <input
                name="github_username"
                id="github_username"
                value={github_username}
                onChange={(e) => setGithubUser(e.target.value)}
                required />
        </div>

        <div className="input-block">
            <label htmlFor="">Tecnologias</label>
            <input
                name="techs"
                id="techs"
                value={techs}
                onChange={(e) => setTechs(e.target.value)}
                required />
        </div>

        <div className="input-group">
            <div className="input-block">
                <label htmlFor="">Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.value)}
                    required />
            </div>
            <div className="input-block">
                <label htmlFor="">Longitude</label>
                <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.value)}
                    required />
            </div>
        </div>

        <button type="submit">Salvar</button>
    </form>);

}

export default DevForm;

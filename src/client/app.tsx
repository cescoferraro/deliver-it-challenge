import * as React from "react";

export const App = (): React.ReactElement => {
    const [loading, setLoading] = React.useState(true)
    const [state, setState] = React.useState<LoginType>({name: "", password: ""})
    React.useEffect(() => {
        fetch("http://localhost:4000/api")
            .then((response) => response.json())
            .then((result: LoginType) => {
                setState(result)
                setLoading(false)
            })
    }, [])
    return (
        <div>
            <h2>Name: {loading ? "...loading" : `${state.name}`}</h2>
            <h2>Password: {loading ? "...loading" : `${state.password}`}</h2>
        </div>
    )
};
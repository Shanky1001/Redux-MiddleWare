import { Icon, Text, TextField } from '@shopify/polaris';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_DETAILS, Clear, Search } from '../Redux/Reducer';
import { SearchMinor } from '@shopify/polaris-icons';
import SearchCard from './SearchCard';
import '../App.css'
// import { useFetch } from '../Custom Hooks/useFetch';

const HomePage = () => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    // const [results, setResult] = useFetch('https://api.github.com/users');
    // Fetching Data from API
    const fetchData = useCallback(() => {

        if (state.userName !== '') {
            fetch(`https://api.github.com/users/${state.userName}`, {
                headers: {
                    Authorization: "Bearer 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 "
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        dispatch({
                            type: ADD_DETAILS, payload: []
                        })
                       alert(`user ${data.message}`)
                    }
                    else {
                        dispatch({
                            type: ADD_DETAILS, payload: [data]
                        })
                    }
                })
        } else {
            dispatch({
                type: ADD_DETAILS, payload: []
            })
        }
    }, [state.userName, dispatch])

    useEffect(() => {

        const fetch = setTimeout(() => fetchData(), 350)

        return () => clearTimeout(fetch);

    }, [fetchData])



    return (
        <div className="homepageContainer">
            <Text variant="heading3xl" as="h2" alignment="center" color='critical'>
                Get Github Profile Cards!
            </Text>

            <TextField prefix={<Icon source={SearchMinor} />} onChange={(e) => dispatch({
                type: Search, payload: e
            })} label="Search users" labelHidden value={state.userName} placeholder="Search users" helpText="We’ll use this to search users." clearButton
                onClearButtonClick={() => dispatch({ type: Clear })} />

            {state.users.length !== 0 && state.users.map((val) => {
                return <SearchCard val={val} key={val.id} />
            })}

        </div>
    )
}

export default HomePage
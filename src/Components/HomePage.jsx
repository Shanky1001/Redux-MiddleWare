import { Icon, Text, TextField } from '@shopify/polaris';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Clear, Search } from '../Redux/Reducer';
import { SearchMinor } from '@shopify/polaris-icons';
import SearchCard from './SearchCard';
import '../App.css'
import { AddDetails } from '../Redux/Actions';

const HomePage = () => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        if (state.userName !== '') {
            const fetch = setTimeout(() => dispatch(AddDetails(state.userName)), 450)
            return () => clearTimeout(fetch);
        }

    }, [dispatch, state.userName])



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
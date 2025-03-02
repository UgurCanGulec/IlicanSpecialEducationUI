import React, { createContext, useContext, useReducer } from "react"

const AppContext = createContext()

const actions = {
    SET_LOADING: "SET_LOADING",
}

const initialState = {
    isLoading: false,
}

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, {
        ...initialState
    })
    return <AppContext.Provider
        value={{ state, dispatch }}
        {...props}
    />
}

const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error(
            "useAppContext, AppProvider altında kullanılmalıdır."
        )
    }

    const { state, dispatch } = context

    const setLoading = (data) => {
        dispatch({
            type: actions.SET_LOADING,
            payload: data
        })
    }

    return {
        setLoading,
        isLoading: state.isLoading,
    }
}

const AppReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            throw new Error("Action bulunamadı.")
    }
}

export { AppProvider, useAppContext }
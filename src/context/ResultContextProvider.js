import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('Elon Musk')


  //which type of results are we looking for: /videos, /search, /images
  const getResults = async (type) => {
    setIsLoading(true)

    //here we want to make API call
    //we have base url and type
    //seconde parameter is options object
    const response = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
      'x-user-agent': 'desktop',
      'x-proxy-location': 'EU',
      'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    })
    //how do we get data from something useing fatch

    //this data represents our actual results
    const data = await response.json()

    if(type.includes('/news')) {
        setResults(data.entries)
    } else if(type.includes('/images')) {
        setResults(data.image_results)
    } else {
        setResults(data.results)
    }

    //in the end of this function we want to set setIsLoading back to false because we are not loading anymore
    setIsLoading(false)
  }
  //we are going to pass states and functions through the context to the entirety of react application
  return (
    <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
      {children}
    </ResultContext.Provider>
  )
}

//function to make it easier to use values from context
export const useResultContext = () => useContext(ResultContext)